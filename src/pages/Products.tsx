// src/pages/Products.tsx
import { Globe, Monitor, Smartphone, Puzzle, Code, ArrowRight, Check } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const products = [
  {
    id: 'web-app',
    name: 'Web App',
    icon: Globe,
    status: 'live' as const,
    description: 'The fastest way to swap. No download required. Connect your WebLN wallet and trade instantly.',
    features: [
      'No installation required',
      'Works on any browser',
      'Real-time quotes',
    ],
    href: '/products/web-app',
    color: 'primary',
  },
  {
    id: 'desktop',
    name: 'Desktop App',
    icon: Monitor,
    status: 'live' as const,
    description: 'Full sovereignty. Bundles a complete RGB Lightning node. Your infrastructure, your rules.',
    features: [
      'Integrated RGB-LN node',
      'macOS, Windows, Linux',
      'Maximum privacy',
    ],
    href: '/products/desktop',
    color: 'secondary',
  },
  {
    id: 'sdk',
    name: 'Developer SDK',
    icon: Code,
    status: 'live' as const,
    description: 'Build on KaleidoSwap. TypeScript and Rust SDKs with full documentation.',
    features: [
      'Full API documentation',
      'Code examples',
      'Market maker tools',
    ],
    href: '/products/sdk',
    color: 'green',
  },
  {
    id: 'mobile',
    name: 'Rate (Mobile)',
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
  {
    id: 'extension',
    name: 'Browser Extension',
    icon: Puzzle,
    status: 'coming-soon' as const,
    description: 'Quick swaps from your toolbar. Chrome, Firefox, and Safari support.',
    features: [
      'One-click swaps',
      'Portfolio overview',
      'All major browsers',
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

              return (
                <div
                  key={product.id}
                  className={`glass-card rounded-2xl p-8 transition-all ${
                    isLive
                      ? 'cursor-pointer hover:border-primary-500/30'
                      : 'opacity-60'
                  }`}
                  onClick={() => isLive && navigate(product.href)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon */}
                    <div
                      className={`p-4 rounded-xl shrink-0 w-fit ${
                        isLive
                          ? product.color === 'primary'
                            ? 'bg-primary-500/10 text-primary-400'
                            : product.color === 'secondary'
                            ? 'bg-secondary-500/10 text-secondary-400'
                            : 'bg-green-500/10 text-green-400'
                          : 'bg-gray-700/50 text-gray-500'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold">
                          {t(product.name)}
                        </h2>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            isLive
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {isLive ? t('Live') : t('Coming Soon')}
                        </span>
                      </div>

                      <p className="text-slate-400 mb-4">
                        {t(product.description)}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        {product.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-300"
                          >
                            <Check
                              className={`w-4 h-4 ${
                                isLive ? 'text-primary-500' : 'text-gray-600'
                              }`}
                            />
                            {t(feature)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    {isLive && (
                      <div className="shrink-0">
                        <Button
                          variant="outline"
                          className="border-slate-700 hover:border-primary-500"
                        >
                          {t('Learn More')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
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
