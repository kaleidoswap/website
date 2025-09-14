// src/components/partnerships/PartnerCard.tsx
import { ExternalLink } from 'lucide-react'
import type { Partner } from '@/types/partnerships'

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
    <div 
      className={`glass-card p-6 hover:shadow-glow transition-all duration-300 group ${getTypeColor(type)} animate-fadeIn`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Partner Type Badge */}
        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {getTypeLabel(type)}
        </div>

        {/* Logo */}
        <div className="w-24 h-24 flex items-center justify-center bg-white/10 rounded-lg p-4 group-hover:bg-white/20 transition-colors">
          {/* Placeholder for logo - in production you'd use the actual logo */}
          <div className="w-full h-full bg-gray-300/20 rounded flex items-center justify-center text-2xl font-bold text-gray-300">
            {name.split(' ').map(word => word[0]).join('')}
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
            {name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Visit Link */}
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors group-hover:translate-y-[-2px] transform duration-300"
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
