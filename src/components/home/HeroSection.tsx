import { Check, Download } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/common/Button'
import { PRODUCTS } from '@/constants/urls'
import { KaleidoScopeHeroAnimation } from '@/components/animations/KaleidoScopeHeroAnimation'
import { useTranslation } from 'react-i18next'
import { useAppNavigation } from '@/hooks/useNavigation'
import { AnimateIn } from '@/components/animations/AnimateIn'
import bitcoinLogo from '@/assets/icons/bitcoin/bitcoin-logo.svg'
import rgbLogo from '@/assets/icons/rgb/rgb-logo.svg'
import sparkAsterisk from '@/assets/icons/spark/Asterisk/Spark Asterisk White.svg'
import arkadeLogo from '@/assets/icons/arkade/arkade-icon.svg'
import liquidLogo from '@/assets/icons/liquid/logo-liquid.svg'
import taprootLogo from '@/assets/icons/taproot-assets/tapass-logo.png'

const heroIconsToPreload = [bitcoinLogo, rgbLogo, sparkAsterisk, arkadeLogo, liquidLogo, taprootLogo]

export const HeroSection = () => {
  const { t } = useTranslation()
  const { handleNavigation } = useAppNavigation()

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <Helmet>
        {heroIconsToPreload.map((icon) => (
          <link key={icon} rel="preload" href={icon} as="image" />
        ))}
      </Helmet>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          {/* Status Badge */}
          <AnimateIn variant="fade-down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                {t('Live on Testnet')}
              </span>
            </div>
          </AnimateIn>

          {/* Headline */}
          <AnimateIn variant="fade-up" delay={150}>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                {t('Trustless Swaps on')}{' '}
                <span className="text-gradient">{t('Bitcoin Layers')}</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                {t('The DEX for Bitcoin\'s multi-layer future. Swap BTC, USDT, stablecoins, and real-world assets across Lightning, RGB, and Spark. Sovereign by design.')}
              </p>
            </div>
          </AnimateIn>

          {/* CTAs */}
          <AnimateIn variant="fade-up" delay={300}>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => handleNavigation(PRODUCTS.app, true)}
                className="h-12 px-8 btn-glow flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                {t('Launch Web App')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation('/downloads', false)}
                className="h-12 px-8 border-slate-600 hover:border-white text-slate-300 hover:text-white flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('Download Desktop')}
              </Button>
            </div>
          </AnimateIn>

          {/* Trust Signals */}
          <AnimateIn variant="fade-up" delay={450}>
            <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-primary-500" />
                <span>{t('100% Open Source')}</span>
              </div>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-primary-500" />
                <span>{t('Non-Custodial')}</span>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Hero Visualization - Kaleidoscope animation (responsive) */}
        <AnimateIn variant="scale" delay={200} duration={800} className="relative">
          <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[550px] mx-auto flex items-center justify-center">
            <KaleidoScopeHeroAnimation className="w-full h-full" />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
