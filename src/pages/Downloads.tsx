import { useEffect, useLayoutEffect, useState } from 'react'
import { Download, ExternalLink, FileText, Shield, CheckCircle2, Terminal, Zap, Lock } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import {
  createDownloadConfig,
  defaultDownloadConfig,
  verificationGuideUrl,
  type GithubReleaseAsset
} from '@/constants/downloads'
import { stripVersionTag } from '@/constants/versions'
import { footerConfig } from '@/constants/footer'
import type { PlatformDownload } from '@/types/downloads'
import { Reveal, Stagger, Tilt, Magnetic, ButtonGlow, Gradient, Particles } from '@/components/animations/ReactBitsFallbacks'
import rgbSymbol from '@/assets/rgb-symbol.svg'

type GithubRelease = {
  tag_name?: string
  published_at?: string
  html_url?: string
  assets?: GithubReleaseAsset[]
}

export const Downloads = () => {
  const [downloadConfig, setDownloadConfig] = useState(defaultDownloadConfig)
  const {
    currentVersion,
    platforms,
    manifestUrl,
    manifestSignatureUrl
  } = downloadConfig

  const downloadFile = (url?: string) => {
    if (!url) return
    window.location.href = url
  }

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchLatestRelease = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/kaleidoswap/desktop-app/releases/latest',
          {
            headers: {
              Accept: 'application/vnd.github+json'
            },
            signal: controller.signal
          }
        )

        if (!response.ok) {
          throw new Error(`GitHub API responded with status ${response.status}`)
        }

        const data: GithubRelease = await response.json()
        const tagName = data.tag_name ?? ''
        if (!tagName) {
          return
        }

        const version = stripVersionTag(tagName)
        if (!version) {
          return
        }
        const publishedAt = data.published_at
          ? new Date(data.published_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : undefined

        const updatedConfig = createDownloadConfig({
          version,
          date: publishedAt,
          notesUrl: data.html_url,
          assets: data.assets ?? []
        })

        if (isMounted) {
          setDownloadConfig(updatedConfig)
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }

        console.error('Failed to fetch latest KaleidoSwap release', error)
      }
    }

    fetchLatestRelease()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const platformFeatures: Record<string, string[]> = {
    windows: ['Windows 10/11', 'Native performance', 'Auto-updates', 'System tray support'],
    mac: ['macOS 11+', 'Apple Silicon & Intel', 'Native M1/M2 support', 'Keychain integration'],
    linux: ['AppImage format', 'All major distros', 'No dependencies', 'Portable']
  }

  const renderPlatformCard = (platform: PlatformDownload, index: number) => {
    const Icon = platform.icon
    const features = platformFeatures[platform.platform] || []
    const isDisabled = platform.disabled || false

    return (
      <Reveal delay={index * 150}>
        <Tilt>
          <Magnetic>
            <div className={`glass-card p-8 h-full flex flex-col group relative overflow-hidden transition-all duration-500 ${
              !isDisabled ? 'hover:scale-102 hover:border-primary-500/50' : 'opacity-60'
            }`}>
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge for Coming Soon */}
              {isDisabled && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  Coming Soon
                </div>
              )}

              {/* Header */}
              <div className="relative z-10 flex items-start gap-4 mb-6">
                <div className={`p-4 rounded-xl ${
                  !isDisabled ? 'bg-primary-500/10 text-primary-400' : 'bg-gray-500/10 text-gray-500'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{platform.title}</h3>
                  <p className="text-sm text-gray-400">
                    {platform.architecture.join(' • ')}
                  </p>
                  {platform.note && (
                    <p className="text-sm text-yellow-400 mt-2">{platform.note}</p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="relative z-10 mb-6 flex-1">
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download Button */}
              <div className="relative z-10">
                <Magnetic>
                  <ButtonGlow glowColor={!isDisabled ? '#0e9dff' : undefined}>
                    <Button
                      variant={!isDisabled ? 'default' : 'outline'}
                      size="lg"
                      className={
                        !isDisabled
                          ? 'w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 border-0 text-white font-bold group/btn'
                          : 'w-full border-gray-600 text-gray-400 cursor-not-allowed'
                      }
                      onClick={() => !isDisabled && downloadFile(platform.downloadUrl)}
                      disabled={isDisabled}
                    >
                      <Download className="mr-2 h-5 w-5 transition-transform group-hover/btn:scale-110" />
                      {!isDisabled ? 'Download for ' + platform.title : 'Coming Soon'}
                    </Button>
                  </ButtonGlow>
                </Magnetic>
              </div>

              {/* Animated Border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-700" />
            </div>
          </Magnetic>
        </Tilt>
      </Reveal>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed background gradient */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <Gradient
              colors={['#F7931A', '#0e9dff', '#8a5cf6']}
              className="absolute inset-0 opacity-10"
              speed={1}
            />
            <Particles
              count={40}
              className="absolute inset-0"
              particleColor="rgba(14, 157, 255, 0.3)"
              speed={0.5}
            />
          </div>

          <div className="container relative z-10">
            {/* Header */}
            <Reveal>
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Download KaleidoSwap
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                  Get started with the first Bitcoin-native DEX. Available for macOS, Linux, and Windows (coming soon).
                </p>

                {/* Version Info */}
                <div className="inline-flex items-center gap-3 px-6 py-3 glass-card text-sm">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Version</span>
                    <span className="font-bold text-green-400">{currentVersion.version}</span>
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400">{currentVersion.date}</span>
                  <span className="text-gray-600">•</span>
                  <a
                    href={currentVersion.notes}
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Release Notes
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Download Cards */}
            <Stagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
                {platforms.map((platform, index) => (
                  <div key={platform.platform}>
                    {renderPlatformCard(platform, index)}
                  </div>
                ))}
              </div>
            </Stagger>

            {/* Feature Highlights */}
            <Reveal delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
                <Tilt className="glass-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-bitcoin-500/10 text-bitcoin-400 mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Self-Custody</h3>
                  <p className="text-sm text-gray-400">Full control of your private keys</p>
                </Tilt>

                <Tilt className="glass-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-primary-500/10 text-primary-400 mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-400">Near-instant settlement</p>
                </Tilt>

                <Tilt className="glass-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-green-500/10 text-green-400 mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Open Source</h3>
                  <p className="text-sm text-gray-400">Fully auditable code</p>
                </Tilt>

                <Tilt className="glass-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-secondary-500/10 text-secondary-400 mb-4">
                    <img src={rgbSymbol} alt="RGB" className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">RGB Assets</h3>
                  <p className="text-sm text-gray-400">Trade any RGB token</p>
                </Tilt>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Verification Section */}
        <section className="py-16 relative overflow-hidden bg-gray-950/50">
          <div className="container relative z-10">
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-primary-400 bg-clip-text text-transparent">
                    Verify Your Download
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    For security, always verify the authenticity of your download using our cryptographic signatures
                  </p>
                </div>

                {/* Verification Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Tilt>
                    <div className="glass-card p-6 text-center group hover:border-primary-500/50 transition-all">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 text-primary-400 font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                        1
                      </div>
                      <h3 className="font-semibold text-white mb-2">Download Files</h3>
                      <p className="text-sm text-gray-400">Get manifest and signature files</p>
                    </div>
                  </Tilt>

                  <Tilt>
                    <div className="glass-card p-6 text-center group hover:border-primary-500/50 transition-all">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-500/10 text-secondary-400 font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                        2
                      </div>
                      <h3 className="font-semibold text-white mb-2">Verify Signature</h3>
                      <p className="text-sm text-gray-400">Check cryptographic signatures</p>
                    </div>
                  </Tilt>

                  <Tilt>
                    <div className="glass-card p-6 text-center group hover:border-primary-500/50 transition-all">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-400 font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                        3
                      </div>
                      <h3 className="font-semibold text-white mb-2">Install Safely</h3>
                      <p className="text-sm text-gray-400">Run verified application</p>
                    </div>
                  </Tilt>
                </div>

                {/* Verification Files Download */}
                <Tilt>
                  <div className="glass-card p-8 border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
                    <div className="text-center mb-6">
                      <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400 mb-4">
                        <Shield className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-green-400">Verification Files</h3>
                      <p className="text-gray-400">
                        Download these files to verify the authenticity of your download
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                      <Magnetic>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-green-500/50 text-green-400 hover:text-white hover:bg-green-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                          onClick={() => downloadFile(manifestUrl)}
                          disabled={!manifestUrl}
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Download Manifest
                        </Button>
                      </Magnetic>

                      <Magnetic>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-green-500/50 text-green-400 hover:text-white hover:bg-green-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                          onClick={() => downloadFile(manifestSignatureUrl)}
                          disabled={!manifestSignatureUrl}
                        >
                          <Shield className="w-5 h-5 mr-2" />
                          Download Signature
                        </Button>
                      </Magnetic>
                    </div>

                    <div className="text-center">
                      <a
                        href={verificationGuideUrl}
                        className="text-green-400 hover:text-green-300 inline-flex items-center gap-2 transition-colors group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>View Full Verification Guide</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </Tilt>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer {...footerConfig} />
      </div>
    </div>
  )
} 
