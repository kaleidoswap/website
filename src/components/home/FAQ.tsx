import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { AnimateIn } from '@/components/animations/AnimateIn'

function useFaqItems() {
  const { t } = useTranslation()
  return [
    {
      question: t('What is KaleidoSwap?'),
      answer: t('KaleidoSwap is a decentralized exchange (DEX) that enables trustless, non-custodial swaps across Bitcoin layer 2 protocols. You can swap BTC, USDT, stablecoins, and other assets between Lightning, RGB, and Spark networks without intermediaries.'),
    },
    {
      question: t('How do atomic swaps work?'),
      answer: t('Atomic swaps use Hash Time-Locked Contracts (HTLCs) to ensure that either both parties receive their funds, or nobody does. This cryptographic mechanism eliminates counterparty risk. There is no way for one party to cheat the other.'),
    },
    {
      question: t('Is KaleidoSwap custodial?'),
      answer: t('No. KaleidoSwap is 100% non-custodial. Your private keys never leave your device, and we never take possession of your funds. You maintain full control throughout the entire swap process.'),
    },
    {
      question: t('What wallets are supported?'),
      answer: t('The web app supports WebLN-compatible wallets like Alby, Bitmask, Rate Extension, and Xverse. The desktop app includes a built-in RGB Lightning node, so no external wallet is required. More wallet integrations are coming soon.'),
    },
    {
      question: t('What are the fees?'),
      answer: t('KaleidoSwap charges a flat 1% fee on swaps. This fee is transparent and displayed before you confirm any transaction. There are no hidden charges or variable fees.'),
    },
    {
      question: t('Which networks are supported?'),
      answer: t('Currently, we support Bitcoin, Lightning Network, RGB Protocol, and Spark. Support for Arkade, Liquid Network, and Taproot Assets is coming in Q4 2026.'),
    },
    {
      question: t('Is KaleidoSwap open source?'),
      answer: t('Yes, KaleidoSwap is 100% open source. You can audit the code, contribute, or fork it on GitHub. Transparency and verifiability are core to our mission.'),
    },
    {
      question: t('Is KaleidoSwap available on mainnet?'),
      answer: t('KaleidoSwap is currently live on Signet and Testnet. Mainnet launch is coming soon. Join our community channels to stay updated on the launch date.'),
    },
  ]
}

export const FAQ = () => {
  const { t } = useTranslation()
  const faqItems = useFaqItems()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="py-24 relative">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-6">
        <AnimateIn variant="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('Frequently Asked Questions')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('Everything you need to know about KaleidoSwap.')}
          </p>
        </AnimateIn>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <AnimateIn
              key={index}
              variant="fade-up"
              delay={index * 60}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-white pr-4">
                  {item.question}
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
                    {item.answer}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
