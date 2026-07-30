// src/types/mediaKit.ts

export interface BrandColor {
  name: string
  hex: string
  usage: string
}

export interface LogoAsset {
  id: string
  name: string
  description: string
  preview: string
  files: { label: string; path: string }[]
}

export interface ScreenshotAsset {
  id: string
  name: string
  /** Lightweight WebP shown on the page — see scripts/generate-image-previews.mjs */
  preview: string
  /** Full-resolution original, offered for download */
  path: string
  /**
   * Tall, phone-shaped screenshot: gets its own full-height column on /media-kit
   * and is cropped from the bottom instead of the sides.
   */
  portrait?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  /** Lightweight WebP shown on the page — see scripts/generate-image-previews.mjs */
  photoPreview: string
  /** Full-resolution original, offered for download and bundled in the media-kit zip */
  photo: string
  bio: string
  bioDoc: string
  linkedin?: string
  x?: string
  github?: string
}

export interface PressArticle {
  outlet: string
  title: string
  url: string
  type: 'article' | 'video' | 'social'
}

export interface ConferenceTalk {
  date: string
  event: string
  location: string
  videoUrl?: string
}

export interface FactSheetEntry {
  label: string
  value: string
  url?: string
}
