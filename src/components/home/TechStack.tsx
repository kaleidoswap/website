// src/components/home/TechStack.tsx
import { Bitcoin, Zap, Code, Database, GitBranch } from 'lucide-react'
import { Reveal, Tilt, Magnetic, CountUp, FloatingElements, Hyperspeed } from '@/components/animations/ReactBitsFallbacks'

interface TechLayer {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  position: string
}

const techLayers: TechLayer[] = [
  {
    name: "KaleidoSwap",
    description: "Application Layer",
    icon: Code,
    color: "text-green-400",
    position: "top-0"
  },
  {
    name: "RGB Protocol",
    description: "Smart Contract Layer",
    icon: Database,
    color: "text-secondary-400",
    position: "top-1/4"
  },
  {
    name: "Lightning Network",
    description: "Scaling Layer",
    icon: Zap,
    color: "text-primary-400",
    position: "top-2/4"
  },
  {
    name: "Bitcoin",
    description: "Security Layer",
    icon: Bitcoin,
    color: "text-bitcoin-400",
    position: "top-3/4"
  }
]

export const TechStack = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Hyperspeed Background */}
      <Hyperspeed
        className="absolute inset-0 opacity-20"
        effectColor="#F7931A"
        speed={1}
      />

      {/* Floating Elements */}
      <FloatingElements
        count={20}
        className="absolute inset-0"
        elementColor="rgba(14, 157, 255, 0.3)"
        speed={0.8}
      />

      <div className="container relative px-4 z-10">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-bitcoin-400 bg-clip-text text-transparent">
              Built on Bitcoin's Revolutionary Stack
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              KaleidoSwap leverages the most advanced Bitcoin technologies to deliver unprecedented trading capabilities
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Technology Stack Visualization */}
          <Reveal delay={300}>
            <div className="relative h-96 md:h-[500px]">
              {/* Central connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-secondary-400 via-primary-400 to-bitcoin-400 transform -translate-x-1/2" />

              {techLayers.map((layer) => (
                <Tilt key={layer.name} className={`absolute ${layer.position} left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                  <Magnetic>
                    <div className="glass-card p-6 w-64 text-center hover:scale-110 transition-all duration-500 group">
                      <div className={`inline-flex p-4 rounded-full bg-gray-800/50 mb-4 ${layer.color} group-hover:scale-125 transition-transform duration-300`}>
                        <layer.icon className="w-8 h-8" />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${layer.color}`}>
                        {layer.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {layer.description}
                      </p>

                      {/* Connecting dots */}
                      <div className="absolute -right-8 top-1/2 w-4 h-4 rounded-full bg-current opacity-50 transform -translate-y-1/2" />
                      <div className="absolute -left-8 top-1/2 w-4 h-4 rounded-full bg-current opacity-50 transform -translate-y-1/2" />
                    </div>
                  </Magnetic>
                </Tilt>
              ))}

              {/* Animated particles flowing through the stack */}
              <div className="absolute left-1/2 top-0 w-2 h-2 bg-bitcoin-400 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}} />
              <div className="absolute left-1/2 top-1/4 w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}} />
              <div className="absolute left-1/2 top-2/4 w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '1s'}} />
              <div className="absolute left-1/2 top-3/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
            </div>
          </Reveal>

          {/* Features and Stats */}
          <div className="space-y-8">
            <Reveal delay={600}>
              <div className="grid grid-cols-2 gap-6">
                <Tilt className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-bitcoin-400 mb-2">
                    <CountUp end={100} duration={2000} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-400">Bitcoin Security</div>
                </Tilt>

                <Tilt className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    &lt;<CountUp end={1} duration={2000} />s
                  </div>
                  <div className="text-sm text-gray-400">Settlement Speed</div>
                </Tilt>

                <Tilt className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-secondary-400 mb-2">
                    <CountUp end={0} duration={2000} />
                  </div>
                  <div className="text-sm text-gray-400">Counterparty Risk</div>
                </Tilt>

                <Tilt className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    <CountUp end={24} duration={2000} />/7
                  </div>
                  <div className="text-sm text-gray-400">Availability</div>
                </Tilt>
              </div>
            </Reveal>

            <Reveal delay={800}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-bitcoin-500/10 text-bitcoin-400">
                    <Bitcoin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-bitcoin-400 mb-2">Bitcoin Foundation</h4>
                    <p className="text-gray-400">Built on the most secure and decentralized network in the world, ensuring your assets are protected by proof-of-work consensus.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary-400 mb-2">Lightning Speed</h4>
                    <p className="text-gray-400">Execute trades instantly with Lightning Network's second-layer scaling solution, enabling near-zero fees and instant settlement.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary-500/10 text-secondary-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-400 mb-2">RGB Innovation</h4>
                    <p className="text-gray-400">Leverage RGB protocol's smart contract capabilities to create and trade complex financial instruments while maintaining Bitcoin's security.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Open Source</h4>
                    <p className="text-gray-400">Completely transparent and auditable codebase, built by the community for the community with no hidden mechanisms or backdoors.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}