export interface PostMeta {
  title: string
  date: string       // ISO string, e.g. "2026-04-29"
  author: string
  tags: string[]
  slug: string
  excerpt: string
  coverImage?: string // optional — path relative to /public
}

export interface Post extends PostMeta {
  content: string      // HTML rendered from Markdown body
  readingTime: number  // estimated minutes
}
