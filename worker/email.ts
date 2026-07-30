// Public email endpoints: the unsubscribe link recipients click and the
// delivery-event webhook the email provider (Resend) posts back.
//
// Both are served from this worker because they must be reachable from the
// open internet, while the invite mailer that sends the campaigns is not.
// Neither route uses a session — the HMAC token in the unsubscribe link and
// the provider's request signature are the only credentials.

export interface EmailEnv {
  DB: D1Database
  // Signs unsubscribe tokens. MUST equal the invite mailer's UNSUBSCRIBE_SECRET
  // — that is what mints the links, this only verifies them. Changing it
  // invalidates every unsubscribe link already delivered.
  UNSUBSCRIBE_SECRET?: string
  // Signing secret of the provider's webhook endpoint, in `whsec_<base64>` form.
  RESEND_WEBHOOK_SECRET?: string
}

const encoder = new TextEncoder()

async function hmacSha256(key: BufferSource | string, message: string): Promise<Uint8Array> {
  const raw = typeof key === 'string' ? encoder.encode(key) : key
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    raw,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return new Uint8Array(sig)
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

function base64Decode(s: string): Uint8Array | null {
  try {
    const bin = atob(s)
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
    return out
  } catch {
    return null
  }
}

function escapeHtmlText(s: string): string {
  return s.replace(/[&<>"']/g, (ch) =>
    ch === '&'
      ? '&amp;'
      : ch === '<'
        ? '&lt;'
        : ch === '>'
          ? '&gt;'
          : ch === '"'
            ? '&quot;'
            : '&#39;'
  )
}

// ------------------------------------------------------------- unsubscribe --

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

// Per-address token: the first 32 hex chars of HMAC-SHA256(secret, lowercased
// email). Keyed on a secret so links can neither be forged nor enumerated, and
// a leaked token reveals nothing about the secret. The mailer mints tokens with
// this exact recipe; keep the two in step.
export async function unsubscribeToken(email: string, secret: string): Promise<string> {
  return toHex(await hmacSha256(secret, normalizeEmail(email))).slice(0, 32)
}

export async function verifyUnsubscribeToken(
  email: string,
  token: string,
  secret: string
): Promise<boolean> {
  if (typeof token !== 'string') return false
  return timingSafeEqualString(token, await unsubscribeToken(email, secret))
}

const page = (message: string): string =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe | KaleidoSwap</title></head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0d0e14;color:#e5e7eb;font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<main style="max-width:460px;margin:24px;padding:32px;border:1px solid rgba(0,229,184,0.18);border-radius:16px;background:#15161e;text-align:center;">
<h1 style="margin:0 0 14px;font-size:18px;font-weight:600;letter-spacing:0.02em;color:#00E5B8;">KaleidoSwap</h1>
<p style="margin:0;font-size:14px;line-height:1.6;color:#cbd5e1;">${message}</p>
<p style="margin:22px 0 0;font-size:13px;"><a href="https://kaleidoswap.com" style="color:#00E5B8;text-decoration:none;">kaleidoswap.com</a></p>
</main></body></html>`

const htmlResponse = (body: string, status: number): Response =>
  new Response(body, {
    status,
    headers: { 'content-type': 'text/html;charset=UTF-8', 'cache-control': 'no-store' },
  })

async function recordUnsubscribe(env: EmailEnv, email: string): Promise<void> {
  // INSERT OR IGNORE: an address already opted out stays opted out, and a
  // replayed link is a no-op rather than an error.
  await env.DB.prepare(
    `INSERT OR IGNORE INTO unsubscribes (email, unsubscribed_at, source)
     VALUES (?1, datetime('now'), ?2)`
  )
    .bind(normalizeEmail(email), 'link')
    .run()
}

// GET /unsubscribe?email=…&token=… — the link in the footer of every marketing
// email. POST on the same URL is the RFC 8058 one-click path that mail clients
// call on the user's behalf; it answers JSON instead of a page.
export async function handleUnsubscribe(request: Request, env: EmailEnv): Promise<Response> {
  const wantsJson = request.method === 'POST'
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, POST' } })
  }

  if (!env.UNSUBSCRIBE_SECRET) {
    return wantsJson
      ? Response.json({ error: 'unsubscribe_not_configured' }, { status: 503 })
      : htmlResponse(page('Unsubscribe is temporarily unavailable. Please try again later.'), 503)
  }

  const params = new URL(request.url).searchParams
  const email = (params.get('email') ?? '').trim()
  const token = (params.get('token') ?? '').trim()

  // One neutral answer for a missing, malformed or wrong token, so the endpoint
  // can't be used to probe which addresses exist.
  if (!email || !(await verifyUnsubscribeToken(email, token, env.UNSUBSCRIBE_SECRET))) {
    return wantsJson
      ? Response.json({ error: 'invalid' }, { status: 400 })
      : htmlResponse(page('This unsubscribe link is invalid or has expired.'), 400)
  }

  try {
    await recordUnsubscribe(env, email)
  } catch (err) {
    console.error('[unsubscribe] failed to record opt-out', err)
    return wantsJson
      ? Response.json({ error: 'db_error' }, { status: 500 })
      : htmlResponse(page('Something went wrong. Please try again later.'), 500)
  }

  if (wantsJson) return Response.json({ ok: true })
  return htmlResponse(
    page(
      `<strong>${escapeHtmlText(normalizeEmail(email))}</strong> has been unsubscribed. You will no longer receive marketing emails from KaleidoSwap.`
    ),
    200
  )
}

// --------------------------------------------------------- delivery webhook --

const TIMESTAMP_TOLERANCE_SECONDS = 5 * 60

export interface WebhookSignatureHeaders {
  id?: string | null
  timestamp?: string | null
  signature?: string | null
}

// The provider signs each delivery with HMAC-SHA256 over
// "{id}.{timestamp}.{raw body}", keyed with the base64 secret that follows the
// "whsec_" prefix. The result is base64 and sent as space-separated
// "v1,<base64>" entries, any one of which may match (secret rotation).
export async function verifyWebhookSignature(
  secret: string,
  headers: WebhookSignatureHeaders,
  payload: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): Promise<boolean> {
  const { id, timestamp, signature } = headers
  if (!id || !timestamp || !signature) return false

  // Reject stale (or future-dated) deliveries so a captured request can't be
  // replayed indefinitely.
  const ts = Number(timestamp)
  if (!Number.isFinite(ts) || Math.abs(nowSeconds - ts) > TIMESTAMP_TOLERANCE_SECONDS) return false

  const key = base64Decode(secret.replace(/^whsec_/, ''))
  if (!key || key.length === 0) return false

  const expected = await hmacSha256(key, `${id}.${timestamp}.${payload}`)

  let matched = false
  for (const entry of signature.split(/\s+/)) {
    const [version, sig] = entry.split(',')
    if (version !== 'v1' || !sig) continue
    const candidate = base64Decode(sig)
    // Compare in constant time, and keep scanning after a hit so the work done
    // does not depend on which entry matched.
    if (candidate && timingSafeEqualBytes(candidate, expected)) matched = true
  }
  return matched
}

// Event types we persist; anything else is acknowledged and dropped. The stored
// `event` is the type with the "email." prefix removed.
export const EMAIL_EVENT_TYPES = new Set([
  'email.sent',
  'email.delivered',
  'email.opened',
  'email.clicked',
  'email.bounced',
  'email.complained',
])

interface WebhookEvent {
  type?: unknown
  created_at?: unknown
  data?: { email_id?: unknown; to?: unknown }
}

// POST /api/resend-webhook — delivery events pushed by the email provider.
// The signature is the only credential. Unknown event types are acknowledged
// and dropped; handled ones land in `email_events`, tagged with the campaign
// the recipient currently belongs to.
export async function handleEmailWebhook(request: Request, env: EmailEnv): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: { allow: 'POST' } })
  }
  if (!env.RESEND_WEBHOOK_SECRET) {
    return Response.json({ error: 'webhook_not_configured' }, { status: 503 })
  }

  const payload = await request.text()
  const verified = await verifyWebhookSignature(
    env.RESEND_WEBHOOK_SECRET,
    {
      id: request.headers.get('svix-id'),
      timestamp: request.headers.get('svix-timestamp'),
      signature: request.headers.get('svix-signature'),
    },
    payload
  )
  if (!verified) return Response.json({ error: 'invalid_signature' }, { status: 401 })

  let event: WebhookEvent
  try {
    event = JSON.parse(payload) as WebhookEvent
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const type = typeof event.type === 'string' ? event.type : ''
  if (!EMAIL_EVENT_TYPES.has(type)) {
    return Response.json({ ok: true, ignored: type || 'unknown' })
  }

  const data = event.data ?? {}
  const to = Array.isArray(data.to) ? data.to : []
  const email = typeof to[0] === 'string' ? normalizeEmail(to[0]) : ''

  try {
    let campaignHint: string | null = null
    if (email) {
      const row = await env.DB.prepare('SELECT campaign_id FROM beta_signups WHERE email = ?1')
        .bind(email)
        .first<{ campaign_id: string | null }>()
      campaignHint = row?.campaign_id ?? null
    }

    await env.DB.prepare(
      `INSERT INTO email_events (email, event, email_id, campaign_hint, ts)
       VALUES (?1, ?2, ?3, ?4, COALESCE(?5, datetime('now')))`
    )
      .bind(
        email,
        type.replace(/^email\./, ''),
        typeof data.email_id === 'string' ? data.email_id : '',
        campaignHint,
        typeof event.created_at === 'string' ? event.created_at : null
      )
      .run()
  } catch (err) {
    // Acknowledge anyway: the signature checked out, and a 5xx would only make
    // the provider retry a delivery we still could not store.
    console.error('[email-webhook] failed to store event', err)
    return Response.json({ ok: true, stored: false })
  }

  return Response.json({ ok: true })
}
