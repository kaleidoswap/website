// src/components/home/HowItWorks.tsx
import { ArrowRight, Wallet, Zap, RefreshCw } from 'lucide-react'
import { Reveal, Stagger, Tilt, Magnetic, Wave } from '@/components/animations/ReactBitsFallbacks'
import { useTranslation } from 'react-i18next'

interface Step {
  number: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  details: string[]
}

const steps: Step[] = [
  {
    number: 1,
    title: "Select Assets",
    description: "Choose what you're swapping — BTC, USDT, or any supported asset. Pick source and destination protocols.",
    icon: Wallet,
    color: "text-primary-400",
    details: [
      "Select input asset",
      "Choose output network",
      "Real-time liquidity check",
      "Instant routing"
    ]
  },
  {
    number: 2,
    title: "Enter Amount",
    description: "See real-time rates, fees, and what you'll receive. No hidden costs.",
    icon: RefreshCw,
    color: "text-secondary-400",
    details: [
      "Live exchange rates",
      "Transparent 1% fee",
      "Network fee estimation",
      "Slippage protection"
    ]
  },
  {
    number: 3,
    title: "Pay & Receive",
    description: "Pay the invoice from any wallet. Funds arrive instantly at your destination address.",
    icon: Zap,
    color: "text-bitcoin-400",
    details: [
      "Scan invoice QR",
      "Atomic execution",
      "Instant settlement",
      "Trustless delivery"
    ]
  }
]

export const HowItWorks = () => {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gray-950/50">
      {/* Animated Wave Background */}
      <Wave
        className="absolute inset-0 opacity-10"
        waveColor="#0e9dff"
        speed={1.5}
      />

      <div className="container relative px-4 z-10">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-bitcoin-400 bg-clip-text text-transparent">
              {t('Swap in 30 Seconds')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {t('The fastest, most secure way to swap across Bitcoin L2s.')}
            </p>
          </div>
        </Reveal>

        {/* Desktop Flow */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 via-bitcoin-500 to-green-500 transform -translate-y-1/2 opacity-30" />

          <Stagger>
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 200}>
                  <div className="relative">
                    {/* Step Card */}
                    <Tilt>
                      <Magnetic>
                        <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-500 cursor-pointer">
                          {/* Step Number */}
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 mb-4 ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-lg font-bold">{step.number}</span>
                          </div>

                          {/* Icon */}
                          <div className={`inline-flex p-4 rounded-full bg-gray-800/50 mb-4 ${step.color} group-hover:scale-125 transition-transform duration-300`}>
                            <step.icon className="w-8 h-8" />
                          </div>

                          {/* Content */}
                          <h3 className={`text-xl font-bold mb-3 ${step.color}`}>
                            {t(step.title)}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            {t(step.description)}
                          </p>

                          {/* Details List */}
                          <ul className="text-xs text-gray-500 space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                                {t(detail)}
                              </li>
                            ))}
                          </ul>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-bitcoin-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </Magnetic>
                    </Tilt>

                    {/* Arrow (except for last step) */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 text-gray-600 animate-pulse" />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Stagger>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 150}>
              <div className="relative">
                <Tilt>
                  <Magnetic>
                    <div className="glass-card p-6 group hover:scale-102 transition-all duration-500">
                      <div className="flex items-start gap-4">
                        {/* Step Number & Icon */}
                        <div className="flex flex-col items-center">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 mb-3 ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-sm font-bold">{step.number}</span>
                          </div>
                          <div className={`inline-flex p-3 rounded-full bg-gray-800/50 ${step.color} group-hover:scale-125 transition-transform duration-300`}>
                            <step.icon className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold mb-2 ${step.color}`}>
                            {t(step.title)}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            {t(step.description)}
                          </p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-2">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                                <span className="text-xs text-gray-500">{t(detail)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Magnetic>
                </Tilt>

                {/* Arrow for mobile (except last step) */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowRight className="w-6 h-6 text-gray-600 rotate-90 animate-pulse" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
