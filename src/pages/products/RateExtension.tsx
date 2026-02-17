// src/pages/products/RateExtension.tsx
import {
  Puzzle,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Wallet,
  ArrowLeftRight,
  Bell,
  Key,
  Layers,
  QrCode,
  Clock,
} from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { GITHUB } from '@/constants/urls'
import { useTranslation } from 'react-i18next'

const features = [
  {
    icon: Layers,
    title: 'Multi-Protocol',
    description: 'Bitcoin, Lightning, RGB, Liquid, Spark, and Arkade in one wallet.',
  },
  {
    icon: Shield,
    title: 'Self-Custody',
    description: 'Your keys never leave your device. Fully non-custodial.',
  },
  {
    icon: Zap,
    title: 'WebLN & Nostr',
    description: 'Built-in WebLN provider and NIP-07 signer for seamless DApp connectivity.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Built-in Swaps',
    description: 'Swap between Bitcoin, Lightning, and RGB assets directly from the extension.',
  },
]

const capabilities = [
  {
    icon: Wallet,
    title: 'Asset Management',
    description: 'View balances across all layers — on-chain, Lightning, and RGB tokens — with real-time fiat conversion.',
  },
  {
    icon: QrCode,
    title: 'Send & Receive',
    description: 'Send and receive Bitcoin and RGB assets. Auto-detect addresses, generate invoices, and share QR codes.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Instant Swaps',
    description: 'Swap between BTC and Lightning, or Lightning and RGB assets, with real-time quotes and price impact warnings.',
  },
  {
    icon: Globe,
    title: 'DApp Connector',
    description: 'Connect to any WebLN-compatible application. Permission-based access control for every DApp interaction.',
  },
  {
    icon: Key,
    title: 'Nostr Identity',
    description: 'Built-in Nostr keypair management with NIP-07 signing. Your decentralized identity, right in the browser.',
  },
  {
    icon: Clock,
    title: 'Activity Tracking',
    description: 'Full transaction history with filtering by type and network. Track every payment and swap.',
  },
]

const protocols = [
  { name: 'Bitcoin', description: 'On-chain transactions', color: 'text-bitcoin' },
  { name: 'Lightning', description: 'Instant payments', color: 'text-yellow-400' },
  { name: 'RGB', description: 'Smart contracts & tokens', color: 'text-purple-400' },
  { name: 'Liquid', description: 'Confidential transactions', color: 'text-blue-400' },
  { name: 'Spark', description: 'Fast off-chain transfers', color: 'text-teal-400' },
  { name: 'Arkade', description: 'Scalable UTXO sharing', color: 'text-green-400' },
]

