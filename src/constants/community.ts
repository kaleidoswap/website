// src/constants/community.ts
import type { SocialLink } from '@/types/community'
import { Github, Twitter, Send, BookOpen } from 'lucide-react'
import { SOCIALS, PRODUCTS } from '@/constants/urls'

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Explore our open-source codebase, contribute, or report issues',
    icon: Github,
    href: SOCIALS.github,
    color: 'text-gray-100'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    description: 'Follow us for updates, announcements, and Bitcoin DeFi insights',
    icon: Twitter,
    href: SOCIALS.twitterLegacy,
    color: 'text-primary-400'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Get real-time updates and connect with the community',
    icon: Send,
    href: SOCIALS.telegram,
    color: 'text-primary-400'
  },
  {
    id: 'docs',
    name: 'Documentation',
    description: 'Comprehensive guides, tutorials, and API documentation',
    icon: BookOpen,
    href: PRODUCTS.docs,
    color: 'text-green-400'
  }
]
