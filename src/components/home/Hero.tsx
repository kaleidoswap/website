// src/components/home/Hero.tsx
import { Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/common/Button'
import type { HeroProps } from '@/types/hero'
import { openExternalLink } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

export const Hero = ({
  title,
  description,
  primaryCTA,
  secondaryCTA
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
    <div className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"
        aria-hidden="true"
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-20" aria-hidden="true" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-primary-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-secondary-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-radial from-bitcoin-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-32 text-center z-10">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient leading-[1.2] md:leading-[1.2] lg:leading-[1.2] animate-fadeIn max-w-5xl mx-auto"
          style={{ animationDelay: '0.1s' }}
        >
          {title}
        </h1>
        
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn"
          style={{ animationDelay: '0.3s' }}
        >
          {description} <span className="text-primary-400 font-semibold">Bitcoin's security</span>, <span className="text-secondary-400 font-semibold">Lightning Network's speed</span>, and <span className="text-bitcoin-400 font-semibold">RGB Protocol programmability</span> in a single <span className="font-semibold">open-source desktop application</span> that gives you complete control over your assets.
        </p>

        <div 
          className="flex flex-col sm:flex-row justify-center gap-3 animate-fadeIn"
          style={{ animationDelay: '0.5s' }}
        >
          {primaryCTA && (
            <Button
              variant="default"
              size="lg"
              onClick={() => handleNavigation(primaryCTA.href, primaryCTA.external)}
              className="group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-primary-500 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-300"></span>
              <span className="relative flex items-center justify-center">
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                {primaryCTA.label}
              </span>
            </Button>
          )}

          {secondaryCTA && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleNavigation(secondaryCTA.href, secondaryCTA.external)}
              className="group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gray-800 group-hover:bg-gray-700 transition-all duration-300"></span>
              <span className="relative flex items-center justify-center">
                {secondaryCTA.label}
                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Button>
          )}
        </div>
        
        {/* Tech badges */}
        <div 
          className="mt-12 flex flex-wrap justify-center gap-4 animate-fadeIn"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="glass-card px-4 py-2 text-sm text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bitcoin-500"></span>
            Bitcoin
          </div>
          <div className="glass-card px-4 py-2 text-sm text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500"></span>
            Lightning Network
          </div>
          <div className="glass-card px-4 py-2 text-sm text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-500"></span>
            RGB Protocol
          </div>
          <div className="glass-card px-4 py-2 text-sm text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Open Source
          </div>
        </div>
      </div>
    </div>
  )
}