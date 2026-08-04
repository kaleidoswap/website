// Tokenized beta downloads. Kept out of index.ts because workerd treats every
// named export of the entry module as a service entrypoint — exporting a plain
// constant from there fails to start with "Incorrect type for map entry".
//
// The link recipients click is minted by the invite mailer with the same
// DOWNLOAD_SECRET, so each hit is attributable to one signup.

export interface DownloadEnv {
  DB: D1Database
  BETA_RELEASES?: R2Bucket
  // Verifies the HMAC in /dl?t=... MUST equal the invite mailer's secret; that
  // mints the links, this only checks them.
  DOWNLOAD_SECRET?: string
  // Where to send a recipient when the token cannot be verified or the object
  // is missing, rather than locking everyone out.
  FALLBACK_DOWNLOAD_URL?: string
  // Overrides which object is "the current build".
  BETA_RELEASE_KEY?: string
}

// Tokenized beta download: GET /dl?t=<signup_id>.<hmac>. The HMAC (hex
// SHA-256 over the signup id string, keyed with DOWNLOAD_SECRET) is minted by
// the invite mailer with the same secret, so each hit is attributable to a
// signup. Valid hits are logged to beta_downloads and served the release zip
// from R2, with FALLBACK_DOWNLOAD_URL as the legacy fallback.
//
// `&file=sha256|asc` serves the checksum or the maintainer's detached signature
// for the same build, so a recipient can verify the zip they just pulled. Both
// sit beside the zip in R2, written by the release:r2 / release:signature jobs.
export const DEFAULT_RELEASE_KEY = 'kaleidoswap-extension-beta-latest.zip'

// Derived from the zip key so a BETA_RELEASE_KEY override moves all three
// together. Matches the naming in .gitlab-ci-release.yml: the checksum replaces
// the .zip suffix, the signature appends to it.
export const companionKeys = (zipKey: string): { sha256: string; asc: string } => ({
  sha256: `${zipKey.replace(/\.zip$/, '')}.sha256`,
  asc: `${zipKey}.asc`,
})

async function verifyDownloadToken(token: string, secret: string): Promise<number | null> {
  const dot = token.indexOf('.')
  if (dot <= 0) return null
  const idPart = token.slice(0, dot)
  const mac = token.slice(dot + 1)
  if (!/^\d{1,12}$/.test(idPart) || !/^[0-9a-f]{64}$/.test(mac)) return null
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
  const sig = new Uint8Array(mac.match(/../g)!.map((b) => parseInt(b, 16)))
  const ok = await crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(idPart))
  return ok ? Number(idPart) : null
}

export async function handleBetaDownload(request: Request, env: DownloadEnv): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'GET' } })
  }

  const fallback = (): Response =>
    env.FALLBACK_DOWNLOAD_URL
      ? Response.redirect(env.FALLBACK_DOWNLOAD_URL, 302)
      : new Response('Download unavailable', { status: 503 })

  // No secret provisioned yet: tokens can't be verified, so degrade to the
  // legacy hosted package rather than locking every recipient out.
  if (!env.DOWNLOAD_SECRET) return fallback()

  const params = new URL(request.url).searchParams
  const token = params.get('t') ?? ''
  const signupId = await verifyDownloadToken(token, env.DOWNLOAD_SECRET)
  if (signupId === null) return new Response('Forbidden', { status: 403 })

  const file = params.get('file') ?? ''
  if (file && file !== 'sha256' && file !== 'asc') {
    return new Response('Unknown file', { status: 400 })
  }

  try {
    const row = await env.DB.prepare('SELECT campaign_id FROM beta_signups WHERE id = ?1')
      .bind(signupId)
      .first<{ campaign_id: string | null }>()
    await env.DB.prepare(
      `INSERT INTO beta_downloads (signup_id, campaign_id, user_agent, ip)
       VALUES (?1, ?2, ?3, ?4)`
    )
      .bind(
        signupId,
        row?.campaign_id ?? null,
        request.headers.get('user-agent') ?? '',
        request.headers.get('cf-connecting-ip')
      )
      .run()
  } catch (err) {
    // Tracking must never block the download itself.
    console.error('[dl] failed to record download', err)
  }

  const zipKey = env.BETA_RELEASE_KEY || DEFAULT_RELEASE_KEY
  const companions = companionKeys(zipKey)
  const key = file === 'sha256' ? companions.sha256 : file === 'asc' ? companions.asc : zipKey

  const object = env.BETA_RELEASES ? await env.BETA_RELEASES.get(key) : null
  // A missing companion is a 404, not a redirect: falling back to the legacy
  // zip when someone asked for a checksum would hand them the wrong bytes.
  if (!object) return file ? new Response('Not found', { status: 404 }) : fallback()

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set(
    'content-type',
    file ? 'text/plain;charset=UTF-8' : (object.httpMetadata?.contentType ?? 'application/zip')
  )
  headers.set('content-length', String(object.size))
  // Checksums and signatures are read in the browser; only the zip is a save.
  if (!file) headers.set('content-disposition', `attachment; filename="${key}"`)
  headers.set('cache-control', 'no-store')
  return new Response(object.body, { status: 200, headers })
}
