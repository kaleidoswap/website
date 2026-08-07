// src/constants/mediaKit.ts
import type {
  BrandColor,
  LogoAsset,
  ScreenshotAsset,
  PressArticle,
  ConferenceTalk,
  FactSheetEntry,
} from '@/types/mediaKit'

export const PRESS_CONTACT_EMAIL = 'emile@kaleidoswap.com'

export const MEDIA_KIT_ZIP = '/media-kit/kaleidoswap-media-kit.zip'

// Boilerplate texts are meant to be copied verbatim by journalists — kept in English only.
export const BOILERPLATE_SHORT =
  'KaleidoSwap is a full-stack decentralized exchange. It enables trustless atomic swaps of bitcoin, stablecoins, and other assets across all Bitcoin layers.'

export const BOILERPLATE_FULL =
  'KaleidoSwap is building the liquidity layer for Bitcoin-native atomic swaps, enabling anyone to exchange Bitcoin-based assets freely, privately, and without intermediaries. Its vertically integrated stack spans end-user applications such as the Desktop App and the Browser Extension, a multi-language SDK, AI tools for autonomous AI agents and local AI brains, and market-maker software. Trades use different engines: RFQ (Request for Quote) model where market makers compete on spread, P2P via Nostr, or intent-based using covenants. Everything KaleidoSwap ships is open source. The team is made up of pioneers in the Bitcoin L2 ecosystem, with previous contributions in other Bitcoin open source projects and educational initiatives. The company raised a $200K pre-seed investment from Fulgur Ventures and Bitfinex Ventures, and won several hackathons, including the first CypherTank edition, which guaranteed $300K in extra funding.'

export const factSheet: FactSheetEntry[] = [
  { label: 'One-liner', value: 'Trustless Swaps on Bitcoin Layers' },
  {
    label: 'Industry first',
    value: 'First-ever atomic swap of RGB assets on Lightning mainnet (Sep 2025)',
    url: '/blog/first-rgb-swap-mainnet',
  },
  {
    label: 'Funding',
    value: '$200K pre-seed round from Fulgur Ventures and Bitfinex Ventures; $300K extra funding for winning the first CypherTank edition, October 2025.',
    url: '/blog/pre-seed-investment',
  },
]

export const brandColors: BrandColor[] = [
  { name: 'Kaleido Green', hex: '#15E99A', usage: 'Primary accent & CTAs' },
  { name: 'Kaleido Violet', hex: '#6F32FF', usage: 'Secondary accent & protocol contexts' },
  { name: 'Green Dark', hex: '#17B581', usage: 'Brand anchor & confirmed states' },
  { name: 'Background', hex: '#0D1813', usage: 'Primary dark background' },
  { name: 'Card', hex: '#111110', usage: 'Card & panel surfaces' },
  { name: 'Muted', hex: '#9A9A94', usage: 'Secondary text' },
]

export const BRAND_GRADIENT = 'linear-gradient(135deg, #15E99A 0%, #6F32FF 100%)'

export const logoAssets: LogoAsset[] = [
  {
    id: 'horizontal',
    name: 'Full Logo — Horizontal',
    description: 'Default lockup. Headers, navbars, marketing.',
    preview: '/logos/kaleidoswap-logos/kaleidoswap-full-logo-horizontal.svg',
    files: [
      { label: 'SVG', path: '/logos/kaleidoswap-logos/kaleidoswap-full-logo-horizontal.svg' },
      { label: 'PNG', path: '/logos/kaleidoswap-logos/kaleidoswap-full-logo-horizontal.png' },
    ],
  },
  {
    id: 'vertical',
    name: 'Full Logo — Vertical',
    description: 'Primary lockup for hero contexts and brand moments.',
    preview: '/logos/kaleidoswap-logos/kaleidoswap-full-logo-vertical.svg',
    files: [
      { label: 'SVG', path: '/logos/kaleidoswap-logos/kaleidoswap-full-logo-vertical.svg' },
      { label: 'PNG', path: '/logos/kaleidoswap-logos/kaleidoswap-full-logo-vertical.png' },
    ],
  },
  {
    id: 'pictogram',
    name: 'Pictogram',
    description: 'Icon-only K mark. Favicons, app icons, small contexts.',
    preview: '/logos/kaleidoswap-logos/kaleidoswap-pictogram.svg',
    files: [
      { label: 'SVG', path: '/logos/kaleidoswap-logos/kaleidoswap-pictogram.svg' },
      { label: 'PNG', path: '/logos/kaleidoswap-logos/kaleidoswap-pictogram.png' },
    ],
  },
  {
    id: 'logotype',
    name: 'Logotype',
    description: 'Wordmark only, without the K mark.',
    preview: '/logos/kaleidoswap-logos/kaleidoswap-logotype.svg',
    files: [
      { label: 'SVG', path: '/logos/kaleidoswap-logos/kaleidoswap-logotype.svg' },
      { label: 'PNG', path: '/logos/kaleidoswap-logos/kaleidoswap-logotype.png' },
    ],
  },
]

export const logoRules: string[] = [
  'Use on dark backgrounds only — all lockups are designed for #0D1813.',
  'Keep clear space equal to the height of the K mark on all sides.',
  'Minimum width for the horizontal lockup is 120px; below that, use the pictogram.',
  'Do not stretch, rotate, recolor, or change the opacity of the mark.',
]

