import { PRODUCTS, GITHUB, DOCS } from '@/constants/urls'
import fulgurLogo from '@/assets/fulgur-logo.svg'
import bitfinexLogo from '@/assets/BrandLogo.org-Bitfinex-Logo.png'
import rgbAssociationLogo from '/icons/rgb/logo-protocol-association.png'

export const coreFeatures = [
  {
    icon: 'swap_horiz',
    title: 'Atomic Swaps',
    description: 'Trustless exchange mechanism. If the swap doesn\'t happen for both parties, it doesn\'t happen at all. Zero chance of lost funds.',
    color: 'primary' as const,
    link: { label: 'Learn technical details', href: PRODUCTS.docs },
  },
  {
    icon: 'verified_user',
    title: 'Non-Custodial',
    description: 'You hold your keys always. KaleidoSwap never takes possession of your coins. You are your own bank, from start to finish.',
    color: 'purple' as const,
    link: { label: 'View on GitHub', href: GITHUB.orgUrl },
  },
  {
    icon: 'dns',
    title: 'Run Your Node',
    description: 'Verify everything yourself. Our desktop app bundles a full RGB Lightning node. Your infrastructure. Your sovereignty.',
    color: 'green' as const,
    link: { label: 'Setup documentation', href: DOCS.desktop },
  },
]

export const backers = [
  { name: 'Fulgur Ventures', logo: fulgurLogo, url: 'https://fulgur.ventures' },
  { name: 'Bitfinex Ventures', logo: bitfinexLogo, url: 'https://www.bitfinex.com' },
]

export const partners = [
  { name: 'RGB Protocol Association', logo: rgbAssociationLogo, showName: true, url: 'https://rgbprotocol.org/' },
]
