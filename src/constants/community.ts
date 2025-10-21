// src/constants/community.ts
import type { SocialLink } from '@/types/community'
import { Github, Twitter, MessageCircle, Send, BookOpen } from 'lucide-react'

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Explore our open-source codebase, contribute, or report issues',
    icon: Github,
    href: 'https://github.com/kaleidoswap',
    color: 'text-gray-100'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    description: 'Follow us for updates, announcements, and Bitcoin DeFi insights',
    icon: Twitter,
    href: 'https://twitter.com/kaleidoswap',
    color: 'text-primary-400'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Join our community for support, discussions, and collaboration',
    icon: MessageCircle,
    href: 'https://discord.gg/kaleidoswap',
    color: 'text-secondary-400'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Get real-time updates and connect with the community',
    icon: Send,
    href: 'https://t.me/kaleidoswap',
    color: 'text-primary-400'
  },
  {
    id: 'docs',
    name: 'Documentation',
    description: 'Comprehensive guides, tutorials, and API documentation',
    icon: BookOpen,
    href: 'https://docs.kaleidoswap.com',
    color: 'text-green-400'
  }
]
