// src/components/home/Hero.tsx
import { Download, ExternalLink, Zap } from 'lucide-react'
import { Button } from '@/components/common/Button'
import type { HeroProps } from '@/types/hero'
import { openExternalLink } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import {
  SplitText,
  ButtonGlow,
  Gradient,
  Magnetic,
  Reveal,
  Aurora,
  FloatingDots,
  Ripple
} from '@/components/animations/ReactBitsFallbacks'
import bitcoinLogo from '@/assets/bitcoin-logo.svg'
import rgbSymbol from '@/assets/rgb-symbol.svg'
import textureBg from '@/assets/backgrounds/texture-bg-1.png'

export const Hero = ({
  primaryCTA,
  secondaryCTA,
  tertiaryCTA
}: HeroProps) => {
  const navigate = useNavigate()

  const handleNavigation = (href: string, external = false) => {
    if (external) {
      openExternalLink(href)
    } else {
      navigate(href)
    }
  }

  return (
    <div className="relative min-h-[100vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Enhanced Background with Texture and Animations */}
      <div className="absolute inset-0 z-0">
        {/* Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-repeat"
          style={{
            backgroundImage: `url(${textureBg})`,
            backgroundSize: '400px 400px'
          }}
        />

        {/* Aurora Effect */}
        <Aurora
          className="absolute inset-0 opacity-20"
          colors={['#F7931A', '#00D4AA', '#0e9dff']}
          speed={1.5}
        />

        {/* Gradient Overlay */}
        <Gradient
          colors={['#F7931A', '#0e9dff', '#8a5cf6']}
          className="absolute inset-0 opacity-10"
          speed={2}
        />

        {/* Ripple Effect */}
        <Ripple className="absolute inset-0 opacity-20" />

        {/* Floating Dots Animation */}
        <FloatingDots className="absolute inset-0 opacity-40" />

        {/* Additional floating elements for depth */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary-400/40 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-secondary-400/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-bitcoin-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-green-400/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/3 right-10 w-2 h-2 bg-primary-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-32 text-center z-10">
        <Reveal>
          <SplitText
            text="The First DEX Native to Bitcoin"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-bitcoin-400 to-primary-400 bg-clip-text text-transparent leading-[1.1] max-w-6xl mx-auto"
            delay={100}
          />
        </Reveal>

        <Reveal delay={300}>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed">
            Trade RGB assets trustlessly on Lightning Network with atomic swaps, self-custody, and near-instant settlement.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <img src={bitcoinLogo} alt="Bitcoin" className="w-5 h-5 inline" />
              <span className="text-bitcoin-400 font-semibold">Bitcoin's security</span>
            </span>
            <span className="text-gray-400">+</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-primary-400 inline" />
              <span className="text-primary-400 font-semibold">Lightning Network's speed</span>
            </span>
            <span className="text-gray-400">+</span>
            <span className="inline-flex items-center gap-1.5">
              <img src={rgbSymbol} alt="RGB" className="w-5 h-5 inline" />
              <span className="text-secondary-400 font-semibold">RGB Protocol's programmability</span>
            </span>
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {primaryCTA && (
              <Magnetic>
                <ButtonGlow
                  glowColor="#F7931A"
                  className="relative"
                >
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handleNavigation(primaryCTA.href, primaryCTA.external)}
                    className="group relative overflow-hidden bg-gradient-to-r from-bitcoin-500 via-bitcoin-600 to-bitcoin-500 hover:from-bitcoin-400 hover:via-bitcoin-500 hover:to-bitcoin-400 border-0 text-black font-bold shadow-2xl shadow-bitcoin-500/30 hover:shadow-bitcoin-500/50 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"
                  >
                    <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-6" />
                    {primaryCTA.label}
                  </Button>
                </ButtonGlow>
              </Magnetic>
            )}

            {secondaryCTA && (
              <Magnetic>
                <ButtonGlow
                  glowColor="#0e9dff"
                  className="relative"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleNavigation(secondaryCTA.href, secondaryCTA.external)}
                    className="group relative overflow-hidden border-2 border-primary-500/60 text-primary-400 hover:text-white hover:bg-primary-500/20 hover:border-primary-400 backdrop-blur-sm shadow-lg shadow-primary-500/10 hover:shadow-xl hover:shadow-primary-500/20"
                  >
                    <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {secondaryCTA.label}
                  </Button>
                </ButtonGlow>
              </Magnetic>
            )}

            {tertiaryCTA && (
              <Magnetic>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleNavigation(tertiaryCTA.href, tertiaryCTA.external)}
                  className="group relative text-gray-300 hover:text-white"
                >
                  View GitHub
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Magnetic>
            )}
          </div>
        </Reveal>

        {/* Tech badges */}
        <Reveal delay={700}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <div className="glass-card px-6 py-3 text-sm text-gray-300 flex items-center gap-3 hover:scale-105 transition-transform">
                <img src={bitcoinLogo} alt="Bitcoin" className="w-5 h-5" />
                Bitcoin
              </div>
            </Magnetic>
            <Magnetic>
              <div className="glass-card px-6 py-3 text-sm text-gray-300 flex items-center gap-3 hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-primary-400" />
                Lightning Network
              </div>
            </Magnetic>
            <Magnetic>
              <div className="glass-card px-6 py-3 text-sm text-gray-300 flex items-center gap-3 hover:scale-105 transition-transform">
                <img src={rgbSymbol} alt="RGB" className="w-5 h-5" />
                RGB Protocol
              </div>
            </Magnetic>
            <Magnetic>
              <div className="glass-card px-6 py-3 text-sm text-gray-300 flex items-center gap-3 hover:scale-105 transition-transform">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                Open Source
              </div>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </div>
  )
}