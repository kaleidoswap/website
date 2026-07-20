// Single source of truth for static-page <title>/<meta description> text.
// Consumed by both the client (src/pages/**, SEO.tsx) and the Cloudflare
// Worker (worker/index.ts), which pre-renders these tags server-side.
// The '/' entry's `title` is the full document title (no suffix applied);
// every other entry's `title` is short and gets " | KaleidoSwap" appended
// by the consumer (see SEO.tsx's `fullTitle` and the worker's staticRoutes).

export interface PageMeta {
  title: string
  description: string
}

export const STATIC_PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'KaleidoSwap — Trustless Swaps on Bitcoin L2s',
    description:
      'Non-custodial Bitcoin DEX for Bitcoin L2s. Bitcoin and stablecoin atomic swaps on Lightning, RGB, Arkade, Liquid, and Spark. Ready for agentic payments.',
  },
  '/products': {
    title: 'Products',
    description:
      "KaleidoSwap products: Web App, Desktop App, SDK, Mobile App, and Browser Extension. Build and trade on Bitcoin's most connected swap protocol.",
  },
  '/products/web-app': {
    title: 'Web App',
    description:
      'Trustless Bitcoin swap in your browser — no download, no KYC. Trade BTC, USDT, and RGB assets across the Lightning Network. The fastest non-custodial Lightning DEX.',
  },
  '/products/desktop': {
    title: 'Desktop App',
    description:
      'Full sovereignty, multi-protocol wallet for Bitcoin. Bundles a complete RGB Lightning node and local AI brain. Non-custodial Bitcoin swaps across Bitcoin L2s.',
  },
  '/products/sdk': {
    title: 'KaleidoSDK',
    description:
      'The Bitcoin atomic swap SDK for Lightning Network, RGB, Arkade, Liquid, Spark and more. Integrate trustless atomic swaps into any wallet, AI agent or app.',
  },
  '/products/extension': {
    title: 'Browser Extension',
    description:
      'Multi-protocol Bitcoin wallet for Lightning, RGB, Spark, Liquid and Arkade. Private, non-custodial Bitcoin swaps. Manage Bitcoin L2s assets from the browser.',
  },
  '/products/mobile': {
    title: 'Mobile App',
    description:
      'KaleidoSwap Mobile — trade Bitcoin, stablecoins, and RGB assets across the Lightning Network from your phone. Non-custodial, biometric security. Native iOS and Android apps, coming soon.',
  },
  '/products/ai-tools': {
    title: 'AI Tools',
    description:
      'Autonomous agents, on-device AI assistance, and open source tools that bring AI to Bitcoin apps and enable agentic payments.',
  },
  '/downloads': {
    title: 'Download',
    description:
      'Download the KaleidoSwap Desktop App. Self-custody Bitcoin DEX that bundles RGB Lightning Network node and enable atomic swaps of Bitcoin L2s assets.',
  },
  '/blog': {
    title: 'Blog',
    description:
      'Announcements, deep dives, and builder resources about KaleidoSwap products and Bitcoin L2s. Written for Bitcoin wallet and agentic payments builders.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'KaleidoSwap Privacy Policy. Learn how we protect your data and maintain your privacy while using our Bitcoin DEX.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      'KaleidoSwap Terms of Service. Understand the terms and conditions for using our Bitcoin DEX platform.',
  },
}
