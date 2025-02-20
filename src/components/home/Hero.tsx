// src/components/home/Hero.tsx
import { Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/common/Button'
import type { HeroProps } from '@/types/hero'

export const Hero = ({
  title,
  description,
  primaryCTA,
  secondaryCTA
}: HeroProps) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-16">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-32 text-center">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-500 leading-tight"
        >
          {title}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            variant="default"
            size="lg"
            onClick={() => window.location.href = primaryCTA.href}
            className="group"
          >
            <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            {primaryCTA.label}
          </Button>

          {secondaryCTA && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = secondaryCTA.href}
              className="group"
            >
              {secondaryCTA.label}
              <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}