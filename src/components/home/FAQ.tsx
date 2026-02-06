// src/components/home/FAQ.tsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'What is KaleidoSwap?',
    answer: 'KaleidoSwap is a decentralized exchange (DEX) that enables trustless, non-custodial swaps across Bitcoin\'s layer 2 protocols. You can swap BTC, USDT, stablecoins, and other assets between Lightning, RGB, and Spark networks without intermediaries.',
  },
  {
    question: 'How do atomic swaps work?',
    answer: 'Atomic swaps use Hash Time-Locked Contracts (HTLCs) to ensure that either both parties receive their funds, or nobody does. This cryptographic mechanism eliminates counterparty risk—there\'s no way for one party to cheat the other.',
  },
  {
    question: 'Is KaleidoSwap custodial?',
    answer: 'No. KaleidoSwap is 100% non-custodial. Your private keys never leave your device, and we never take possession of your funds. You maintain full control throughout the entire swap process.',
  },
  {
    question: 'What wallets are supported?',
    answer: 'The web app supports WebLN-compatible wallets like Alby and Bitmask. The desktop app includes a built-in RGB Lightning node, so no external wallet is required. More wallet integrations are coming soon.',
  },
  {
    question: 'What are the fees?',
    answer: 'KaleidoSwap charges a flat 1% fee on swaps. This fee is transparent and displayed before you confirm any transaction. There are no hidden charges or variable fees.',
  },
  {
    question: 'Which networks are supported?',
    answer: 'Currently, we support Bitcoin, Lightning Network, RGB Protocol, and Spark. Support for Arkade, Liquid Network, and Taproot Assets is coming in Q4 2026.',
  },
  {
    question: 'Is KaleidoSwap open source?',
    answer: 'Yes, KaleidoSwap is 100% open source. You can audit the code, contribute, or fork it on GitHub. Transparency and verifiability are core to our mission.',
  },
  {
    question: 'Is KaleidoSwap available on mainnet?',
    answer: 'KaleidoSwap is currently live on Signet and Testnet. Mainnet launch is coming soon. Join our community channels to stay updated on the launch date.',
  },
]

export const FAQ = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('Frequently Asked Questions')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('Everything you need to know about KaleidoSwap.')}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">
                  {t(item.question)}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-slate-400 leading-relaxed">
                    {t(item.answer)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
