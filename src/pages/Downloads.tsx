import { useEffect, useLayoutEffect, useState } from 'react'
import { Download, ExternalLink, FileText, Shield, Terminal, Zap, Lock, Loader2, Check, Key } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '@/components/common/SEO'
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
import { GITHUB } from '@/constants/urls'
import { footerConfig } from '@/constants/footer'
import type { PlatformDownload } from '@/types/downloads'
import rgbSymbol from '@/assets/rgb-symbol.svg'
import { useTranslation } from 'react-i18next'
import { AnimateIn } from '@/components/animations/AnimateIn'

type GithubRelease = {
  tag_name?: string
  published_at?: string
  html_url?: string
  assets?: GithubReleaseAsset[]
}

export const Downloads = () => {
  const [downloadConfig, setDownloadConfig] = useState(defaultDownloadConfig)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const {
    currentVersion,
    platforms,
  } = downloadConfig

  const downloadFile = (url?: string) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const CACHE_KEY = 'kaleidoswap_release_cache'
    const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

    const fetchLatestRelease = async () => {
      try {
        setIsLoading(true)

        // Check sessionStorage cache first
        const cached = sessionStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TTL) {
            const config = createDownloadConfig(data)
            if (isMounted) {
              setDownloadConfig(config)
              setIsLoading(false)
            }
            return
          }
        }

        const response = await fetch(
          GITHUB.apiLatestRelease,
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
          setIsLoading(false)
          return
        }

        const version = stripVersionTag(tagName)
        if (!version) {
          setIsLoading(false)
          return
        }
        const publishedAt = data.published_at
          ? new Date(data.published_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : undefined

        const configData = {
          version,
          date: publishedAt,
          notesUrl: data.html_url,
          assets: data.assets ?? []
        }

        // Cache the parsed config data
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: configData, timestamp: Date.now() }))
        } catch {
          // sessionStorage full or unavailable — no-op
        }

        const updatedConfig = createDownloadConfig(configData)

        if (isMounted) {
          setDownloadConfig(updatedConfig)
          setIsLoading(false)
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }

        console.error('Failed to fetch latest KaleidoSwap release', error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchLatestRelease()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const renderPlatformCard = (platform: PlatformDownload, index: number) => {
    const Icon = platform.icon
    const isDisabled = platform.disabled || false
    const localizedTitle = t(platform.title)
    const architectures = platform.architecture.map((item) => t(item)).join(' • ')
    const note = platform.note ? t(platform.note) : undefined

    return (
      <AnimateIn key={platform.platform} variant="fade-up" delay={index * 120} className="h-full flex flex-col">
        <motion.div
          className={`glass-card p-8 h-full flex flex-col relative overflow-hidden ${
            isDisabled ? 'opacity-60' : ''
          }`}
          whileHover={!isDisabled ? { y: -4, scale: 1.02 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Coming Soon badge */}
          {isDisabled && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-400 border border-slate-600/30">
              {t('Coming Soon')}
            </div>
          )}

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-xl ${
              !isDisabled ? 'bg-primary-500/10 text-primary-400' : 'bg-slate-700/30 text-slate-500'
            }`}>
              <Icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{localizedTitle}</h3>
              <p className="text-sm text-slate-400">{architectures}</p>
              {note && (
                <p className="text-sm text-yellow-400 mt-1">{note}</p>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Download Button */}
          <Button
            variant={!isDisabled ? 'default' : 'outline'}
            size="lg"
            className={
              !isDisabled
                ? 'w-full btn-glow flex items-center gap-2'
                : 'w-full border-slate-600 text-slate-500 cursor-not-allowed'
            }
            onClick={() => !isDisabled && !isLoading && downloadFile(platform.downloadUrl)}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('Loading...')}
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                {!isDisabled
                  ? t('Download for {{platform}}', { platform: localizedTitle })
                  : t('Coming Soon')}
              </>
            )}
          </Button>

          {/* GPG signature link */}
          {!isDisabled && platform.signatureUrl && (
            <a
              href={platform.signatureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Key className="w-3 h-3" />
              {t('GPG signature (.asc)')}
            </a>
          )}

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-700" />
        </motion.div>
      </AnimateIn>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Download"
        description="Download KaleidoSwap for macOS, Linux, or Windows. Self-custody Bitcoin DEX with Lightning Network support and RGB asset trading."
        url="/downloads"
        keywords={['download', 'bitcoin wallet', 'lightning', 'rgb', 'dex', 'macos', 'linux', 'windows']}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-down" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 mb-6 w-fit mx-auto">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">
                {t('Available Now')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('Download')}{' '}
              <span className="text-gradient">{t('KaleidoSwap')}</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {t('Get started with the first Bitcoin-native DEX. Available for macOS, Linux, and Windows.')}
            </p>

            {/* Version pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 glass-card text-sm rounded-full">
              {isLoading ? (
                <span className="flex items-center gap-2 text-slate-400">
                  <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                  {t('Loading version...')}
                </span>
              ) : (
                <>
                  <Terminal className="w-4 h-4 text-primary-400" />
                  <span className="text-slate-300">{t('Version')}</span>
                  <span className="font-bold text-primary-400">{currentVersion.version}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{currentVersion.date}</span>
                  <span className="text-slate-600">•</span>
                  <a
                    href={currentVersion.notes}
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Release Notes')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </AnimateIn>

          {/* Platform Download Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {platforms.map((platform, index) => renderPlatformCard(platform, index))}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Lock, label: t('Self-Custody'), desc: t('Full control of your private keys'), color: 'text-bitcoin-400', bg: 'bg-bitcoin-500/10' },
              { icon: Zap, label: t('Lightning Fast'), desc: t('Near-instant settlement'), color: 'text-primary-400', bg: 'bg-primary-500/10' },
              { icon: Shield, label: t('Open Source'), desc: t('Fully auditable code'), color: 'text-green-400', bg: 'bg-green-500/10' },
              { icon: null, label: t('RGB Assets'), desc: t('Trade any RGB token'), color: 'text-secondary-400', bg: 'bg-secondary-500/10' },
            ].map((item, i) => (
              <AnimateIn key={item.label} variant="fade-up" delay={600 + i * 80} className="h-full">
                <div className="glass-card p-5 text-center rounded-2xl h-full">
                  <div className={`inline-flex p-2.5 rounded-full ${item.bg} ${item.color} mb-3`}>
                    {item.icon ? (
                      <item.icon className="w-5 h-5" />
                    ) : (
                      <img src={rgbSymbol} alt="RGB" className="w-5 h-5" />
                    )}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-16 relative overflow-hidden bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn variant="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Verify Your Download')}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {t('Every release binary is individually GPG-signed. Verify before installing.')}
            </p>
          </AnimateIn>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { num: '1', title: t('Import GPG Key'), desc: t('One-time setup of the developer public key'), color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
              { num: '2', title: t('Download .asc File'), desc: t('Grab the signature alongside your binary'), color: 'text-secondary-400', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20' },
              { num: '3', title: t('Run gpg --verify'), desc: t('Confirm a good signature before installing'), color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
            ].map((step, i) => (
              <AnimateIn key={step.num} variant="fade-up" delay={i * 120} className="h-full">
                <div className={`glass-card p-6 text-center rounded-2xl border h-full ${step.border}`}>
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${step.bg} ${step.color} font-bold text-lg mb-4`}>
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Command blocks */}
          <AnimateIn variant="fade-up" delay={400}>
            <div className="glass-card rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <div className="inline-flex p-2.5 rounded-full bg-green-500/10 text-green-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('Verification Commands')}</h3>
                  <p className="text-xs text-slate-400">{t('Run in your terminal after downloading the binary and its .asc file')}</p>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {/* Step 1 */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {t('1 — Import developer public key (once)')}
                  </p>
                  <pre className="bg-black/40 rounded-xl px-4 py-3 text-sm text-green-300 font-mono overflow-x-auto">
                    {`curl -s https://github.com/bitwalt.gpg | gpg --import`}
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {t('2 — Verify the binary against its signature')}
                  </p>
                  <pre className="bg-black/40 rounded-xl px-4 py-3 text-sm text-green-300 font-mono overflow-x-auto whitespace-pre-wrap">
                    {`# macOS (Apple Silicon)\ngpg --verify KaleidoSwap_${currentVersion.version}_aarch64.dmg.asc \\\n        KaleidoSwap_${currentVersion.version}_aarch64.dmg\n\n# macOS (Intel)\ngpg --verify KaleidoSwap_${currentVersion.version}_x64.dmg.asc \\\n        KaleidoSwap_${currentVersion.version}_x64.dmg\n\n# Linux\ngpg --verify KaleidoSwap_${currentVersion.version}_amd64.AppImage.asc \\\n        KaleidoSwap_${currentVersion.version}_amd64.AppImage\n\n# Windows\ngpg --verify KaleidoSwap_${currentVersion.version}_x64-setup.msi.asc \\\n        KaleidoSwap_${currentVersion.version}_x64-setup.msi`}
                  </pre>
                </div>

                {/* Expected output */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {t('Expected output')}
                  </p>
                  <pre className="bg-black/40 rounded-xl px-4 py-3 text-sm text-slate-300 font-mono overflow-x-auto">
                    {`gpg: using RSA key 9EE396C0452755F0\ngpg: Good signature from "Walter (Kaleidoswap Developer) <walter@kaleidoswap.com>"`}
                  </pre>
                  <p className="text-xs text-slate-500 mt-2">
                    {t('The key phrase is "Good signature". Any other result means the file should not be trusted.')}
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`https://github.com/${GITHUB.org}/${GITHUB.repo}/releases/tag/v${currentVersion.version}`}
                  className="text-slate-400 hover:text-white inline-flex items-center gap-2 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('Browse all release assets & .asc files')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={verificationGuideUrl}
                  className="text-green-400 hover:text-green-300 inline-flex items-center gap-2 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t('Full verification guide')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* Trust signals */}
          <AnimateIn variant="fade-up" delay={500}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-500" />
                <span>{t('100% Open Source')}</span>
              </div>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-500" />
                <span>{t('No Telemetry')}</span>
              </div>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary-500" />
                <span>{t('Non-Custodial')}</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
