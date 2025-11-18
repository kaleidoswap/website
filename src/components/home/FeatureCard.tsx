// src/components/home/FeatureCard.tsx
import { cn } from '@/lib/utils'
import type { FeatureCardProps } from '@/types/features'
import { Tilt, Magnetic, Reveal } from '@/components/animations/ReactBitsFallbacks'
import { useTranslation } from 'react-i18next'

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  index
}: FeatureCardProps) => {
  const { t } = useTranslation()

  return (
    <Reveal delay={(index || 0) * 100 + 200}>
      <Magnetic>
        <Tilt>
          <div
            className={cn(
              "group relative glass-card p-6 md:p-8 hover:shadow-glow-lg transition-all duration-500",
              "border border-gray-700/50 hover:border-primary-500/50",
              "transform transition-all duration-300 hover:-translate-y-2 hover:scale-105",
              "cursor-pointer",
              className
            )}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-bitcoin-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

            {/* Floating Icon Background */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary-400 transition-colors duration-300">
                  {t(title)}
                </h3>
              </div>
              <p className="text-base md:text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                {t(description)}
              </p>

              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        </Tilt>
      </Magnetic>
    </Reveal>
  )
}
