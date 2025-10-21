// src/components/partnerships/PartnerCard.tsx
import { ExternalLink, Star, CheckCircle } from 'lucide-react'
import type { Partner } from '@/types/partnerships'
import { Tilt, Magnetic, ButtonGlow, Reveal } from '@/components/animations/ReactBitsFallbacks'

interface PartnerCardProps extends Partner {
  index: number
}

export const PartnerCard = ({ 
  name, 
  description, 
  website, 
  type,
  index 
}: PartnerCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investor':
        return 'border-green-500/30 bg-green-500/5'
      case 'strategic':
        return 'border-blue-500/30 bg-blue-500/5'
      case 'technology':
        return 'border-purple-500/30 bg-purple-500/5'
      case 'ecosystem':
        return 'border-yellow-500/30 bg-yellow-500/5'
      default:
        return 'border-gray-500/30 bg-gray-500/5'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'investor':
        return 'Backed by'
      case 'strategic':
        return 'Strategic Partner'
      case 'technology':
        return 'Technology Partner'
      case 'ecosystem':
        return 'Ecosystem Partner'
      default:
        return 'Partner'
    }
  }

  return (
    <Reveal delay={index * 150}>
      <Magnetic>
        <Tilt>
          <div className={`glass-card p-8 hover:shadow-glow-lg transition-all duration-500 group ${getTypeColor(type)} relative overflow-hidden hover:scale-105`}>
            {/* Premium badge for investors */}
            {type === 'investor' && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                <Star className="w-3 h-3 fill-current" />
                Investor
              </div>
            )}

            {/* Verified badge for strategic partners */}
            {type === 'strategic' && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                <CheckCircle className="w-3 h-3 fill-current" />
                Strategic
              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-6">
              {/* Partner Type Badge */}
              <div className="text-sm text-gray-400 font-medium uppercase tracking-wider bg-gray-800/50 px-3 py-1 rounded-full">
                {getTypeLabel(type)}
              </div>

              {/* Enhanced Logo Area */}
              <div className="relative">
                <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  {/* Enhanced logo placeholder with gradient */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-xl flex items-center justify-center text-3xl font-bold text-white border border-white/20">
                    {name.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-primary-400 transition-colors duration-300">
                  {name}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {description}
                </p>

                {/* Special recognition for key partners */}
                {name === 'Fulgur Ventures' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Lightning Network Specialist
                  </div>
                )}

                {name === 'Bitfinex' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin-500/10 text-bitcoin-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Bitcoin Exchange Leader
                  </div>
                )}
              </div>

              {/* Enhanced Visit Link */}
              <ButtonGlow glowColor={type === 'investor' ? '#10B981' : '#3B82F6'}>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </ButtonGlow>
            </div>

            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-700" />
          </div>
        </Tilt>
      </Magnetic>
    </Reveal>
  )
}
