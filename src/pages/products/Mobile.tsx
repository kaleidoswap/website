// src/pages/products/Mobile.tsx
import { Smartphone, Fingerprint, Bell, Shield, ArrowRight, Check } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { SOCIALS } from '@/constants/urls'
import { STATIC_PAGE_META } from '@/constants/pageMeta'
import { MOBILE_APP_LIVE } from '@/constants/productStatus'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Smartphone,
    title: 'Native iOS & Android',
    description: 'Built for mobile from the ground up, not a wrapped web view.',
  },
  {
    icon: Shield,
    title: 'Non-Custodial',
    description: 'Your keys, your coins. We never hold your funds.',
  },
  {
    icon: Fingerprint,
    title: 'Biometric Security',
    description: 'Unlock and confirm swaps with Face ID or fingerprint.',
  },
  {
    icon: Bell,
    title: 'Push Notifications',
    description: 'Get notified the instant your swap settles.',
  },
]

export const Mobile = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-transparent text-white font-display">
      <SEO {...STATIC_PAGE_META['/products/mobile']} url="/products/mobile" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          name: 'KaleidoSwap Mobile App',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'iOS, Android',
          description: 'Trade Bitcoin, stablecoins, and RGB assets across the Lightning Network from your phone. Non-custodial, biometric security.',
          url: 'https://kaleidoswap.com/products/mobile',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kaleidoswap.com' },
            { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://kaleidoswap.com/products' },
            { '@type': 'ListItem', position: 3, name: 'Mobile App', item: 'https://kaleidoswap.com/products/mobile' },
          ],
        })}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid gap-12 items-center ${MOBILE_APP_LIVE ? 'lg:grid-cols-2' : ''}`}>
            <div className={MOBILE_APP_LIVE ? '' : 'max-w-2xl mx-auto text-center'}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${
                MOBILE_APP_LIVE ? 'border-primary-500/30 bg-primary-500/10' : 'border-slate-600 bg-slate-800/50 mx-auto'
              }`}>
                <span className={`w-2 h-2 rounded-full ${MOBILE_APP_LIVE ? 'bg-green-500' : 'bg-slate-500'}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  MOBILE_APP_LIVE ? 'text-primary-400' : 'text-slate-400'
                }`}>
                  {t('Coming Soon')}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {t('Mobile App')}
              </h1>
              <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                {t('Swap on the go. Native iOS and Android apps with the same non-custodial security as the rest of KaleidoSwap. Trade BTC, stablecoins, and RGB assets across the Lightning Network from your pocket.')}
              </p>

              <div className={`flex flex-wrap gap-4 mb-8 ${MOBILE_APP_LIVE ? '' : 'justify-center'}`}>
                {MOBILE_APP_LIVE ? (
                  <Button
                    size="lg"
                    onClick={() => window.location.href = '/downloads'}
                    className="btn-glow"
                  >
                    {t('Get the App')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => window.open(SOCIALS.telegram, '_blank')}
                    className="btn-glow"
                  >
                    {t('Get Notified')}
                    <Bell className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>

              <div className={`flex items-center gap-4 text-sm text-slate-500 ${MOBILE_APP_LIVE ? '' : 'justify-center'}`}>
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

            {/* Mobile App visual — only shown once the product is actually live */}
            {MOBILE_APP_LIVE && (
              <div className="relative group flex justify-center">
                <div className="absolute -inset-8 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-full max-w-[280px] aspect-[9/18] rounded-[2.5rem] border border-white/10 bg-gray-900/80 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <Smartphone className="w-20 h-20 text-primary-400/60" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product detail sections — describe live functionality, so only shown once launched */}
      {MOBILE_APP_LIVE && (
        <>
          {/* Features */}
          <section className="py-20">
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
              <p className="text-base sm:text-lg text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                {t('Three simple steps to start trading')}
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { step: '01', title: 'Connect Wallet', desc: 'Link your wallet (Alby, Bitmask, KaleidoSwap Extension, Xverse)' },
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

          {/* CTA */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-4">{t('Get the App')}</h2>
              <p className="text-base sm:text-lg text-slate-400 mb-8">
                {t('Available now for iOS and Android.')}
              </p>
              <Button
                size="lg"
                onClick={() => window.location.href = '/downloads'}
                className="btn-glow"
              >
                {t('Get the App')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </section>
        </>
      )}

      <Footer {...footerConfig} />
    </div>
  )
}
