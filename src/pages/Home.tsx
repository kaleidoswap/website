// src/pages/Home.tsx
import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { SecurityNotice } from '@/components/home/SecurityNotice'
import { Footer } from '@/components/footer/Footer'
import { features } from '@/constants/features'
import { footerConfig } from '@/constants/footer'

export const Home = () => {
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
        <Hero 
          title="Trustless Trading on Lightning Network"
          description="Kaleidoswap is the first decentralized trading platform that combines"
          primaryCTA={{
            label: "Download App",
            href: "/downloads",
            external: false
          }}
          secondaryCTA={{
            label: "Explore Docs",
            href: "https://docs.kaleidoswap.com",
            external: true
          }}
        />
        <Features 
          title="The Future of Bitcoin Trading Is Here"
          description="Kaleidoswap gives you unprecedented control over your digital assets with a powerful, secure, and user-friendly desktop application"
          features={features}
        />
        <SecurityNotice 
          title="Security & Development Status"
          description="We're committed to building a secure, reliable platform and value your participation in this development journey. KaleidoSwap is currently in alpha with active development toward mainnet readiness."
          warnings={[
            {
              title: "Test Networks Only",
              description: "Currently designed for regtest, signet, and testnet environments. Mainnet compatibility will be added as RGB technology matures."
            },
            {
              title: "Alpha Software",
              description: "This is experimental software undergoing rapid development. Do not use with real funds at this stage."
            },
            {
              title: "Community Feedback",
              description: "Found a bug or have a suggestion? Report issues on GitHub to help improve KaleidoSwap."
            }
          ]}
          cta={{
            label: "Report an issue on GitHub",
            href: "https://github.com/kaleidoswap/kaleidoswap/issues/new"
          }}
        />
        <Footer {...footerConfig} />
      </div>
    </div>
  )
}