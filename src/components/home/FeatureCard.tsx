// src/components/home/FeatureCard.tsx
import { cn } from '@/lib/utils'
import type { FeatureCardProps } from '@/types/features'

export const FeatureCard = ({ 
  icon: Icon,
  title, 
  description,
  className,
  index 
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/80 transition-all",
        "border border-gray-700/50 hover:border-primary-500/50",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  )
}