export const RateExtension = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Rate Extension"
        description="Rate is a multi-protocol Chrome extension wallet for Bitcoin Layer 2 networks. Manage Bitcoin, Lightning, RGB, and more from your browser toolbar."
        url="/products/rate-extension"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[120px] -z-10 opacity-30" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
                <Bell className="w-3 h-3 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  {t('Coming Soon')}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {t('Rate Extension')}
              </h1>
              <p className="text-xl text-slate-400 mb-4 leading-relaxed">
                {t('Your multi-network Bitcoin wallet, right in your browser. Manage Bitcoin, Lightning, RGB assets, and connect to DApps — all from one extension.')}
              </p>
              <p className="text-sm text-slate-500 mb-8">
                {t('Built for Chrome with security and performance at its core.')}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-600 cursor-not-allowed opacity-80"
                  disabled
                >
                  <Puzzle className="w-4 h-4 mr-2" />
                  {t('Coming to Chrome Web Store')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(GITHUB.orgUrl, '_blank')}
                >
                  {t('View on GitHub')}
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span>{t('Non-custodial')}</span>
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full" />
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span>{t('Open Source')}</span>
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full" />
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span>{t('WebLN Compatible')}</span>
                </div>
              </div>
            </div>

            {/* Extension Visual Preview */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/30 to-teal-500/30 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10 rounded-2xl" />

              {/* Extension popup mockup */}
              <div className="relative bg-[#102217] rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-[360px] mx-auto">
                {/* Browser chrome bar */}
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
                    chrome-extension://rate
                  </div>
                </div>

                {/* Extension content */}
                <div className="p-5">
                  {/* Balance */}
                  <div className="text-center mb-6">
                    <p className="text-xs text-slate-500 mb-1">{t('Total Balance')}</p>
                    <p className="text-3xl font-bold">0.0284 <span className="text-lg text-slate-400">BTC</span></p>
                    <p className="text-sm text-slate-500">$2,415.30</p>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Deposit', icon: '↓' },
                      { label: 'Withdraw', icon: '↑' },
                      { label: 'Receive', icon: '◎' },
                      { label: 'Swap', icon: '⇄' },
                    ].map((action) => (
                      <div key={action.label} className="text-center">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-1">
                          <span className="text-purple-400 text-sm">{action.icon}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{action.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Asset list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-bitcoin/20 flex items-center justify-center text-bitcoin text-xs font-bold">₿</div>
                        <div>
                          <p className="text-sm font-medium">Bitcoin</p>
                          <p className="text-[10px] text-slate-500">On-chain</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">0.0150</p>
                        <p className="text-[10px] text-slate-500">$1,275.00</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">⚡</div>
                        <div>
                          <p className="text-sm font-medium">Lightning</p>
                          <p className="text-[10px] text-slate-500">LN Balance</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">0.0134</p>
                        <p className="text-[10px] text-slate-500">$1,140.30</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">R</div>
                        <div>
                          <p className="text-sm font-medium">USDT</p>
                          <p className="text-[10px] text-slate-500">RGB-20</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">250.00</p>
                        <p className="text-[10px] text-slate-500">$250.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="border-t border-white/5 px-4 py-3 flex justify-around">
                  {['Wallet', 'Swap', 'Activity', 'Settings'].map((tab) => (
                    <span
                      key={tab}
                      className={`text-[10px] ${tab === 'Wallet' ? 'text-purple-400 font-medium' : 'text-slate-500'}`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('Why Rate Extension')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 rounded-xl">
                <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t(feature.title)}</h3>
                <p className="text-slate-400 text-sm">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Protocols */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Six Protocols, One Extension')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('Access every major Bitcoin Layer 2 network from a single interface. No switching between wallets.')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className="glass-card p-5 rounded-xl text-center hover:border-purple-500/20 transition-colors"
              >
                <h3 className={`text-lg font-bold mb-1 ${protocol.color}`}>{protocol.name}</h3>
                <p className="text-slate-500 text-xs">{t(protocol.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Everything You Need')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('A full-featured wallet packed into a lightweight browser extension.')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="glass-card p-6 rounded-xl">
                <cap.icon className="w-8 h-8 text-teal-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t(cap.title)}</h3>
                <p className="text-slate-400 text-sm">{t(cap.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Get Started in Seconds')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('From install to first transaction — quick and secure.')}
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Install', desc: 'Add Rate to Chrome from the Web Store' },
              { step: '02', title: 'Create Wallet', desc: 'Set a password and generate your Nostr identity' },
              { step: '03', title: 'Connect Node', desc: 'Link to your RGB Lightning Node' },
              { step: '04', title: 'Start Using', desc: 'Send, receive, swap, and connect to DApps' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{t(item.title)}</h3>
                <p className="text-slate-400 text-sm">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('Security First')}</h2>
                <p className="text-slate-400 mb-6">
                  {t('Your keys are encrypted and never leave the extension. Rate is fully open-source, so you can verify every line of code yourself.')}
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Password-protected encrypted storage',
                    'Auto-lock with configurable timeout',
                    'Permission-based DApp access',
                    'No external key servers',
                    'Open-source & auditable',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-purple-400" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <a
                  href={GITHUB.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  {t('Review the source code')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <div className="glass-card p-5 rounded-xl">
                  <Shield className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-lg font-bold mb-1">{t('Non-Custodial')}</h3>
                  <p className="text-slate-400 text-sm">{t('You hold your private keys. No third party ever has access to your funds.')}</p>
                </div>
                <div className="glass-card p-5 rounded-xl">
                  <Key className="w-8 h-8 text-teal-400 mb-3" />
                  <h3 className="text-lg font-bold mb-1">{t('Nostr Identity')}</h3>
                  <p className="text-slate-400 text-sm">{t('Your decentralized identity travels with you. Sign events and authenticate across the Nostr ecosystem.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-500/10 to-teal-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Bell className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">
              {t('Coming Soon')}
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{t('Bitcoin Layer 2, One Click Away')}</h2>
          <p className="text-slate-400 mb-8">
            {t('Rate Extension is under active development. Follow us for launch updates.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.open('https://x.com/kaleidoswap', '_blank')}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {t('Follow for Updates')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(GITHUB.orgUrl, '_blank')}
            >
              {t('Star on GitHub')}
            </Button>
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
