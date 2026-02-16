// src/pages/products/Desktop.tsx
import { Monitor, Shield, Server, Lock, Download, ArrowRight, Check, Apple, Terminal } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { GITHUB } from '@/constants/urls'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Server,
    title: 'Integrated RGB-LN Node',
    description: 'Full RGB Lightning node bundled. No external dependencies.',
  },
  {
    icon: Shield,
    title: 'Maximum Privacy',
    description: 'Your node, your rules. All data stays on your machine.',
  },
  {
    icon: Lock,
    title: 'Self-Custody',
    description: 'Keys never leave your device. True sovereign trading.',
  },
  {
    icon: Terminal,
    title: 'Power User Features',
    description: 'Channel management, liquidity controls, advanced settings.',
  },
]

const platforms = [
  { name: 'macOS', icon: Apple, arch: 'Apple Silicon & Intel', available: true },
  { name: 'Windows', icon: Monitor, arch: 'x64', available: true },
  { name: 'Linux', icon: Terminal, arch: 'x64 / AppImage', available: true },
]

const specs = [
  { label: 'Min RAM', value: '8 GB' },
  { label: 'Storage', value: '2 GB free' },
  { label: 'Network', value: 'Broadband' },
  { label: 'OS', value: 'macOS 12+, Windows 10+, Ubuntu 20.04+' },
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

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary-500/30 bg-secondary-500/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">
                  {t('Available Now')}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {t('Desktop App')}
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                {t('Full sovereignty. Run your own RGB Lightning node. Manage channels, control liquidity, and trade with maximum privacy.')}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/downloads'}
                  className="btn-glow"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('Download Now')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(GITHUB.repoUrl, '_blank')}
                >
                  {t('View on GitHub')}
                </Button>
              </div>

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
            </div>

            {/* Desktop Screenshot */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-secondary-500/30 to-primary-500/30 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary-500/10 via-transparent to-primary-500/10 rounded-2xl" />
              <img
                src="/images/desktop-app-screenshot.png"
                alt={t('Desktop App Screenshot')}
                className="relative w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Built for Sovereignty')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 rounded-xl">
                <feature.icon className="w-10 h-10 text-secondary-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t(feature.title)}</h3>
                <p className="text-slate-400 text-sm">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Available Platforms')}</h2>
          <p className="text-slate-400 text-center mb-12">
            {t('Download for your operating system')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="glass-card p-6 rounded-xl text-center hover:border-secondary-500/30 transition-colors cursor-pointer"
                onClick={() => window.location.href = '/downloads'}
              >
                <platform.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-1">{platform.name}</h3>
                <p className="text-slate-500 text-sm">{platform.arch}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('System Requirements')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <p className="text-sm text-slate-500 mb-1">{t(spec.label)}</p>
                <p className="text-lg font-bold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RGB Lightning Node */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('Powered by RGB Lightning Node')}</h2>
                <p className="text-slate-400 mb-6">
                  {t('The desktop app bundles rgb-lightning-node, an open-source implementation we actively contribute to. Run a full node without the complexity.')}
                </p>
                <ul className="space-y-3 mb-6">
                  {['Automatic channel management', 'RGB asset support', 'Submarine swaps', 'BOLT11 & BOLT12'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-primary-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com/RGB-Tools/rgb-lightning-node"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-1"
                >
                  {t('View rgb-lightning-node on GitHub')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm">
                <div className="text-slate-500 mb-2"># {t('Start your node')}</div>
                <div className="text-green-400">$ kaleidoswap --version</div>
                <div className="text-slate-400 mt-1">KaleidoSwap Desktop v0.1.0</div>
                <div className="text-slate-400">rgb-lightning-node v0.3.0</div>
                <div className="text-slate-500 mt-4"># {t('Connect to testnet')}</div>
                <div className="text-green-400">$ kaleidoswap connect --testnet</div>
                <div className="text-slate-400 mt-1">✓ Connected to signet</div>
                <div className="text-slate-400">✓ RGB node synced</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-secondary-500/10 to-primary-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('Take Full Control')}</h2>
          <p className="text-slate-400 mb-8">
            {t('Download the desktop app and run your own sovereign trading infrastructure.')}
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/downloads'}
            className="btn-glow"
          >
            <Download className="w-4 h-4 mr-2" />
            {t('Download Desktop App')}
          </Button>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
