import postsMeta from './posts-meta.json'
import { STATIC_PAGE_META } from '../src/constants/pageMeta'

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

interface StaticMeta {
  title: string
  description: string
  image?: string
}

// Derived from the same STATIC_PAGE_META the React pages render from, so the
// worker's pre-rendered <title>/<meta description> can never drift from what
// the client actually displays. '/' keeps its full title as-is; every other
// route gets the " | KaleidoSwap" suffix that SEO.tsx also applies client-side.
const staticRoutes: Record<string, StaticMeta> = Object.fromEntries(
  Object.entries(STATIC_PAGE_META).map(([path, meta]) => [
    path,
    {
      title: path === '/' ? meta.title : `${meta.title} | KaleidoSwap`,
      description: meta.description,
    },
  ])
)

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

// React routes that only ever render client-side (no worker pre-render entry
// in staticRoutes or the blog matcher below), so they must be exempted from
// the soft-404 check — otherwise a legitimate SPA-shell response for them
// would get incorrectly downgraded to a 404.
const KNOWN_SPA_ONLY_ROUTES = new Set(['/products/extension/beta'])

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/beta-signup') {
      return handleBetaSignup(request, env)
    }

    // NOTE: /products/web-app used to redirect to /products here. The page
    // is back (see STATIC_PAGE_META, App.tsx, robots.txt) and is now handled
    // like any other static route below — no special-case needed.

    // Redirect renamed blog slugs (evergreen posts moved to keyword-first URLs)
    const renamedBlogSlugs: Record<string, string> = {
      '/blog/kaleidoswap-utexo': '/blog/stablecoins-on-bitcoin',
      '/blog/solving-bitcoin-l2-liquidity': '/blog/bitcoin-l2-interoperability',
      '/blog/kaleidoagent-wdk-hackathon': '/blog/bitcoin-agentic-payments',
    }
    const renamedTarget = renamedBlogSlugs[url.pathname.replace(/\/$/, '')]
    if (renamedTarget) {
      return Response.redirect(`${SITE_URL}${renamedTarget}`, 301)
    }

    // Redirect old blog image paths: assets moved from /blog/images/<post>/
    // to /blog/<post>/, but the old URLs live on in social-card caches and
    // Google's image index.
    if (url.pathname.startsWith('/blog/images/')) {
      return Response.redirect(
        `${SITE_URL}/blog/${url.pathname.slice('/blog/images/'.length)}`,
        301
      )
    }

    // Pre-render all known routes with correct meta tags
    const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/)
    if (blogMatch) {
      const prerendered = await handleBlogPost(request, env, blogMatch[1])
      if (prerendered) return prerendered
      // Shape matches /blog/:slug but the slug doesn't exist: serve the SPA
      // shell (BlogPost.tsx redirects unknown slugs to /blog) with a real
      // 404 status instead of the soft-200 the asset binding would give it.
      return notFound(request, env)
    }

    if (url.pathname in staticRoutes) {
      const prerendered = await handleStaticRoute(request, env, url.pathname)
      if (prerendered) return prerendered
    }

    const assetResponse = await env.ASSETS.fetch(request)

    // `not_found_handling: "single-page-application"` in wrangler.jsonc makes
    // the asset binding serve index.html with a 200 for any path that isn't a
    // real file — including typos and made-up routes. Real static files never
    // come back as text/html, so this only catches genuine soft-404s.
    const isHtmlFallback = (assetResponse.headers.get('content-type') ?? '').includes('text/html')
    if (assetResponse.status === 200 && isHtmlFallback && !KNOWN_SPA_ONLY_ROUTES.has(url.pathname)) {
      return new Response(assetResponse.body, { status: 404, headers: assetResponse.headers })
    }

    return assetResponse
  },
} satisfies ExportedHandler<Env>

async function notFound(request: Request, env: Env): Promise<Response> {
  const assetResponse = await env.ASSETS.fetch(request)
  return new Response(assetResponse.body, { status: 404, headers: assetResponse.headers })
}
