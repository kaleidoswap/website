// src/components/home/Community.tsx
import { ExternalLink } from 'lucide-react'
import type { CommunityProps } from '@/types/community'
import { Reveal, Stagger, Tilt, Magnetic, Aurora, Gradient } from '@/components/animations/ReactBitsFallbacks'

export const Community = ({
  title = 'Join the Bitcoin DeFi Revolution',
  description = 'Connect with developers, traders, and enthusiasts building the future of Bitcoin DeFi',
  socialLinks
}: CommunityProps) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gray-950/30">
      {/* Aurora Background */}
      <Aurora
        className="absolute inset-0 opacity-20"
        colors={['#0e9dff', '#8a5cf6', '#10B981']}
        speed={1}
      />

      {/* Gradient Background */}
      <Gradient
        colors={['#10B981', '#0e9dff', '#8a5cf6']}
        className="absolute inset-0 opacity-10"
        speed={1.5}
      />

      <div className="container relative px-4 z-10">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-green-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </Reveal>

        {/* Social Links Grid */}
        <Stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Reveal key={link.id} delay={index * 100}>
                  <Tilt>
                    <Magnetic>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block glass-card p-6 hover:scale-105 transition-all duration-500 group relative"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-gray-800/50 ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-lg font-semibold ${link.color}`}>
                                {link.name}
                              </h3>
                              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {link.description}
                            </p>
                          </div>
                        </div>

                        {/* Animated Border */}
                        <div className={`absolute bottom-0 left-0 w-0 h-1 ${link.color.replace('text-', 'bg-')} group-hover:w-full transition-all duration-700`} />
                      </a>
                    </Magnetic>
                  </Tilt>
                </Reveal>
              )
            })}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
