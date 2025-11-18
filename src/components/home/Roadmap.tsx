// src/components/home/Roadmap.tsx
import { Check, Clock, Calendar } from 'lucide-react'
import type { RoadmapProps } from '@/types/roadmap'
import { Reveal, Stagger, Tilt, Magnetic, Wave } from '@/components/animations/ReactBitsFallbacks'
import { useTranslation } from 'react-i18next'

export const Roadmap = ({
  title = 'Product Roadmap',
  description = 'Our journey to becoming the leading Bitcoin-native DeFi platform',
  milestones
}: RoadmapProps) => {
  const { t } = useTranslation()
  const statusConfig = {
    completed: {
      icon: Check,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      label: 'Completed',
      dotColor: 'bg-green-500'
    },
    'in-progress': {
      icon: Clock,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10',
      borderColor: 'border-primary-500/30',
      label: 'In Progress',
      dotColor: 'bg-primary-500 animate-pulse'
    },
    upcoming: {
      icon: Calendar,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
      label: 'Upcoming',
      dotColor: 'bg-gray-500'
    }
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Wave Background */}
      <Wave
        className="absolute inset-0 opacity-10"
        waveColor="#8a5cf6"
        speed={1.2}
      />

      <div className="container relative px-4 z-10">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary-400 via-primary-400 to-green-400 bg-clip-text text-transparent">
              {t(title)}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {t(description)}
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-primary-500 to-gray-500 transform -translate-x-1/2" />

            <Stagger>
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const config = statusConfig[milestone.status]
                  const StatusIcon = config.icon
                  const MilestoneIcon = milestone.icon
                  const isLeft = index % 2 === 0

                  return (
                    <Reveal key={milestone.id} delay={index * 100}>
                      <div className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                        {/* Card */}
                        <div className="w-5/12">
                          <Tilt>
                            <Magnetic>
                              <div className={`glass-card p-6 border ${config.borderColor} hover:scale-105 transition-all duration-500 group`}>
                                <div className="flex items-start gap-4">
                                  <div className={`p-3 rounded-lg ${config.bgColor} ${config.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <MilestoneIcon className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className={`text-xl font-bold ${config.color}`}>
                                        {t(milestone.title)}
                                      </h3>
                                      <StatusIcon className={`w-5 h-5 ${config.color}`} />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">
                                      {t(milestone.date)}
                                    </p>
                                    <p className="text-gray-300 mb-4">
                                      {t(milestone.description)}
                                    </p>
                                    {milestone.highlights && (
                                      <ul className="space-y-1">
                                        {milestone.highlights.map((highlight, idx) => (
                                          <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                                            {t(highlight)}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Magnetic>
                          </Tilt>
                        </div>

                        {/* Center Dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                          <div className={`w-6 h-6 rounded-full ${config.dotColor} border-4 border-gray-900`} />
                        </div>

                        {/* Spacer */}
                        <div className="w-5/12" />
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </Stagger>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-primary-500 to-gray-500" />

            <Stagger>
              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const config = statusConfig[milestone.status]
                  const StatusIcon = config.icon
                  const MilestoneIcon = milestone.icon

                  return (
                    <Reveal key={milestone.id} delay={index * 100}>
                      <div className="relative flex gap-6">
                        {/* Dot */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full ${config.dotColor} border-4 border-gray-900 flex items-center justify-center`}>
                            <StatusIcon className={`w-5 h-5 ${config.color}`} />
                          </div>
                        </div>

                        {/* Card */}
                        <div className="flex-1 pb-4">
                          <Tilt>
                            <div className={`glass-card p-6 border ${config.borderColor} group`}>
                              <div className="flex items-start gap-4 mb-3">
                                <div className={`p-3 rounded-lg ${config.bgColor} ${config.color} group-hover:scale-110 transition-transform duration-300`}>
                                  <MilestoneIcon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className={`text-lg font-bold ${config.color}`}>
                                    {t(milestone.title)}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    {t(milestone.date)}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-300 mb-4">
                                {t(milestone.description)}
                              </p>
                              {milestone.highlights && (
                                <ul className="space-y-1">
                                  {milestone.highlights.map((highlight, idx) => (
                                    <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                                      <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                                      {t(highlight)}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </Tilt>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </Stagger>
          </div>
        </div>

        {/* Bottom Note */}
        <Reveal delay={800}>
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-gray-400 leading-relaxed">
              {t('Our roadmap is ambitious but achievable. We are committed to building the future of Bitcoin DeFi with')}{' '}
              <span className="text-green-400 font-semibold">{t('transparency')}</span>,{' '}
              <span className="text-primary-400 font-semibold">{t('security')}</span>, {t('and')}{' '}
              <span className="text-secondary-400 font-semibold">{t('community input')}</span> {t('at every step.') }
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
