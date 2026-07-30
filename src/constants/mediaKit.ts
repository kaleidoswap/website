// src/constants/mediaKit.ts
import type {
  BrandColor,
  LogoAsset,
  ScreenshotAsset,
  TeamMember,
  PressArticle,
  ConferenceTalk,
  FactSheetEntry,
} from '@/types/mediaKit'

export const PRESS_CONTACT_EMAIL = 'emile@kaleidoswap.com'

export const MEDIA_KIT_ZIP = '/media-kit/kaleidoswap-media-kit.zip'

// Boilerplate texts are meant to be copied verbatim by journalists — kept in English only.
export const BOILERPLATE_SHORT =
  'KaleidoSwap is a full-stack decentralized exchange. It enables trustless atomic swaps of bitcoin, stablecoins, and RGB assets across all Bitcoin layers.'

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
    preview: '/images/desktop-app-screenshot-v3-preview.webp',
    path: '/images/desktop-app-screenshot-v3.png',
  },
  {
    id: 'kaleidomind',
    name: 'KaleidoMind',
    preview: '/images/kaleidomind-screenshot-preview.webp',
    path: '/images/kaleidomind-screenshot.png',
  },
  {
    id: 'extension',
    name: 'Browser Extension',
    preview: '/images/extension-screenshot-v2-preview.webp',
    path: '/images/extension-screenshot-v2.png',
    portrait: true,
  },
]

// Bios are official press copy — kept in English only.
export const team: TeamMember[] = [
  {
    id: 'walter-maffione',
    name: 'Walter Maffione',
    role: 'Co-Founder & CEO',
    photoPreview: '/images/team/walter-maffione-preview.webp',
    photo: '/images/team/walter-maffione.jpg',
    bio: 'Founder and CEO with 6+ years in software engineering. RGB Lightning Node core contributor, professor of Lightning Network and Layer 2 technologies at Politecnico di Torino, scaled AI infrastructure at Addfor and Intesa, and former R&D lead at BitPolito. Leads KaleidoSwap’s vision, product strategy, and technical architecture.',
    bioDoc: '/media-kit/bios/walter-maffione-bio.pdf',
    linkedin: 'https://www.linkedin.com/in/walter-maffione/',
    x: 'https://x.com/bit_walt',
    github: 'https://github.com/bitwalt',
  },
  {
    id: 'manuel-cumerlato',
    name: 'Manuel Cumerlato',
    role: 'Chief Operation Officer',
    photoPreview: '/images/team/manuel-cumerlato-preview.webp',
    photo: '/images/team/manuel-cumerlato.jpg',
    bio: 'Italian-Hungarian sales and BD leader, combining enterprise-grade commercial experience with bitcoin-native execution. Managed major enterprise and public-sector accounts at Sophos. Bitcoiner since 2015 and a regular presence at international conferences. Leads sales and BD at KaleidoSwap while supporting operational execution as the company scale.',
    bioDoc: '/media-kit/bios/manuel-cumerlato-bio.pdf',
    linkedin: 'https://www.linkedin.com/in/manuel-cumerlato/',
    x: 'https://x.com/Mannysb_',
  },
  {
    id: 'emile-jellinek',
    name: 'Emile Jellinek',
    role: 'Chief Growth Officer',
    photoPreview: '/images/team/emile-jellinek-preview.webp',
    photo: '/images/team/emile-jellinek.jpg',
    bio: 'Italian-Dutch founder based in Turin, with a background spanning product design and digital marketing. Co-founded multiple ventures across Bitcoin and AI. Actively involved in Bitcoin educational projects like BitPolito and Bitcoin Torino, speaking in many international Bitcoin conferences. At KaleidoSwap, responsible for strategy, growth, and design.',
    bioDoc: '/media-kit/bios/emile-jellinek-bio.pdf',
    linkedin: 'https://www.linkedin.com/in/emilejellinek/',
    x: 'https://x.com/emilejellinek',
    github: 'https://github.com/jelleml',
  },
  {
    id: 'mo-harchegani',
    name: 'Mo Harchegani',
    role: 'Software Engineer',
    photoPreview: '/images/team/mo-harchegani-preview.webp',
    photo: '/images/team/mo-harchegani.jpg',
    bio: 'Iranian engineer spanning full-stack development, infrastructure engineering, and Bitcoin tech stack. Lightning Network team lead at BitPolito and Bitcoin open source projects contributor. At KaleidoSwap, leads development of the frontend and TypeScript SDK, builds CI/CD pipelines, and manages production infrastructure.',
    bioDoc: '/media-kit/bios/mo-harchegani-bio.pdf',
    linkedin: 'https://www.linkedin.com/in/mo-harchegani/',
    x: 'https://x.com/mo_harchegani',
    github: 'https://github.com/moakilodas',
  },
  {
    id: 'arshia-ramezan',
    name: 'Arshia Ramezan',
    role: 'Software Engineer',
    photoPreview: '/images/team/arshia-ramezan-preview.webp',
    photo: '/images/team/arshia-ramezan.jpg',
    bio: 'Iranian software engineer focused on Bitcoin protocol, backend architecture, and the services layer. Active open-source contributor to Lightning Network and other Layer 2 technologies. Winner of multiple hackathons, including the AI + Bitcoin Plan ₿ Hackathon. At KaleidoSwap, owns the backend and services layer end-to-end.',
    bioDoc: '/media-kit/bios/arshia-ramezan-bio.pdf',
    linkedin: 'https://www.linkedin.com/in/arshia-ramezan-mahmoudi-/',
    x: 'https://x.com/Un1c0_the_one',
    github: 'https://github.com/Arshia-r-m',
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
