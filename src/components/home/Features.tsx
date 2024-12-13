// src/components/home/Features.tsx
import { FeatureCard } from './FeatureCard'
import type { FeaturesGridProps } from '@/types/features'

export const Features = ({
  title,
  description,
  features
}: FeaturesGridProps) => {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-purple-500/5 to-transparent"
        aria-hidden="true"
      />
      
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}