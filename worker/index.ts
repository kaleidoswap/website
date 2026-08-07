import postsMeta from './posts-meta.json'
import { STATIC_PAGE_META } from '../src/constants/pageMeta'
import { getBusinessCard } from '../src/constants/businessCards'
import { handleBetaDownload, type DownloadEnv } from './download'
import { handleEmailWebhook, handleUnsubscribe } from './email'
import { handleVCardRequest } from './vcard'

export interface Env extends DownloadEnv {
  ASSETS: Fetcher
  DB: D1Database
  AUDIO: R2Bucket
  TURNSTILE_SECRET: string
  UNSUBSCRIBE_SECRET?: string
  RESEND_WEBHOOK_SECRET?: string
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

async function handleBusinessCard(request: Request, env: Env, slug: string): Promise<Response | null> {
  const card = getBusinessCard(slug)
  if (!card) return null

  const html = await fetchIndexHtml(request, env)
  if (!html) return null

  const image = resolveImage(card.photo ?? null)
  const withMeta = injectMeta(html, {
    title: `${card.fullName} | KaleidoSwap`,
    desc: `${card.role} at ${card.company}. Save my contact details.`,
    fullUrl: `${SITE_URL}/contact/${slug}`,
    image,
    imageX: image,
  })

  // Personal contact pages are for whoever scans the printed QR, not for
  // search. BusinessCard.tsx sets the same tag client-side, but a crawler that
  // doesn't run JS would only ever see the pre-rendered HTML.
  return htmlResponse(
    withMeta.replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n</head>')
  )
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

// Blog narration MP3s live in R2, not in the asset bundle — they are far too
// large to commit. Served from this origin so the manifest can keep using
// relative /blog/audio/ URLs, with Range support so the player can seek.
const AUDIO_PREFIX = '/blog/audio/'

async function serveAudio(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } })
  }

  const key = decodeURIComponent(new URL(request.url).pathname.slice(AUDIO_PREFIX.length))
  if (!key || key.includes('/') || !key.endsWith('.mp3')) {
    return new Response('Not found', { status: 404 })
  }

  const headers = new Headers({
    'accept-ranges': 'bytes',
    // Content-addressed by post slug; a re-narration overwrites the key, so
    // keep this short enough that a refreshed episode is picked up same-day.
    'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
  })

  if (request.method === 'HEAD') {
    const head = await env.AUDIO.head(key)
    if (!head) return new Response('Not found', { status: 404 })
    head.writeHttpMetadata(headers)
    headers.set('etag', head.httpEtag)
    headers.set('content-type', head.httpMetadata?.contentType ?? 'audio/mpeg')
    headers.set('content-length', String(head.size))
    return new Response(null, { status: 200, headers })
  }

  const object = await env.AUDIO.get(key, {
    range: request.headers,
    onlyIf: request.headers,
  })
  if (!object) return new Response('Not found', { status: 404 })

  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('content-type', object.httpMetadata?.contentType ?? 'audio/mpeg')

  // onlyIf failed the precondition (If-None-Match hit) — no body was returned.
  if (!('body' in object) || !object.body) {
    return new Response(null, { status: 304, headers })
  }

  const range = object.range as { offset?: number; length?: number } | undefined
  if (request.headers.has('range') && range) {
    const offset = range.offset ?? 0
    const length = range.length ?? object.size - offset
    headers.set('content-range', `bytes ${offset}-${offset + length - 1}/${object.size}`)
    headers.set('content-length', String(length))
    return new Response(object.body, { status: 206, headers })
  }

  headers.set('content-length', String(object.size))
  return new Response(object.body, { status: 200, headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/beta-signup') {
      return handleBetaSignup(request, env)
    }

    // accept /dl and /dl/ — mail clients and link rewriters append the slash
    if (url.pathname === '/dl' || url.pathname === '/dl/') {
      return handleBetaDownload(request, env)
    }

    // Public, unauthenticated email plumbing (see worker/email.ts). Same
    // trailing-slash tolerance as /dl, for the same reason.
    if (url.pathname === '/unsubscribe' || url.pathname === '/unsubscribe/') {
      return handleUnsubscribe(request, env)
    }

    if (url.pathname === '/api/resend-webhook') {
      return handleEmailWebhook(request, env)
    }

    if (url.pathname.startsWith(AUDIO_PREFIX)) {
      return serveAudio(request, env)
    }

    // Digital business cards: GET /contact/:slug.vcf downloads the vCard,
    // GET /contact/:slug renders the React page (pre-rendered below).
    const vcardMatch = url.pathname.match(/^\/contact\/([a-z0-9-]+)\.vcf$/)
    if (vcardMatch) {
      return handleVCardRequest(request, vcardMatch[1], SITE_URL)
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

    const contactMatch = url.pathname.match(/^\/contact\/([a-z0-9-]+)\/?$/)
    if (contactMatch) {
      const prerendered = await handleBusinessCard(request, env, contactMatch[1])
      if (prerendered) return prerendered
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
