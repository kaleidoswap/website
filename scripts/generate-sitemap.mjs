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
  { path: '/products/web-app',    priority: '0.8', changefreq: 'weekly' },
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

const blogRoutes = postFiles
  .map((file) => {
    const raw = readFileSync(join(postsDir, file), 'utf-8')
    const fm = extractFrontmatter(raw)
    if (!fm.slug) return null
    return {
      path: `/blog/${fm.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: fm.date || null,
    }
  })
  .filter(Boolean)
  .sort((a, b) => (b.lastmod || '').localeCompare(a.lastmod || ''))

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
