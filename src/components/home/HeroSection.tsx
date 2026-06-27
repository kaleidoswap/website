import { Check, Download, Hammer } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/common/Button'
import { KaleidoScopeHeroAnimation } from '@/components/animations/KaleidoScopeHeroAnimation'
import { MobileHeroAnimation } from '@/components/animations/MobileHeroAnimation'
import { useTranslation } from 'react-i18next'
import { useAppNavigation } from '@/hooks/useNavigation'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { useIsMobile } from '@/hooks/useIsMobile'
const bitcoinLogo = '/logos/protocol-logos/bitcoin/bitcoin-logo-orange.svg'
const rgbLogo = '/logos/protocol-logos/rgb/rgb-logo.svg'
const sparkAsterisk = '/logos/protocol-logos/spark/Asterisk/Spark Asterisk White.svg'
const arkadeLogo = '/logos/protocol-logos/arkade/arkade-logo.svg'
const liquidLogo = '/logos/protocol-logos/liquid/logo-liquid.svg'
const taprootLogo = '/logos/protocol-logos/taproot-assets/tapass-logo.svg'
const lightningLogo = '/logos/protocol-logos/lightning/lightning-logo.svg'

const heroIconsToPreload = [bitcoinLogo, rgbLogo, sparkAsterisk, arkadeLogo, liquidLogo, taprootLogo, lightningLogo]

export const HeroSection = () => {
  const { t } = useTranslation()
  const { handleNavigation } = useAppNavigation()
  const isMobile = useIsMobile()

  return (
    <section className="relative min-h-screen flex items-center pt-28 sm:pt-20 overflow-hidden">
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
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                {t('Trustless Swaps on')}{' '}
                <span className="text-gradient">{t('Bitcoin Layers')}</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-400 max-w-xl leading-relaxed">
                {t('The DEX for Bitcoin\'s multi-layer future. Swap BTC, USDT, stablecoins, and real-world assets across Lightning, RGB, and Spark. Sovereign by design.')}
              </p>
            </div>
          </AnimateIn>

          {/* CTAs */}
          <AnimateIn variant="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => handleNavigation('/products/sdk', false)}
                className="h-12 px-8 btn-glow flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Hammer className="w-5 h-5" />
                {t('Build with the SDK')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation('https://kaleidoswap.com/products', true)}
                className="h-12 px-8 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-gray-200 flex sm:hidden items-center justify-center gap-2 w-full"
              >
                <Download className="w-5 h-5" />
                {t('Download the Apps')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation('https://kaleidoswap.com/products', true)}
                className="h-12 px-8 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-gray-200 hidden sm:flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('Download the Apps')}
              </Button>
            </div>
          </AnimateIn>

          {/* Trust Signals */}
          <AnimateIn variant="fade-up" delay={450}>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 pt-4">
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                <span>{t('Open Source')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                <span>{t('Non-Custodial')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                <span>{t('Permissionless')}</span>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Hero Visualization - conditional mobile/desktop animation */}
        <AnimateIn variant="scale" delay={200} duration={800} className="relative">
          {isMobile ? (
            <MobileHeroAnimation />
          ) : (
            <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[550px] mx-auto flex items-center justify-center">
              <KaleidoScopeHeroAnimation className="w-full h-full" />
            </div>
          )}
        </AnimateIn>
      </div>
    </section>
  )
}
