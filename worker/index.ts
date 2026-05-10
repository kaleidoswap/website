export interface Env {
  ASSETS: Fetcher
  DB: D1Database
  TURNSTILE_SECRET: string
}

interface SignupBody {
  email?: string
  name?: string
  company?: string
  intended_use?: string
  telegram?: string
  nostr?: string
  turnstile_token?: string
}

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const isValidEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new FormData()
  body.set('secret', secret)
  body.set('response', token)
  if (ip) body.set('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  if (!res.ok) return false
  const data = (await res.json()) as { success: boolean }
  return data.success === true
}

async function handleBetaSignup(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  let body: SignupBody
  try {
    body = (await request.json()) as SignupBody
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const email = body.email?.trim().toLowerCase() ?? ''
  const name = body.name?.trim() ?? ''
  const company = body.company?.trim() ?? ''
  const intendedUse = body.intended_use?.trim() ?? ''
  const telegram = body.telegram?.trim() ?? ''
  const nostr = body.nostr?.trim() ?? ''
  const token = body.turnstile_token ?? ''

  if (!isValidEmail(email)) return json({ error: 'invalid_email' }, 400)
  if (name.length < 1 || name.length > 200) return json({ error: 'invalid_name' }, 400)
  if (intendedUse.length < 1 || intendedUse.length > 2000) return json({ error: 'invalid_intended_use' }, 400)
  if (company.length > 200) return json({ error: 'invalid_company' }, 400)
  if (telegram.length > 100) return json({ error: 'invalid_telegram' }, 400)
  if (nostr.length > 200) return json({ error: 'invalid_nostr' }, 400)
  if (!token) return json({ error: 'missing_turnstile' }, 400)

  const ip = request.headers.get('cf-connecting-ip')
  const ok = await verifyTurnstile(token, env.TURNSTILE_SECRET, ip)
  if (!ok) return json({ error: 'turnstile_failed' }, 400)

  const userAgent = request.headers.get('user-agent') ?? ''

  try {
    // INSERT OR IGNORE: silently no-op on a duplicate email so the response
    // is identical to a fresh signup. This avoids leaking which addresses
    // are on the list via 409 vs 200.
    await env.DB.prepare(
      `INSERT OR IGNORE INTO beta_signups
         (email, name, company, intended_use, telegram, nostr, ip, user_agent)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
      .bind(email, name, company, intendedUse, telegram, nostr, ip, userAgent)
      .run()
  } catch {
    return json({ error: 'db_error' }, 500)
  }

  return json({ ok: true })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api/beta-signup') {
      return handleBetaSignup(request, env)
    }
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
