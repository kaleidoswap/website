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
        className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        <Navbar />
        <Hero 
          title="Trustless trading on Lightning Network"
          description="Kaleidoswap leverages the security of Bitcoin Protocol, the scalability of Lightning Network, and the programmability of RGB to let users trade any RGB assets in a trustless manner"
          primaryCTA={{
            label: "Download App",
            href: "https://github.com/kaleidoswap/desktop-app/releases"
          }}
          secondaryCTA={{
            label: "Documentation",
            href: "https://docs.kaleidoswap.com"
          }}
        />
        <Features 
          title="Built for the Future of Bitcoin"
          description="Experience secure, scalable, and sovereign trading with the combined power of Bitcoin, Lightning Network and RGB protocol"
          features={features}
        />
        <SecurityNotice 
          title="Security First"
          description="KaleidoSwap is currently in alpha testing. Please read the following security considerations carefully."
          warnings={[
            {
              title: "Test Networks Only",
              description: "Currently recommended for use on regtest, signet, and testnet3 networks only."
            },
            {
              title: "Alpha Software",
              description: "This is alpha software. Do not use with real funds on mainnet at this stage."
            },
            {
              title: "Node Requirements",
              description: "Always-online node recommended to maintain the Lightning Network's security model."
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