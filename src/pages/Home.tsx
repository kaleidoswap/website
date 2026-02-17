import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { footerConfig } from '@/constants/footer'
import { HeroSection } from '@/components/home/HeroSection'
import { ProblemSolution } from '@/components/home/ProblemSolution'
import { CoreFeatures } from '@/components/home/CoreFeatures'
import { ProductEcosystem } from '@/components/home/ProductEcosystem'
import { BuiltInPublic } from '@/components/home/BuiltInPublic'
import { FAQ } from '@/components/home/FAQ'
import { FinalCTA } from '@/components/home/FinalCTA'

export const Home = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary-500 selection:text-white">
      <SEO url="/" />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProblemSolution />
        <CoreFeatures />
        <ProductEcosystem />
        <BuiltInPublic />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer {...footerConfig} />
    </div>
  )
}
