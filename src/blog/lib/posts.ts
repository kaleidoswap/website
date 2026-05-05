import fm from 'front-matter'
import { marked } from 'marked'
import type { Post, PostMeta } from './types'

// Vite loads all .md files under posts/ as raw strings at build time.
const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Slugify a heading text (strip HTML tags, lowercase, hyphenate) */
function slugify(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Post-process marked HTML to inject `id` attributes on h2/h3 headings */
function addHeadingIds(html: string): string {
  return html.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_, tag, inner) => {
    const id = slugify(inner)
    return `<${tag} id="${id}">${inner}</${tag}>`
  })
}

/** Estimate reading time in minutes (avg 200 wpm) */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([, raw]) => fm<PostMeta>(raw).attributes)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const entry = Object.entries(modules).find(([filePath]) =>
    filePath.includes(slug)
  )
  if (!entry) return null
  const { attributes, body } = fm<PostMeta>(entry[1])
  const rawHtml = marked(body) as string
  return {
    ...attributes,
    content: addHeadingIds(rawHtml),
    readingTime: readingTime(body),
  }
}