export const screenshots: ScreenshotAsset[] = [
  {
    id: 'desktop',
    name: 'Desktop App',
    preview: '/images/product/desktop-app-screenshot-v3-preview.webp',
    path: '/images/product/desktop-app-screenshot-v3.png',
  },
  {
    id: 'kaleidomind',
    name: 'KaleidoMind',
    preview: '/images/product/kaleidomind-screenshot-preview.webp',
    path: '/images/product/kaleidomind-screenshot.png',
  },
  {
    id: 'extension',
    name: 'Browser Extension',
    preview: '/images/product/extension-screenshot-v2-preview.webp',
    path: '/images/product/extension-screenshot-v2.png',
    portrait: true,
  },
]

export const pressCoverage: PressArticle[] = [
  {
    outlet: 'Paolo Ardoino (CEO, Bitfinex)',
    title: 'Post on X about KaleidoSwap',
    url: 'https://x.com/paoloardoino/status/2069871239238209693',
    type: 'social',
  },
  {
    outlet: 'CryptoBriefing',
    title: 'Bitfinex invests in KaleidoSwap to establish the first Bitcoin-native DEX',
    url: 'https://cryptobriefing.com/bitcoin-native-dex-kaleidoswap-launch/',
    type: 'article',
  },
  {
    outlet: 'Atlas21',
    title: 'KaleidoSwap demonstrates native RGB on Liquid without a bridge',
    url: 'https://atlas21.com/kaleidoswap-native-rgb-on-liquid/',
    type: 'article',
  },
  {
    outlet: 'Atlas21',
    title: 'First RGB Asset Swap on Lightning Network',
    url: 'https://atlas21.com/first-rgb-asset-swap-on-lightning-network/',
    type: 'article',
  },
  {
    outlet: 'Atlas21',
    title: 'A Decentralized Exchange for Bitcoin: KaleidoSwap Alpha Is Here',
    url: 'https://atlas21.com/a-decentralized-exchange-for-bitcoin-kaleidoswap-alpha-is-here/',
    type: 'article',
  },
  {
    outlet: 'Phemex',
    title: 'KaleidoSwap Secures Pre-Seed Funding from Bitfinex Ventures',
    url: 'https://phemex.com/news/article/kaleidoswap-secures-preseed-funding-from-bitfinex-ventures-17967',
    type: 'article',
  },
  {
    outlet: 'CryptoNews',
    title: 'KaleidoSwap: the first DEX on Bitcoin Lightning receives a pre-seed investment',
    url: 'https://cryptonews.net/news/defi/31609786/',
    type: 'article',
  },
  {
    outlet: 'Cryptonomist',
    title: 'KaleidoSwap: il primo DEX su Bitcoin Lightning ottiene un investimento pre-seed',
    url: 'https://cryptonomist.ch/2025/09/12/kaleidoswap-dex-bitcoin-lightning/',
    type: 'article',
  },
  {
    outlet: 'KuCoin',
    title: 'KaleidoSwap Update',
    url: 'https://www.kucoin.com/news/community/KCS/69e14472a8c1cb00074cc7f7?lang=en_US&',
    type: 'article',
  },
  {
    outlet: 'The Bitcoin Manual',
    title: 'What Are RGB Asset Swaps?',
    url: 'https://thebitcoinmanual.com/articles/rgb-asset-swaps/',
    type: 'article',
  },
  {
    outlet: 'F6S',
    title: 'Best Open Source DEX Software',
    url: 'https://www.f6s.com/software/category/open-source-dex',
    type: 'article',
  },
  {
    outlet: 'CypherTank',
    title: 'Cypher Tank S01E05 — The Final',
    url: 'https://rumble.com/v76d7i2-cypher-tank-s01e05.html',
    type: 'video',
  },
  {
    outlet: 'Plak',
    title: 'KaleidoSwap | Creare e gestire asset su RGB. Con Walter Maffione',
    url: 'https://www.youtube.com/watch?v=x9h6_71QqME',
    type: 'video',
  },
]

export const conferenceTalks: ConferenceTalk[] = [
  {
    date: 'Jun 2026',
    event: 'Freedom Tech Day',
    location: 'Prague, Czech Republic',
  },
  {
    date: 'Jan 2026',
    event: 'Plan ₿ Forum El Salvador',
    location: 'San Salvador, El Salvador',
    videoUrl: 'https://www.youtube.com/watch?v=E2tgTglCKUY',
  },
  {
    date: 'Sep 2025',
    event: 'Lightning 2049',
    location: 'Singapore',
    videoUrl: 'https://www.youtube.com/watch?v=DFpyfn3U8-4',
  },
  {
    date: 'Sep 2025',
    event: 'Bitcoin Conference Indonesia',
    location: 'Indonesia',
  },
  {
    date: 'Jun 2025',
    event: 'BTC Prague',
    location: 'Prague, Czech Republic',
  },
  {
    date: 'Apr 2025',
    event: 'Lightning Summit',
    location: 'Viareggio, Italy',
  },
  {
    date: 'Oct 2024',
    event: 'Plan ₿ Forum Lugano',
    location: 'Lugano, Switzerland',
    videoUrl: 'https://www.youtube.com/watch?v=xdcVYYm7l9o',
  },
  {
    date: 'May 2024',
    event: 'Lightning Summit',
    location: 'Viareggio, Italy',
  },
]
