// src/components/home/Features.tsx
import { FeatureCard } from './FeatureCard'
import type { FeaturesGridProps } from '@/types/features'

export const Features = ({
  title,
  description,
  features
}: FeaturesGridProps) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-secondary-500/5 to-transparent"
        aria-hidden="true"
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-10" aria-hidden="true" />
      
      {/* Animated circles */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-radial from-primary-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-radial from-secondary-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      
      <div className="container relative px-4 z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gradient">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-300">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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