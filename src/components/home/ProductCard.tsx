// src/components/home/ProductCard.tsx
import { ExternalLink, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Tilt, Magnetic, ButtonGlow, Reveal } from '@/components/animations/ReactBitsFallbacks'
import type { Product } from '@/types/products'
import { openExternalLink } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps extends Product {
  index: number
}

const colorMap = {
  primary: {
    badge: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
    icon: 'bg-primary-500/10 text-primary-400',
    glow: '#0e9dff',
    button: 'from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400',
    text: 'text-primary-400'
  },
  secondary: {
    badge: 'bg-secondary-500/20 text-secondary-400 border-secondary-500/30',
    icon: 'bg-secondary-500/10 text-secondary-400',
    glow: '#8a5cf6',
    button: 'from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400',
    text: 'text-secondary-400'
  },
  bitcoin: {
    badge: 'bg-bitcoin-500/20 text-bitcoin-400 border-bitcoin-500/30',
    icon: 'bg-bitcoin-500/10 text-bitcoin-400',
    glow: '#F7931A',
    button: 'from-bitcoin-600 to-bitcoin-500 hover:from-bitcoin-500 hover:to-bitcoin-400',
    text: 'text-bitcoin-400'
  },
  green: {
    badge: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: 'bg-green-500/10 text-green-400',
    glow: '#10B981',
    button: 'from-green-600 to-green-500 hover:from-green-500 hover:to-green-400',
    text: 'text-green-400'
  }
}

export const ProductCard = ({
  name,
  version,
  status,
  badge,
  description,
  features,
  icon: Icon,
  platforms,
  primaryCTA,
  secondaryCTA,
  color,
  index
}: ProductCardProps) => {
  const navigate = useNavigate()
  const colors = colorMap[color]
  const isAvailable = status === 'latest-release' || status === 'beta'

  const handleNavigation = (href: string, external: boolean) => {
    if (external) {
      openExternalLink(href)
    } else {
      navigate(href)
    }
  }

  return (
    <Reveal delay={index * 150}>
      <Tilt>
        <div className={`glass-card p-8 h-full flex flex-col group hover:scale-102 transition-all duration-500 relative overflow-hidden ${
          !isAvailable ? 'opacity-90' : ''
        }`}>
          {/* Background Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.icon.replace('bg-', 'from-').replace('/10', '/5')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Header */}
          <div className="relative z-10 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-4 rounded-xl ${colors.icon} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge} ${
                status === 'latest-release' ? 'animate-pulse' : ''
              }`}>
                {badge}
              </span>
            </div>

            <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>
              {name}
              {version && <span className="ml-2 text-lg text-gray-400">v{version}</span>}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-400"
                >
                  {platform}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features List */}
          <div className="relative z-10 mb-6 flex-1">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="relative z-10 space-y-3">
            <Magnetic>
              <ButtonGlow glowColor={colors.glow}>
                <Button
                  variant={isAvailable ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handleNavigation(primaryCTA.href, primaryCTA.external)}
                  className={
                    isAvailable
                      ? `w-full group/btn bg-gradient-to-r ${colors.button} border-0 text-black font-bold shadow-2xl ${colors.icon.replace('bg-', 'shadow-').replace('/10', '/30')} hover:${colors.icon.replace('bg-', 'shadow-').replace('/10', '/50')} bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500`
                      : `w-full border-2 border-gray-600/80 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/50 backdrop-blur-sm group/btn`
                  }
                  disabled={!isAvailable && primaryCTA.href === '#waitlist'}
                >
                  <span className="flex items-center justify-center">
                    {primaryCTA.label}
                    {primaryCTA.external ? (
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
                    )}
                  </span>
                </Button>
              </ButtonGlow>
            </Magnetic>

            {secondaryCTA && (
              <Magnetic>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleNavigation(secondaryCTA.href, secondaryCTA.external)}
                  className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50 group/btn"
                >
                  <span className="flex items-center justify-center text-sm">
                    {secondaryCTA.label}
                    {secondaryCTA.external && (
                      <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    )}
                  </span>
                </Button>
              </Magnetic>
            )}
          </div>

          {/* Animated Border on Hover */}
          <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${colors.icon.replace('bg-', 'from-').replace('/10', '')} to-transparent group-hover:w-full transition-all duration-700`} />
        </div>
      </Tilt>
    </Reveal>
  )
}
