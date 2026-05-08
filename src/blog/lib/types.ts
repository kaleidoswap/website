export interface PostMeta {
  title: string
  date: string       // ISO string, e.g. "2026-04-29"
  author?: string
  tags: string[]
  slug: string
  excerpt: string
  coverImage?: string        // wide variant — desktop article hero (e.g. 8:3)
  coverImageMobile?: string  // portrait/tall variant — mobile article hero (e.g. 5:3)
  coverImageCard?: string    // thumbnail variant — blog card grid (e.g. 5:2)
  coverImagePreview?: string  // 2:1 image for OG/social link previews (all platforms)
  coverImagePreviewX?: string // 1:1 image for X (Twitter) card preview
}

export interface Post extends PostMeta {
  content: string      // HTML rendered from Markdown body
  readingTime: number  // estimated minutes
}
