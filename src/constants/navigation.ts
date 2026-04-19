import { NavItem } from '@/types/navigation'
import { PRODUCTS, GITHUB } from '@/constants/urls'

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
    label: 'Mobile App',
    href: '#',
    external: false,
    status: 'coming-soon' as const,
  },
  {
    label: 'Web App',
    href: '/products/web-app',
    external: false,
    status: 'coming-soon' as const,
  },
  {
    label: 'Extension',
    href: '/products/rate-extension',
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
    description: 'Desktop app & open-source code',
  },
]

export const mainNavItems: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
  },
]
