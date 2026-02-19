import { Globe, Monitor, Smartphone, Puzzle, Download, Clock, ArrowUpRight, Terminal, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'
import { PRODUCTS, DOCS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { useAppNavigation } from '@/hooks/useNavigation'
import { AnimateIn } from '@/components/animations/AnimateIn'

// ─── Shared token ────────────────────────────────────────────────────────────
const CARD_BASE = 'rounded-2xl border border-white/[0.06] bg-gray-900 relative overflow-hidden group h-full'
const CARD_HOVER = { y: -3 } as const
const SPRING = { type: 'spring', stiffness: 300, damping: 20 } as const

// Icon container — same size / shape everywhere, colour comes from props
const CardIcon = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
    {children}
  </div>
)

// Ambient glow orb — top-right on every "active" card
const GlowOrb = ({ color }: { color: string }) => (
  <div className={`absolute -top-12 -right-12 w-52 h-52 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100 ${color}`} />
)

// Unified "Coming Soon" badge
const ComingSoonBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-slate-500 font-medium w-fit">
    <Clock className="w-3 h-3" />
    {label}
  </span>
)

// Unified platform tag
const PlatformTag = ({ label }: { label: string }) => (
  <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-medium">
    {label}
  </span>
)
// ─────────────────────────────────────────────────────────────────────────────

export const ProductEcosystem = () => {
  const { t } = useTranslation()
  const { handleNavigation } = useAppNavigation()

  return (
    <section className="py-16 bg-gray-950/70">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <AnimateIn variant="fade-up">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('Our Ecosystem')}</h2>
              <p className="text-slate-400">{t('One protocol, multiple ways to interact.')}</p>
            </div>
            <a
              href={PRODUCTS.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <span className="border-b border-slate-700 group-hover/link:border-primary-500 pb-0.5 transition-colors">
                {t('View Developer Documentation')}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover/link:text-primary-400 transition-colors" />
            </a>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* ── Web App — hero (2 × 2) ─────────────────────────────────── */}
          <AnimateIn variant="fade-up" delay={0} className="md:col-span-2 lg:col-span-2 row-span-2 h-full">
            <motion.div
              className={CARD_BASE}
              whileHover={{ scale: 1.01 }}
              transition={SPRING}
            >
              {/* Richer layered glow for the hero */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-1/3 right-0 w-40 h-40 bg-primary-400/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 mb-5">
                  <Globe className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{t('Web App')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">
                  {t('The fastest way to swap. No download required. Connect your wallet and go.')}
                </p>

                <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  {t('Testnet Soon')}
                </span>

                <div className="mt-auto pt-6 flex items-center gap-4">
                  <Button
                    onClick={() => handleNavigation(PRODUCTS.app, true)}
                    className="bg-primary-500/15 hover:bg-primary-500/25 text-primary-300 border border-primary-500/25 hover:border-primary-500/40 transition-all"
                  >
                    {t('Launch App')}
                  </Button>
                  <button
                    onClick={() => handleNavigation('/products/web-app', false)}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t('See More')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimateIn>

          {/* ── Desktop ──────────────────────────────────────────────────── */}
          <AnimateIn variant="fade-up" delay={100} className="md:col-span-1 lg:col-span-2 h-full">
            <motion.div className={CARD_BASE} whileHover={CARD_HOVER} transition={SPRING}>
              <GlowOrb color="bg-teal-500/10" />
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <CardIcon color="bg-teal-500/10 text-teal-400">
                    <Monitor className="w-5 h-5" />
                  </CardIcon>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    <PlatformTag label="macOS" />
                    <PlatformTag label="Windows" />
                    <PlatformTag label="Linux" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{t('Desktop')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('Power user features with full RGB Lightning node built-in.')}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation('/downloads', false)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t('Download')}
                  </Button>
                  <button
                    onClick={() => handleNavigation('/products/desktop', false)}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t('See More')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimateIn>

          {/* ── Developer SDK ─────────────────────────────────────────────── */}
          <AnimateIn variant="fade-up" delay={200} className="md:col-span-1 lg:col-span-2 h-full">
            <motion.div className={CARD_BASE} whileHover={CARD_HOVER} transition={SPRING}>
              <GlowOrb color="bg-secondary-500/8" />

              {/* Decorative watermark */}
              <div className="absolute right-6 inset-y-0 flex items-center pointer-events-none select-none">
                <span className="text-[72px] font-mono font-black text-white/[0.03] leading-none">&lt;/&gt;</span>
              </div>

              <div className="p-6 relative z-10 flex flex-col h-full">
                <CardIcon color="bg-secondary-500/10 text-secondary-400">
                  <Terminal className="w-5 h-5" />
                </CardIcon>
                <h3 className="text-base font-bold text-white mt-3 mb-1">{t('Developer SDK')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('Build your own swap interface or integrate Kaleido into your wallet.')}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-4">
                  <Button
                    size="sm"
                    onClick={() => handleNavigation(DOCS.sdk, true)}
                    className="bg-white text-gray-900 hover:bg-slate-100 font-semibold shadow-lg shadow-black/20"
                  >
                    {t('Read Docs')}
                  </Button>
                  <button
                    onClick={() => handleNavigation('/products/sdk', false)}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t('See More')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimateIn>

          {/* ── Mobile — coming soon ──────────────────────────────────────── */}
          <AnimateIn variant="fade-up" delay={300} className="md:col-span-1 lg:col-span-2 h-full">
            <motion.div
              className={`${CARD_BASE} opacity-70 hover:opacity-100 transition-opacity duration-300`}
              whileHover={CARD_HOVER}
              transition={SPRING}
            >
              <div className="p-6 relative z-10 flex flex-col h-full">
                <CardIcon color="bg-secondary-500/10 text-secondary-400">
                  <Smartphone className="w-5 h-5" />
                </CardIcon>
                <h3 className="text-base font-bold text-white mt-3 mb-1">{t('Mobile')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('Swap on the go. iOS & Android.')}</p>
                <div className="mt-auto pt-4">
                  <ComingSoonBadge label={t('Coming Soon')} />
                </div>
              </div>
            </motion.div>
          </AnimateIn>

          {/* ── Extension — coming soon ───────────────────────────────────── */}
          <AnimateIn variant="fade-up" delay={400} className="md:col-span-2 lg:col-span-2 h-full">
            <motion.div
              className={`${CARD_BASE} opacity-70 hover:opacity-100 transition-opacity duration-300`}
              whileHover={CARD_HOVER}
              transition={SPRING}
            >
              <div className="p-6 relative z-10 flex flex-col h-full">
                <CardIcon color="bg-bitcoin-500/10 text-bitcoin-400">
                  <Puzzle className="w-5 h-5" />
                </CardIcon>
                <h3 className="text-base font-bold text-white mt-3 mb-1">{t('Extension')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t('Seamless browser integration.')}</p>
                <div className="mt-auto pt-4">
                  <ComingSoonBadge label={t('Coming Soon')} />
                </div>
              </div>
            </motion.div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
