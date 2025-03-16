import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { MarketMakerCard } from '@/components/marketMakers/MarketMakerCard'
import { marketMakersPageConfig } from '@/constants/marketMakers'
import { footerConfig } from '@/constants/footer'

export const MarketMakers = () => {
  const { title, description, marketMakers } = marketMakersPageConfig;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed background gradient */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        <Navbar />
        
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fadeIn">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-300">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {marketMakers.map((marketMaker, index) => (
              <MarketMakerCard 
                key={marketMaker.id}
                marketMaker={marketMaker}
                index={index}
              />
            ))}
          </div>

          <div className="mt-16 text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <div className="glass-card p-6 rounded-xl max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-4">Are you a market maker?</h2>
              <p className="text-gray-300 mb-6">
                If you're interested in becoming a market maker on Kaleidoswap and providing liquidity for RGB assets, 
                check out our documentation for market makers and get in touch with our team.
              </p>
              <a 
                href="https://docs.kaleidoswap.com/market-makers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
              >
                Learn More About Market Making
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </main>
        
        <Footer {...footerConfig} />
      </div>
    </div>
  )
} 