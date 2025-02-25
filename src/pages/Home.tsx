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
          title="Trustless trading on Lightning Network"
          description="Kaleidoswap is the first decentralized trading platform that combines"
          primaryCTA={{
            label: "Download App",
            href: "/downloads"
          }}
          secondaryCTA={{
            label: "Explore Docs",
            href: "https://docs.kaleidoswap.com"
          }}
        />
        <Features 
          title="The Future of Bitcoin Trading Is Here"
          description="Kaleidoswap gives you unprecedented control over your digital assets with a powerful, secure, and user-friendly desktop application"
          features={features}
        />
        <SecurityNotice 
          title="Transparency & Security"
          description="As an open-source project in alpha testing, we prioritize transparency about the current state of development."
          warnings={[
            {
              title: "Test Networks Only",
              description: "Currently recommended for use on regtest, signet, and testnet3 networks only. Mainnet support coming soon."
            },
            {
              title: "Alpha Software",
              description: "This is alpha software under active development. Please do not use with real funds on mainnet at this stage."
            },
            {
              title: "Node Requirements",
              description: "For optimal security, maintain an always-online node to ensure the full Lightning Network security model."
            }
          ]}
          cta={{
            label: "Learn more about security",
            href: "https://docs.kaleidoswap.com/security"
          }}
        />
        <Footer {...footerConfig} />
      </div>
    </div>
  )
}