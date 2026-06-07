import postsMeta from './posts-meta.json'

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

interface PostMeta {
  title: string
  description: string
  image: string | null
  imageX: string | null
  date: string | null
}

const SITE_URL = 'https://kaleidoswap.com'
const DEFAULT_IMAGE = `${SITE_URL}/images/kaleido-full-logo-bg.jpg`

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const isValidEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function resolveImage(path: string | null): string {
  if (!path) return DEFAULT_IMAGE
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}

function injectBlogMeta(html: string, post: PostMeta, slug: string): string {
  const fullUrl = `${SITE_URL}/blog/${slug}`
  const title = `${post.title} | KaleidoSwap`
  const desc = post.description
  const image = resolveImage(post.image)
  const imageX = resolveImage(post.imageX ?? post.image)

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="title"\s+content=")[^"]*(")/,                `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/,          `$1${escapeHtml(desc)}$2`)
    .replace(/(<meta property="og:type"\s+content=")[^"]*(")/,          `$1article$2`)
    .replace(/(<meta property="og:url"\s+content=")[^"]*(")/,           `$1${fullUrl}$2`)
    .replace(/(<meta property="og:title"\s+content=")[^"]*(")/,         `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description"\s+content=")[^"]*(")/,   `$1${escapeHtml(desc)}$2`)
    .replace(/(<meta property="og:image"\s+content=")[^"]*(")/,         `$1${image}$2`)
    .replace(/(<meta property="og:image:alt"\s+content=")[^"]*(")/,     `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:url"\s+content=")[^"]*(")/,          `$1${fullUrl}$2`)
    .replace(/(<meta name="twitter:title"\s+content=")[^"]*(")/,        `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/,  `$1${escapeHtml(desc)}$2`)
    .replace(/(<meta name="twitter:image"\s+content=")[^"]*(")/,        `$1${imageX}$2`)
    .replace(/(<meta name="twitter:image:alt"\s+content=")[^"]*(")/,    `$1${escapeHtml(title)}$2`)
    .replace('</head>', `  <link rel="canonical" href="${fullUrl}" />\n</head>`)
}

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

async function handleBlogPost(request: Request, env: Env, slug: string): Promise<Response | null> {
  const meta = (postsMeta as Record<string, PostMeta>)[slug]
  if (!meta) return null

  const indexReq = new Request(new URL('/', request.url).toString())
  const indexRes = await env.ASSETS.fetch(indexReq)
  if (!indexRes.ok) return null

  const html = await indexRes.text()
  const injected = injectBlogMeta(html, meta, slug)

  return new Response(injected, {
    status: 200,
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/beta-signup') {
      return handleBetaSignup(request, env)
    }

    // Pre-render blog posts with correct meta tags for social crawlers
    const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/)
    if (blogMatch) {
      const slug = blogMatch[1]
      const prerendered = await handleBlogPost(request, env, slug)
      if (prerendered) return prerendered
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
