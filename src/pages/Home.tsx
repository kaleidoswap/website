// src/pages/Home.tsx
import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/home/Hero'
import { Products } from '@/components/home/Products'
import { Features } from '@/components/home/Features'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Partnerships } from '@/components/partnerships/Partnerships'
import { Roadmap } from '@/components/home/Roadmap'
import { DeveloperSection } from '@/components/home/DeveloperSection'
import { Community } from '@/components/home/Community'
import { SecurityNotice } from '@/components/home/SecurityNotice'
import { Footer } from '@/components/footer/Footer'
import { products } from '@/constants/products'
import { features } from '@/constants/features'
import { milestones } from '@/constants/roadmap'
import { socialLinks } from '@/constants/community'
import { partners } from '@/constants/partnerships'
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
          title="The First DEX Native to Bitcoin"
          description="Trade RGB assets trustlessly on Lightning Network with atomic swaps, self-custody, and near-instant settlement."
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
          tertiaryCTA={{
            label: "View GitHub",
            href: "https://github.com/kaleidoswap/kaleidoswap",
            external: true
          }}
        />
        <Products
          title="Our Product Suite"
          description="Explore our growing ecosystem of Bitcoin-native DeFi products, from desktop and mobile apps to developer tools"
          products={products}
        />
        <Features
          title="Revolutionary Trading Features"
          description="Experience the next generation of Bitcoin DeFi with cutting-edge features designed for both beginners and advanced traders"
          features={features}
        />
        <HowItWorks />
        <Partnerships
          title="Backed by"
          description=""
          partners={partners}
        />
        <Roadmap
          title="Product Roadmap"
          description="Our journey to becoming the leading Bitcoin-native DeFi platform"
          milestones={milestones}
        />
        <DeveloperSection />
        <Community
          title="Join the Bitcoin DeFi Revolution"
          description="Connect with developers, traders, and enthusiasts building the future of Bitcoin DeFi"
          socialLinks={socialLinks}
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