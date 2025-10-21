// src/types/community.ts
import type { LucideIcon } from 'lucide-react'

export interface SocialLink {
  id: string
  name: string
  description: string
  icon: LucideIcon
  href: string
  color: string
  stats?: string
}

export interface CommunityProps {
  title?: string
  description?: string
  socialLinks: SocialLink[]
}
