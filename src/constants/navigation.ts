import { NavItem } from '@/types/navigation'
import { PRODUCTS, GITHUB } from '@/constants/urls'

export const productItems = [
  {
    label: 'Web App',
    href: '/products/web-app',
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
    label: 'SDK',
    href: '/products/sdk',
    external: false,
    status: 'live' as const,
  },
  {
    label: 'Rate (Mobile)',
    href: '#',
    external: false,
    status: 'coming-soon' as const,
  },
  {
    label: 'Rate Extension',
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
