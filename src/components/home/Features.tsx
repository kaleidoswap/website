// src/components/home/Features.tsx
import { FeatureCard } from './FeatureCard'
import type { FeaturesGridProps } from '@/types/features'
import { Reveal, Stagger, Gradient, Matrix } from '@/components/animations/ReactBitsFallbacks'

export const Features = ({
  title,
  description,
  features
}: FeaturesGridProps) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated Matrix Background */}
      <Matrix
        className="absolute inset-0 opacity-10"
        color="#0e9dff"
        speed={0.5}
      />

      {/* Dynamic Gradient Background */}
      <Gradient
        colors={['#0e9dff', '#8a5cf6', '#F7931A']}
        className="absolute inset-0 opacity-5"
        speed={2}
      />
      
      <div className="container relative px-4 z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-secondary-400 to-bitcoin-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              {description}
            </p>
          </div>
        </Reveal>

        <Stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                index={index}
              />
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}