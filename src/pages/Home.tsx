// src/pages/Home.tsx
import { Zap, Monitor, Globe, Code, Smartphone, Puzzle, ExternalLink, Download, ArrowRight, Check } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { PRODUCTS, GITHUB } from '@/constants/urls'
import { useTranslation } from 'react-i18next'

// Protocol icons
import bitcoinLogo from '@/assets/icons/bitcoin/bitcoin-logo.svg'
import rgbLogo from '@/assets/icons/rgb/rgb-logo.svg'
import sparkAsterisk from '@/assets/icons/spark/Asterisk/Spark Asterisk White.svg'
import arkadeLogo from '@/assets/icons/arkade/arkade-icon.svg'
import liquidLogo from '@/assets/icons/liquid/logo-liquid.svg'
import taprootLogo from '@/assets/icons/taproot-assets/tapass-logo.png'

// Animation
import { ProtocolOrbitAnimation } from '@/components/animations/ProtocolOrbitAnimation'

// Components
import { FAQ } from '@/components/home/FAQ'

// Backer logos
import fulgurLogo from '@/assets/fulgur-logo.svg'
import bitfinexLogo from '@/assets/BrandLogo.org-Bitfinex-Logo.png'

// Partner logos
import rgbAssociationLogo from '/icons/rgb/logo-protocol-association.png'

// Live protocols
const liveProtocols = [
  { name: 'Bitcoin', icon: bitcoinLogo },
  { name: 'Lightning', icon: null, lucideIcon: Zap },
  { name: 'RGB', icon: rgbLogo },
  { name: 'Spark', icon: sparkAsterisk },
]

// Coming soon protocols
const comingProtocols = [
  { name: 'Arkade', icon: arkadeLogo },
  { name: 'Liquid', icon: liquidLogo },
  { name: 'Taproot Assets', icon: taprootLogo },
]

const features = [
  {
    icon: 'swap_horiz',
    title: 'Atomic Swaps',
    description: 'Trustless exchange mechanism. If the swap doesn\'t happen for both parties, it doesn\'t happen at all. Zero chance of lost funds.',
    color: 'primary',
    link: { label: 'Learn technical details', href: PRODUCTS.docs },
  },
  {
    icon: 'verified_user',
    title: 'Non-Custodial',
    description: 'You hold your keys always. KaleidoSwap never takes possession of your coins. You are your own bank, from start to finish.',
    color: 'purple',
    link: { label: 'View on GitHub', href: GITHUB.orgUrl },
  },
  {
    icon: 'dns',
    title: 'Run Your Node',
    description: 'Verify everything yourself. Our desktop app bundles a full RGB Lightning node. Your infrastructure. Your sovereignty.',
    color: 'green',
    link: { label: 'Setup documentation', href: PRODUCTS.docs },
  },
]

const backers = [
  { name: 'Fulgur Ventures', logo: fulgurLogo, url: 'https://fulgur.ventures' },
  { name: 'Bitfinex Ventures', logo: bitfinexLogo, url: 'https://www.bitfinex.com' },
]

const partners = [
  { name: 'RGB Protocol Association', logo: rgbAssociationLogo, showName: true, url: 'https://www.rgbprotocol.org' },
]

