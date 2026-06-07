/**
 * Generates public/sitemap.xml from static routes + blog post frontmatter.
 * Run automatically via the "prebuild" npm script.
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE_URL = 'https://kaleidoswap.com'

const staticRoutes = [
  { path: '/',                    priority: '1.0', changefreq: 'weekly' },
  { path: '/products',            priority: '0.8', changefreq: 'weekly' },
{ path: '/products/desktop',    priority: '0.8', changefreq: 'weekly' },
  { path: '/products/sdk',        priority: '0.7', changefreq: 'weekly' },
  { path: '/products/extension',  priority: '0.5', changefreq: 'monthly' },
  { path: '/downloads',           priority: '0.9', changefreq: 'weekly' },
  { path: '/blog',                priority: '0.8', changefreq: 'weekly' },
  { path: '/privacy',             priority: '0.3', changefreq: 'monthly' },
  { path: '/terms',               priority: '0.3', changefreq: 'monthly' },
]

function extractFrontmatter(raw) {
  const cleaned = raw.replace(/^﻿/, '')
  const match = cleaned.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
    }
  }
  return fm
}

const postsDir = join(ROOT, 'src', 'blog', 'posts')
const postFiles = readdirSync(postsDir).filter((f) => f.endsWith('.md'))

const parsedPosts = postFiles
  .map((file) => {
    const raw = readFileSync(join(postsDir, file), 'utf-8')
    return extractFrontmatter(raw)
  })
  .filter((fm) => fm.slug)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const blogRoutes = parsedPosts.map((fm) => ({
  path: `/blog/${fm.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: fm.date || null,
}))

const allRoutes = [...staticRoutes, ...blogRoutes]

const urls = allRoutes.map((r) => {
  const loc = `${SITE_URL}${r.path}`
  const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${loc}</loc>${lastmod}
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = join(ROOT, 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`sitemap.xml written — ${allRoutes.length} URLs (${blogRoutes.length} blog posts)`)

// Generate worker/posts-meta.json for Cloudflare Worker pre-rendering
const postsMeta = {}
for (const fm of parsedPosts) {
  postsMeta[fm.slug] = {
    title: fm.title || '',
    description: fm.excerpt || '',
    image: fm.coverImagePreview || fm.coverImage || null,
    imageX: fm.coverImagePreviewX || null,
    date: fm.date || null,
  }
}

const metaPath = join(ROOT, 'worker', 'posts-meta.json')
writeFileSync(metaPath, JSON.stringify(postsMeta, null, 2), 'utf-8')
console.log(`posts-meta.json written — ${parsedPosts.length} posts`)
