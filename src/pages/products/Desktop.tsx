// src/pages/products/Desktop.tsx
import { Monitor, Shield, Server, Lock, Download, ArrowRight, Check, Terminal } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { GITHUB } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Server,
    title: 'Integrated RGB-LN Node',
    description: 'Full RGB Lightning node bundled. No external dependencies.',
    color: 'text-secondary-400',
    bg: 'bg-secondary-500/10',
  },
  {
    icon: Shield,
    title: 'Maximum Privacy',
    description: 'Your node, your rules. All data stays on your machine.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Lock,
    title: 'Self-Custody',
    description: 'Keys never leave your device. True sovereign trading.',
    color: 'text-bitcoin-400',
    bg: 'bg-bitcoin-500/10',
  },
  {
    icon: Terminal,
    title: 'Power User Features',
    description: 'Channel management, liquidity controls, advanced settings.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
]

const platforms = [
  { name: 'macOS', icon: Monitor, arch: 'Apple Silicon & Intel' },
  { name: 'Windows', icon: Monitor, arch: 'x64', disabled: true },
  { name: 'Linux', icon: Terminal, arch: 'x64 / AppImage' },
]

const nodeFeatures = [
  'Automatic channel management',
  'RGB asset support',
  'Submarine swaps',
  'BOLT11 & BOLT12',
]

export const Desktop = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Desktop App"
        description="Full sovereignty with the KaleidoSwap Desktop App. Bundles a complete RGB Lightning node. Available for macOS, Windows, and Linux."
        url="/products/desktop"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateIn variant="fade-down" duration={500}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary-500/30 bg-secondary-500/10 mb-6 w-fit">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                    {t('Available Now')}
                  </span>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <div className="space-y-4 mb-8">
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    {t('Desktop App')}
                  </h1>
                  <p className="text-xl text-slate-400 leading-relaxed">
                    {t('Full sovereignty. Run your own RGB Lightning node. Manage channels, control liquidity, and trade with maximum privacy.')}
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={250}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button
                    size="lg"
                    onClick={() => window.location.href = '/downloads'}
                    className="btn-glow flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t('Download Now')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(GITHUB.repoUrl, '_blank')}
                    className="border-slate-600 hover:border-white text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    {t('View on GitHub')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={350}>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary-500" />
                    <span>{t('Open Source')}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-primary-500" />
                    <span>{t('No Telemetry')}</span>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Terminal preview */}
            <AnimateIn variant="scale" delay={200} duration={800}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary-500/20 to-primary-500/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-gray-950/60">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs text-slate-500 font-mono">kaleidoswap</span>
                  </div>
                  {/* Terminal content */}
                  <div className="p-6 font-mono text-sm space-y-2">
                    <div className="text-slate-500"># {t('Start your node')}</div>
                    <div className="text-green-400">$ kaleidoswap --version</div>
                    <div className="text-slate-400 pl-2">KaleidoSwap Desktop v0.1.0</div>
                    <div className="text-slate-400 pl-2">rgb-lightning-node v0.3.0</div>
                    <div className="mt-3 text-slate-500"># {t('Connect to testnet')}</div>
                    <div className="text-green-400">$ kaleidoswap connect --testnet</div>
                    <div className="text-slate-400 pl-2">
                      <span className="text-primary-400">✓</span> {t('Connected to signet')}
                    </div>
                    <div className="text-slate-400 pl-2">
                      <span className="text-primary-400">✓</span> {t('RGB node synced')}
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <span className="text-green-400">$</span>
                      <span className="w-2 h-4 bg-green-400 animate-pulse ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Built for Sovereignty')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('Everything you need to trade sovereignly, built into one application.')}</p>
          </AnimateIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimateIn key={feature.title} variant="fade-up" delay={index * 100}>
                <motion.div
                  className="glass-card p-6 rounded-2xl h-full"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t(feature.title)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(feature.description)}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Available Platforms')}</h2>
            <p className="text-slate-400">{t('Download for your operating system')}</p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {platforms.map((platform, index) => (
              <AnimateIn key={platform.name} variant="fade-up" delay={index * 100}>
                <motion.div
                  className={`glass-card p-6 rounded-2xl text-center cursor-pointer ${
                    platform.disabled ? 'opacity-50' : 'hover:border-secondary-500/30'
                  }`}
                  whileHover={!platform.disabled ? { y: -4 } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => !platform.disabled && (window.location.href = '/downloads')}
                >
                  <platform.icon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold mb-1">{platform.name}</h3>
                  <p className="text-slate-500 text-sm">{platform.arch}</p>
                  {platform.disabled && (
                    <span className="inline-block mt-2 text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">
                      {t('Coming Soon')}
                    </span>
                  )}
                </motion.div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn variant="fade-up" delay={400} className="text-center mt-8">
            <Button
              size="lg"
              onClick={() => window.location.href = '/downloads'}
              className="btn-glow flex items-center gap-2 mx-auto"
            >
              <Download className="w-4 h-4" />
              {t('Go to Downloads')}
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* RGB Lightning Node */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t('Powered by RGB Lightning Node')}</h2>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {t('The desktop app bundles rgb-lightning-node, an open-source implementation we actively contribute to. Run a full node without the complexity.')}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {nodeFeatures.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-300">
                        <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://github.com/RGB-Tools/rgb-lightning-node"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors w-fit"
                  >
                    {t('View rgb-lightning-node on GitHub')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-900/80 rounded-xl p-6 font-mono text-sm border border-white/5">
                  <div className="text-slate-500 mb-2"># {t('Channel management')}</div>
                  <div className="text-green-400">$ kaleidoswap channels list</div>
                  <div className="text-slate-400 mt-1 pl-2">ID: 3a8f...c921</div>
                  <div className="text-slate-400 pl-2">Capacity: 0.01 BTC</div>
                  <div className="text-slate-400 pl-2">Status: <span className="text-green-400">active</span></div>
                  <div className="text-slate-500 mt-4"># {t('Check RGB assets')}</div>
                  <div className="text-green-400">$ kaleidoswap assets list</div>
                  <div className="text-slate-400 mt-1 pl-2">USDT  <span className="text-primary-400">1,000.00</span></div>
                  <div className="text-slate-400 pl-2">LCAD  <span className="text-primary-400">500.00</span></div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-secondary-500/10 to-primary-500/10 border-t border-white/5">
        <AnimateIn variant="scale" className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Take Full Control')}</h2>
          <p className="text-slate-400 mb-8 text-lg">
            {t('Download the desktop app and run your own sovereign trading infrastructure.')}
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/downloads'}
            className="btn-glow flex items-center gap-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            {t('Download Desktop App')}
          </Button>
        </AnimateIn>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
