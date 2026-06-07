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
const DEFAULT_TITLE = 'KaleidoSwap - Bitcoin L2 DEX'
const DEFAULT_DESC = 'Trade BTC, USDT, and any RGB asset across Lightning, RGB, Spark, and Arkade. Atomic swaps with low fees and better privacy. No bridges. No custody. No tokens.'

interface StaticMeta {
  title: string
  description: string
  image?: string
}

const staticRoutes: Record<string, StaticMeta> = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  '/products': {
    title: 'Products | KaleidoSwap',
    description: 'KaleidoSwap products: Web App, Desktop App, SDK, Mobile App, and Browser Extension. Build and trade on Bitcoin\'s most connected swap protocol.',
  },
  '/products/web-app': {
    title: 'Web App | KaleidoSwap',
    description: 'Trade BTC, stablecoins, and RGB assets directly from your browser. No installation required. Connect your wallet and start swapping. Supports Alby, Bitmask, KaleidoSwap Extension, and Xverse.',
  },
  '/products/desktop': {
    title: 'Desktop App | KaleidoSwap',
    description: 'Full sovereignty with the KaleidoSwap Desktop App. Bundles a complete RGB Lightning node. Available for macOS, Windows, and Linux.',
  },
  '/products/sdk': {
    title: 'Developer SDK | KaleidoSwap',
    description: 'Integrate KaleidoSwap into your application. Rust, Python, and TypeScript SDKs with full documentation and examples.',
  },
  '/downloads': {
    title: 'Download | KaleidoSwap',
    description: 'Download KaleidoSwap for macOS, Linux, or Windows. Self-custody Bitcoin DEX with Lightning Network support and RGB asset trading.',
  },
  '/blog': {
    title: 'Blog | KaleidoSwap',
    description: 'Insights, tutorials, and updates from the KaleidoSwap team. Learn about RGB protocol, Lightning Network swaps, and the KaleidoSDK.',
  },
  '/privacy': {
    title: 'Privacy Policy | KaleidoSwap',
    description: 'KaleidoSwap Privacy Policy. Learn how we protect your data and maintain your privacy while using our Bitcoin DEX.',
  },
  '/terms': {
    title: 'Terms of Service | KaleidoSwap',
    description: 'KaleidoSwap Terms of Service. Understand the terms and conditions for using our Bitcoin DEX platform.',
  },
}

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

function injectMeta(html: string, opts: {
  title: string
  desc: string
  fullUrl: string
  image: string
  imageX: string
  type?: string
}): string {
  const { title, desc, fullUrl, image, imageX, type = 'website' } = opts
  return html
    .replace(/<title>[^<]*<\/title>/,                                    `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="title"\s+content=")[^"]*(")/,                 `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/,           `$1${escapeHtml(desc)}$2`)
    .replace(/(<meta property="og:type"\s+content=")[^"]*(")/,           `$1${type}$2`)
    .replace(/(<meta property="og:url"\s+content=")[^"]*(")/,            `$1${fullUrl}$2`)
    .replace(/(<meta property="og:title"\s+content=")[^"]*(")/,          `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description"\s+content=")[^"]*(")/,    `$1${escapeHtml(desc)}$2`)
    .replace(/(<meta property="og:image"\s+content=")[^"]*(")/,          `$1${image}$2`)
    .replace(/(<meta property="og:image:alt"\s+content=")[^"]*(")/,      `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:url"\s+content=")[^"]*(")/,           `$1${fullUrl}$2`)
    .replace(/(<meta name="twitter:title"\s+content=")[^"]*(")/,         `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/,   `$1${escapeHtml(desc)}$2`)
    .replace(/(<meta name="twitter:image"\s+content=")[^"]*(")/,         `$1${imageX}$2`)
    .replace(/(<meta name="twitter:image:alt"\s+content=")[^"]*(")/,     `$1${escapeHtml(title)}$2`)
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

async function fetchIndexHtml(request: Request, env: Env): Promise<string | null> {
  const indexRes = await env.ASSETS.fetch(new Request(new URL('/', request.url).toString()))
  if (!indexRes.ok) return null
  return indexRes.text()
}

function htmlResponse(html: string): Response {
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

async function handleBlogPost(request: Request, env: Env, slug: string): Promise<Response | null> {
  const meta = (postsMeta as Record<string, PostMeta>)[slug]
  if (!meta) return null

  const html = await fetchIndexHtml(request, env)
  if (!html) return null

  return htmlResponse(injectMeta(html, {
    title: `${meta.title} | KaleidoSwap`,
    desc: meta.description,
    fullUrl: `${SITE_URL}/blog/${slug}`,
    image: resolveImage(meta.image),
    imageX: resolveImage(meta.imageX ?? meta.image),
    type: 'article',
  }))
}

async function handleStaticRoute(request: Request, env: Env, pathname: string): Promise<Response | null> {
  const meta = staticRoutes[pathname]
  if (!meta) return null

  const html = await fetchIndexHtml(request, env)
  if (!html) return null

  return htmlResponse(injectMeta(html, {
    title: meta.title,
    desc: meta.description,
    fullUrl: `${SITE_URL}${pathname}`,
    image: resolveImage(meta.image ?? null),
    imageX: resolveImage(meta.image ?? null),
  }))
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/beta-signup') {
      return handleBetaSignup(request, env)
    }

    // Pre-render all known routes with correct meta tags
    const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/)
    if (blogMatch) {
      const prerendered = await handleBlogPost(request, env, blogMatch[1])
      if (prerendered) return prerendered
    } else if (url.pathname in staticRoutes) {
      const prerendered = await handleStaticRoute(request, env, url.pathname)
      if (prerendered) return prerendered
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
