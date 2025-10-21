// src/components/home/DeveloperSection.tsx
import { Download, ExternalLink, Github, FileText, Users, Code, Terminal } from 'lucide-react'
import { Reveal, Tilt, Magnetic, ButtonGlow, Matrix, Typewriter } from '@/components/animations/ReactBitsFallbacks'
import { Button } from '@/components/common/Button'

interface DownloadOption {
  platform: string
  status: 'available' | 'coming-soon'
  version?: string
  downloadUrl?: string
  icon: React.ComponentType<{ className?: string }>
}

const downloadOptions: DownloadOption[] = [
  {
    platform: 'Linux',
    status: 'available',
    version: 'v0.3.0',
    downloadUrl: '/downloads',
    icon: Terminal
  },
  {
    platform: 'macOS',
    status: 'available',
    version: 'v0.3.0',
    downloadUrl: '/downloads',
    icon: Terminal
  },
  {
    platform: 'Windows',
    status: 'available',
    version: 'v0.3.0',
    downloadUrl: '/downloads',
    icon: Terminal
  }
]

const developerResources = [
  {
    title: 'GitHub Repository',
    description: 'Open source codebase with full transparency',
    icon: Github,
    link: 'https://github.com/kaleidoswap/kaleidoswap',
    color: 'text-gray-100'
  },
  {
    title: 'API Documentation',
    description: 'Complete developer guides and API reference',
    icon: FileText,
    link: 'https://docs.kaleidoswap.com',
    color: 'text-primary-400'
  },
  {
    title: 'Community Discord',
    description: 'Join developers building on KaleidoSwap',
    icon: Users,
    link: 'https://discord.gg/kaleidoswap',
    color: 'text-secondary-400'
  },
  {
    title: 'Developer Tools',
    description: 'SDKs and tools for RGB asset integration',
    icon: Code,
    link: 'https://developers.kaleidoswap.com',
    color: 'text-green-400'
  }
]

export const DeveloperSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gray-950">
      {/* Matrix Background */}
      <Matrix
        className="absolute inset-0 opacity-5"
        color="#0e9dff"
        speed={0.3}
      />

      <div className="container relative px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Download & Getting Started */}
          <div>
            <Reveal>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-green-400 bg-clip-text text-transparent">
                  Ready to Start Trading?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                  Download KaleidoSwap Alpha and experience the future of Bitcoin DeFi. Built for power users, designed for everyone.
                </p>

                {/* Download Options */}
                <div className="space-y-4 mb-8">
                  {downloadOptions.map((option, index) => (
                    <Reveal key={option.platform} delay={index * 100}>
                      <Tilt>
                        <div className={`glass-card p-4 flex items-center justify-between transition-all duration-300 ${
                          option.status === 'available'
                            ? 'hover:border-green-500/50 cursor-pointer'
                            : 'opacity-60'
                        }`}>
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${
                              option.status === 'available'
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-gray-500/10 text-gray-500'
                            }`}>
                              <option.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {option.platform}
                                {option.version && (
                                  <span className="ml-2 text-sm text-gray-400">
                                    {option.version}
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {option.status === 'available'
                                  ? 'Download now'
                                  : 'Coming soon'}
                              </p>
                            </div>
                          </div>

                          {option.status === 'available' && option.downloadUrl && (
                            <Magnetic>
                              <a
                                href={option.downloadUrl}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </a>
                            </Magnetic>
                          )}
                        </div>
                      </Tilt>
                    </Reveal>
                  ))}
                </div>

                {/* Quick Start CTA */}
                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Magnetic>
                      <ButtonGlow glowColor="#10B981">
                        <Button
                          variant="default"
                          size="lg"
                          className="group bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-400 hover:via-green-500 hover:to-green-400 text-black font-bold border-0 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"
                        >
                          <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-6" />
                          Download Alpha
                        </Button>
                      </ButtonGlow>
                    </Magnetic>

                    <Magnetic>
                      <Button
                        variant="outline"
                        size="lg"
                        className="group border-2 border-gray-600/80 text-gray-300 hover:text-white hover:border-gray-500 hover:bg-gray-800/50 backdrop-blur-sm"
                      >
                        <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        Quick Start Guide
                      </Button>
                    </Magnetic>
                  </div>
                </Reveal>
              </div>
            </Reveal>

            {/* Terminal Example */}
            <Reveal delay={600}>
              <Tilt>
                <div className="glass-card p-6 bg-gray-950/80">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-500 ml-2">kaleidoswap-alpha</span>
                  </div>

                  <div className="font-mono text-sm space-y-2">
                    <div className="text-green-400">
                      <Typewriter text="$ kaleidoswap --version" speed={50} />
                    </div>
                    <div className="text-blue-400 opacity-80">
                      <Typewriter text="KaleidoSwap v0.3.0 Alpha" speed={30} delay={1000} />
                    </div>
                    <div className="text-green-400">
                      <Typewriter text="$ kaleidoswap connect --testnet" speed={50} delay={2000} />
                    </div>
                    <div className="text-blue-400 opacity-80">
                      <Typewriter text="✓ Connected to Bitcoin Testnet" speed={30} delay={3000} />
                    </div>
                    <div className="text-yellow-400">
                      <Typewriter text="Ready for RGB trading on Lightning Network!" speed={40} delay={4000} />
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          </div>

          {/* Right: Developer Resources */}
          <div>
            <Reveal delay={300}>
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">
                  Developer Resources
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Everything you need to build on top of KaleidoSwap and integrate RGB assets into your applications.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {developerResources.map((resource, index) => (
                <Reveal key={resource.title} delay={400 + index * 100}>
                  <Magnetic>
                    <Tilt>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block glass-card p-6 hover:scale-105 transition-all duration-300 group relative"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-gray-800/50 ${resource.color} group-hover:scale-110 transition-transform duration-300`}>
                            <resource.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`text-lg font-semibold ${resource.color}`}>
                                {resource.title}
                              </h4>
                              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                              {resource.description}
                            </p>
                          </div>
                        </div>

                        {/* Animated bottom border */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-500" />
                      </a>
                    </Tilt>
                  </Magnetic>
                </Reveal>
              ))}
            </div>

            {/* Open Source Notice */}
            <Reveal delay={800}>
              <div className="mt-8 p-6 border border-green-500/20 bg-green-500/5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-green-400">100% Open Source</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  KaleidoSwap is completely open source. Audit our code, contribute to development,
                  or fork the project to build your own RGB trading platform.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}