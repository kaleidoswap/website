import { NavItem } from '@/types/navigation'
import { PRODUCTS, GITHUB, SOCIALS } from '@/constants/urls'

export const productItems = [
  {
    label: 'KaleidoSDK',
    href: '/products/sdk',
    external: false,
    status: 'live' as const,
  },
  {
    label: 'Desktop App',
    href: '/products/desktop',
    external: false,
    status: 'live' as const,
  },
  {
    label: 'Browser Extension',
    href: '/products/extension',
    external: false,
    status: 'live' as const,
  },
  {
    label: 'Web App',
    href: '#',
    external: false,
    status: 'coming-soon' as const,
  },
  {
    label: 'Mobile App',
    href: '#',
    external: false,
    status: 'coming-soon' as const,
  },
]

export const developerItems = [
  {
    label: 'Documentation',
    href: PRODUCTS.docs,
    external: true,
    description: 'API reference, guides & examples',
  },
  {
    label: 'GitHub',
    href: GITHUB.orgUrl,
    external: true,
    description: 'All our open source repos',
  },
  {
    label: 'Demo',
    href: SOCIALS.rumble,
    external: true,
    description: 'Video explanations of our product',
  },
]

export const mainNavItems: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
  },
]
