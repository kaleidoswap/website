// src/pages/Products.tsx
import { Globe, Monitor, Smartphone, Puzzle, Code, ArrowRight, Check } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const colorConfig: Record<string, { icon: string; title: string; border: string; chip: string; check: string }> = {
  purple: {
    icon: 'bg-purple-500/10 text-purple-400',
    title: 'text-purple-400',
    border: 'hover:border-purple-500/30',
    chip: 'bg-purple-500/20 text-purple-400',
    check: 'text-purple-400',
  },
  green: {
    icon: 'bg-green-500/10 text-green-400',
    title: 'text-green-400',
    border: 'hover:border-green-500/30',
    chip: 'bg-green-500/20 text-green-400',
    check: 'text-green-400',
  },
  gray: {
    icon: 'bg-gray-700/50 text-gray-500',
    title: 'text-gray-500',
    border: '',
    chip: 'bg-gray-700 text-gray-400',
    check: 'text-gray-600',
  },
}

const products = [
  {
    id: 'sdk',
    name: 'Developer SDK',
    icon: Code,
    status: 'live' as const,
    chipLabel: 'Ready to Integrate',
    description: 'Build on KaleidoSwap. TypeScript and Rust SDKs with full documentation.',
    features: [
      'Full API documentation',
      'Code examples',
      'Market maker tools',
    ],
    href: '/products/sdk',
    color: 'purple',
  },
  {
    id: 'desktop',
    name: 'Desktop App',
    icon: Monitor,
    status: 'live' as const,
    chipLabel: 'Live on Testnet',
    description: 'Full sovereignty. Bundles a complete RGB Lightning node. Your infrastructure, your rules.',
    features: [
      'Integrated RGB-LN node',
      'macOS, Windows, Linux',
      'Maximum privacy',
    ],
    href: '/products/desktop',
    color: 'green',
  },
  {
    id: 'extension',
    name: 'Browser Extension',
    icon: Puzzle,
    status: 'live' as const,
    chipLabel: 'Live on Mainnet',
    description: 'Multi-protocol Chrome extension wallet. Bitcoin, Lightning, RGB, and more from your toolbar.',
    features: [
      'Multi-protocol wallet',
      'WebLN & Nostr built-in',
      'DApp connectivity',
    ],
    href: '/products/extension',
    color: 'green',
  },
  {
    id: 'web-app',
    name: 'Web App',
    icon: Globe,
    status: 'coming-soon' as const,
    description: 'The fastest way to swap. No download required. Launching on testnet soon.',
    features: [
      'No installation required',
      'Works on any browser',
      'Real-time quotes',
    ],
    href: '#',
    color: 'gray',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    icon: Smartphone,
    status: 'coming-soon' as const,
    description: 'Swap on the go. Native iOS and Android apps with the same security.',
    features: [
      'Native iOS & Android',
      'Biometric security',
      'Push notifications',
    ],
    href: '#',
    color: 'gray',
  },
]

export const Products = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Products"
        description="KaleidoSwap products: Web App, Desktop App, SDK, Mobile App, and Browser Extension. Build and trade on Bitcoin's most connected swap protocol."
        url="/products"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('Our Products')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t("Build and trade on Bitcoin's most connected swap protocol. Choose your platform.")}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6">
            {products.map((product) => {
              const Icon = product.icon
              const isLive = product.status === 'live'
              const hasPage = product.href !== '#'
              const cc = colorConfig[product.color] ?? colorConfig.gray
              const chipClass = cc.chip
              const chipText = product.chipLabel ?? (isLive ? 'Live' : 'Coming Soon')

              return (
                <div
                  key={product.id}
                  className={`relative glass-card rounded-2xl p-8 transition-all ${
                    hasPage
                      ? `cursor-pointer ${cc.border}`
                      : 'opacity-60'
                  }`}
                  onClick={() => hasPage && navigate(product.href)}
                >
                  <div className="flex flex-col md:flex-row md:items-stretch gap-6">
                    {/* Icon */}
                    <div className={`p-4 rounded-xl shrink-0 w-fit self-start ${cc.icon}`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className={`text-2xl font-bold mb-2 ${cc.title}`}>
                        {t(product.name)}
                      </h2>

                      <p className="text-slate-400 mb-4">
                        {t(product.description)}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        {product.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-300"
                          >
                            <Check className={`w-4 h-4 ${cc.check}`} />
                            {t(feature)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chip — mobile only, absolute top-right */}
                    <span className={`md:hidden absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${chipClass}`}>
                      {t(chipText)}
                    </span>

                    {/* Right column: chip + button */}
                    <div className="shrink-0 flex flex-col items-start md:items-end justify-between gap-3">
                      <span className={`invisible md:visible text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${chipClass}`}>
                        {t(chipText)}
                      </span>
                      {hasPage && (
                        <Button
                          variant="outline"
                          className="border-slate-600 hover:border-slate-500 text-slate-300 hover:text-gray-200"
                        >
                          {t('Learn More')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
