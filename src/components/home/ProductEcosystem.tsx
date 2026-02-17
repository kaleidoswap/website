import { Globe, Monitor, Smartphone, Puzzle, Download } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { PRODUCTS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { useAppNavigation } from '@/hooks/useNavigation'
import { AnimateIn } from '@/components/animations/AnimateIn'

export const ProductEcosystem = () => {
  const { t } = useTranslation()
  const { handleNavigation } = useAppNavigation()

  return (
    <section className="py-24 bg-gray-950/70">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn variant="fade-up">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('Our Ecosystem')}</h2>
              <p className="text-slate-400">{t('One protocol, multiple ways to interact.')}</p>
            </div>
            <a
              href={PRODUCTS.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border-b border-primary-500 pb-1 hover:text-primary-400 transition-colors"
            >
              {t('View Developer Documentation')}
            </a>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Web App (Large) */}
          <AnimateIn variant="fade-up" delay={0} className="md:col-span-2 lg:col-span-2 row-span-2">
            <div className="glass-card rounded-2xl overflow-hidden relative group h-full">
              <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-primary-500 rounded-lg mb-4 flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('Web App')}</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-xs">
                  {t('The fastest way to swap. No download required. Connect your wallet and go.')}
                </p>
                <div className="mt-auto">
                  <Button
                    onClick={() => handleNavigation(PRODUCTS.app, true)}
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                  >
                    {t('Launch App')}
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-3/4 h-3/4 translate-x-1/4 translate-y-1/4 bg-gradient-to-tl from-primary-500/20 to-transparent rounded-tl-xl" />
            </div>
          </AnimateIn>

          {/* Desktop */}
          <AnimateIn variant="fade-up" delay={100} className="md:col-span-1 lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 p-32 bg-primary-500/10 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('Desktop')}</h3>
                  <Monitor className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm mb-4">{t('Power user features with full RGB Lightning node built-in.')}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300">macOS</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300">Windows</span>
                  <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300">Linux</span>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/downloads', false)}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t('Download')}
                </Button>
              </div>
            </div>
          </AnimateIn>

          {/* Mobile */}
          <AnimateIn variant="fade-up" delay={200} className="md:col-span-1">
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/5 transition-colors h-full">
              <div>
                <div className="w-10 h-10 bg-secondary-500/20 text-secondary-400 rounded-lg mb-3 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-1">{t('Mobile')}</h3>
                <p className="text-slate-400 text-xs">{t('Swap on the go. iOS & Android.')}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <span>{t('Coming Soon')}</span>
              </div>
            </div>
          </AnimateIn>

          {/* Extension */}
          <AnimateIn variant="fade-up" delay={300} className="md:col-span-1">
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/5 transition-colors h-full">
              <div>
                <div className="w-10 h-10 bg-bitcoin-500/20 text-bitcoin-400 rounded-lg mb-3 flex items-center justify-center">
                  <Puzzle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-1">{t('Extension')}</h3>
                <p className="text-slate-400 text-xs">{t('Seamless browser integration.')}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <span>{t('Coming Soon')}</span>
              </div>
            </div>
          </AnimateIn>

          {/* SDK */}
          <AnimateIn variant="fade-up" delay={400} className="md:col-span-2 lg:col-span-2 lg:col-start-2">
            <div className="glass-card rounded-2xl p-6 flex items-center justify-between relative overflow-hidden h-full">
              <div className="relative z-10 max-w-[60%]">
                <h3 className="text-xl font-bold mb-2">{t('Developer SDK')}</h3>
                <p className="text-slate-400 text-sm">{t('Build your own swap interface or integrate Kaleido into your wallet.')}</p>
              </div>
              <div className="text-6xl text-white/5 absolute -right-4 -bottom-4 font-mono font-bold select-none">
                &lt;/&gt;
              </div>
              <div className="relative z-10">
                <Button
                  onClick={() => handleNavigation(PRODUCTS.docs, true)}
                  className="bg-white text-gray-900 hover:bg-slate-200"
                >
                  {t('Read Docs')}
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