export const Home = () => {
  const { t } = useTranslation()

  const handleNavigation = (href: string, external: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = href
    }
  }

  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary-500 selection:text-white">
      <SEO url="/" />

      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                {t('Live on Testnet')}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                {t('Trustless Swaps on')}{' '}
                <span className="text-gradient">{t('Bitcoin Layers')}</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                {t('The DEX for Bitcoin\'s multi-layer future. Swap BTC, USDT, stablecoins, and real-world assets across Lightning, RGB, and Spark. Sovereign by design.')}
              </p>
            </div>

            {/* CTAs */}
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

            {/* Trust Signals */}
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
          </div>

          {/* Hero Visualization - Protocol Orbit Animation */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center">
              <ProtocolOrbitAnimation size={500} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROBLEM/SOLUTION ============ */}
      <section className="py-24 bg-gray-950/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-2xl opacity-50" />
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl glass-panel p-8">
                {/* Supported Protocols */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-4">{t('Supported Protocols')}</p>
                    <div className="flex flex-wrap gap-3">
                      {liveProtocols.map((protocol) => (
                        <div
                          key={protocol.name}
                          className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          {protocol.icon ? (
                            <img src={protocol.icon} alt={protocol.name} className="h-6 w-6 object-contain" />
                          ) : protocol.lucideIcon ? (
                            <protocol.lucideIcon className="w-6 h-6 text-yellow-500" />
                          ) : null}
                          <span className="text-white font-medium">{protocol.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-sm text-slate-500 mb-3">{t('Coming Soon')}</p>
                    <div className="flex flex-wrap gap-3">
                      {comingProtocols.map((protocol) => (
                        <div
                          key={protocol.name}
                          className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl opacity-70"
                        >
                          <img src={protocol.icon} alt={protocol.name} className="h-6 w-6 object-contain" />
                          <span className="text-slate-400 font-medium">{protocol.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{t('Network Status')}</p>
                      <p className="text-primary-400 font-bold">{t('Unified & Interoperable')}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                      <span className="material-symbols-outlined">hub</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {t('Bitcoin Layers Are')}{' '}
                <span className="text-slate-500 line-through decoration-red-500">{t('Fragmented')}</span>
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-primary-400 -mt-4">
                {t('We Unite Them.')}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('Moving assets between Lightning, RGB, and sidechains usually requires trusted intermediaries or complex peg-in/peg-out mechanisms.')}
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('KaleidoSwap introduces the first protocol for true P2P interoperability using')}{' '}
                <strong className="text-white">{t('HTLCs and atomic swaps')}</strong>
                {t('. No centralized exchange. No counterparty risk.')}
              </p>

              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-400 mt-1">layers</span>
                  <div>
                    <h4 className="font-bold text-white">{t('Cross-Layer Liquidity')}</h4>
                    <p className="text-sm text-slate-400">{t('Access liquidity across all Bitcoin scaling solutions instantly.')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-400 mt-1">lock</span>
                  <div>
                    <h4 className="font-bold text-white">{t('Cryptographic Security')}</h4>
                    <p className="text-sm text-slate-400">{t('Powered by math, enforced by the Bitcoin blockchain.')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE FEATURES ============ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-primary-900/10 via-transparent to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Core Protocol Features')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('Built for sovereigns who demand security, speed, and privacy.')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-8 rounded-2xl flex flex-col gap-6 group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${feature.color === 'primary'
                  ? 'bg-primary-500/10 text-primary-400 group-hover:bg-primary-500 group-hover:text-white'
                  : feature.color === 'purple'
                    ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white'
                    : 'bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white'
                  }`}>
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(feature.description)}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <a
                    href={feature.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all ${feature.color === 'primary'
                      ? 'text-primary-400'
                      : feature.color === 'purple'
                        ? 'text-purple-400'
                        : 'text-green-400'
                      }`}
                  >
                    {t(feature.link.label)}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT ECOSYSTEM (BENTO GRID) ============ */}
      <section className="py-24 bg-gray-950/70">
        <div className="max-w-7xl mx-auto px-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {/* Web App (Large) */}
            <div className="md:col-span-2 lg:col-span-2 row-span-2 glass-card rounded-2xl overflow-hidden relative group">
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

            {/* Desktop */}
            <div className="md:col-span-1 lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
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

            {/* Mobile */}
            <div className="md:col-span-1 glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/5 transition-colors">
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

            {/* Extension */}
            <div className="md:col-span-1 glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/5 transition-colors">
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

            {/* SDK */}
            <div className="md:col-span-1 lg:col-span-2 glass-card rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
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
          </div>
        </div>
      </section>

      {/* ============ OPEN SOURCE & BACKERS ============ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Open Source */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Built in Public')}</h2>
            <p className="text-xl text-slate-400 mb-8">
              {t('100% open source. Audit the code, contribute, or fork it.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GITHUB.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-xl text-white hover:border-primary-500/30 transition-colors"
              >
                <Code className="w-5 h-5" />
                <span>{t('Desktop App')}</span>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </a>
              <a
                href="https://github.com/RGB-Tools/rgb-lightning-node"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 glass-card rounded-xl text-white hover:border-primary-500/30 transition-colors"
              >
                <Code className="w-5 h-5" />
                <span>{t('RGB Lightning Node')}</span>
                <span className="text-xs text-slate-500 ml-1">{t('contributor')}</span>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-slate-300 glass-card px-6 py-4 rounded-xl">
              <span className="text-yellow-500 text-xl">🏆</span>
              <span>{t('Winner — PlanB Lugano Hackathon')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300 glass-card px-6 py-4 rounded-xl">
              <Zap className="w-5 h-5 text-primary-400" />
              <span>{t('First RGB swap on Lightning')}</span>
            </div>
          </div>

          {/* Backers */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
              {t('Backed By')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {backers.map((backer) => (
                <a
                  key={backer.name}
                  href={backer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl px-6 py-4 hover:scale-105 transition-transform"
                  title={backer.name}
                >
                  <img
                    src={backer.logo}
                    alt={backer.name}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
              {t('Partners')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:scale-105 transition-transform"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                  {partner.showName && (
                    <span className="text-white font-semibold text-lg hover:text-primary-400 transition-colors">
                      {t(partner.name)}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQ />

      {/* ============ CTA ============ */}
      <section className="py-24 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Try KaleidoSwap')}</h2>
          <p className="text-xl text-slate-400 mb-10">
            {t('Live on Signet and Testnet. Mainnet coming soon.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="h-12 px-8 border-slate-600 hover:border-white flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t('Download Desktop')}
            </Button>
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
