// src/pages/products/WebApp.tsx
import { Globe, Zap, Shield, Wallet, ArrowRight, ExternalLink, Check } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { PRODUCTS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Zap,
    title: 'Instant Swaps',
    description: 'Execute trades in seconds with Lightning-fast settlement.',
  },
  {
    icon: Shield,
    title: 'Non-Custodial',
    description: 'Connect your wallet and trade. We never hold your keys.',
  },
  {
    icon: Wallet,
    title: 'WebLN Compatible',
    description: 'Works with Alby, Bitmask, Rate Extension, Xverse, and other WebLN wallets.',
  },
  {
    icon: Globe,
    title: 'No Installation',
    description: 'Access from any browser, any device. Just connect and swap.',
  },
]

const supportedWallets = [
  { name: 'Alby', status: 'supported' },
  { name: 'Bitmask', status: 'supported' },
  { name: 'Rate Extension', status: 'supported' },
  { name: 'Xverse', status: 'supported' },
]

export const WebApp = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Web App"
        description="Trade BTC, stablecoins, and RGB assets directly from your browser. No installation required. Connect your wallet and start swapping. Supports Alby, Bitmask, Rate Extension, and Xverse."
        url="/products/web-app"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                  {t('Live on Testnet')}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {t('Web App')}
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                {t('The fastest way to swap. No download required. Connect your wallet and trade BTC, stablecoins, and RGB assets in seconds. Supports Alby, Bitmask, Rate Extension, and Xverse.')}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={() => window.open(PRODUCTS.app, '_blank')}
                  className="btn-glow"
                >
                  {t('Launch Web App')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(PRODUCTS.docs, '_blank')}
                >
                  {t('View Documentation')}
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-primary-500" />
                  <span>{t('No registration')}</span>
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full" />
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-primary-500" />
                  <span>{t('Non-custodial')}</span>
                </div>
              </div>
            </div>

            {/* Web App Screenshot */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-2xl" />
              <img
                src="/images/webapp-screenshot.png"
                alt={t('Web App Screenshot')}
                className="relative w-full rounded-xl drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Key Features')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 rounded-xl">
                <feature.icon className="w-10 h-10 text-primary-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t(feature.title)}</h3>
                <p className="text-slate-400 text-sm">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('How It Works')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('Three simple steps to start trading')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Link your wallet (Alby, Bitmask, Rate Extension, Xverse)' },
              { step: '02', title: 'Select Pair', desc: 'Choose assets to swap (BTC, USDT, RGB tokens)' },
              { step: '03', title: 'Execute Swap', desc: 'Confirm and execute atomically' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{t(item.title)}</h3>
                <p className="text-slate-400 text-sm">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Wallets */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Supported Wallets')}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {supportedWallets.map((wallet) => (
              <div
                key={wallet.name}
                className={`glass-card px-8 py-4 rounded-xl flex items-center gap-3 ${
                  wallet.status === 'coming-soon' ? 'opacity-50' : ''
                }`}
              >
                <span className="text-lg font-bold">{wallet.name}</span>
                {wallet.status === 'coming-soon' && (
                  <span className="text-xs text-slate-500">{t('Soon')}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('Ready to Swap?')}</h2>
          <p className="text-slate-400 mb-8">
            {t('Connect your wallet and start trading in seconds.')}
          </p>
          <Button
            size="lg"
            onClick={() => window.open(PRODUCTS.app, '_blank')}
            className="btn-glow"
          >
            {t('Launch Web App')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
