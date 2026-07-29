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
  path: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
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
}
