import { useEffect, useLayoutEffect, useState } from 'react'
import { Download, ExternalLink, Shield, Terminal, Loader2, Check, Key } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '@/components/common/SEO'
import { Button } from '@/components/common/Button'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import {
  createDownloadConfig,
  verificationGuideUrl,
  type DownloadConfig,
  type GithubReleaseAsset
} from '@/constants/downloads'
import { stripVersionTag } from '@/constants/versions'
import { GITHUB } from '@/constants/urls'
import { footerConfig } from '@/constants/footer'
import type { PlatformDownload } from '@/types/downloads'
import { useTranslation } from 'react-i18next'
import { AnimateIn } from '@/components/animations/AnimateIn'

type GithubRelease = {
  tag_name?: string
  published_at?: string
  html_url?: string
  assets?: GithubReleaseAsset[]
}

export const Downloads = () => {
  const [downloadConfig, setDownloadConfig] = useState<DownloadConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const currentVersion = downloadConfig?.currentVersion ?? { version: '', date: '', notes: '' }
  const platforms = downloadConfig?.platforms ?? []

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
          className={`glass-card rounded-2xl p-8 h-full flex flex-col relative overflow-hidden min-h-[340px] border !border-white/15 ${
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

          {/* Download Button */}
          <Button
            variant={!isDisabled ? 'default' : 'outline'}
            size="lg"
            className={
              !isDisabled
                ? 'w-full btn-glow flex items-center gap-2 mt-8'
                : 'w-full border-slate-600 text-slate-500 cursor-not-allowed mt-8'
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
                {!isDisabled ? t('Download') : t('Coming Soon')}
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

          {/* Secondary downloads */}
          {!isDisabled && platform.secondaryDownloads && platform.secondaryDownloads.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                {t('Also available')}
              </p>
              <div className="flex flex-row flex-wrap gap-1.5">
                {platform.secondaryDownloads.map((dl) => (
                  <a
                    key={dl.label}
                    href={dl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors group/dl"
                  >
                    <Download className="w-3.5 h-3.5 opacity-0 group-hover/dl:opacity-100 transition-opacity" />
                    <span>{t(dl.label)}</span>
                  </a>
                ))}
              </div>
            </div>
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

        </div>
      </section>

      {/* Verification Section */}
      <section className="pt-8 pb-16 relative overflow-hidden bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn variant="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Verify Your Download')}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {t('Every release binary is individually GPG-signed. Verify before installing.')}
            </p>
          </AnimateIn>

          {/* Steps */}
          <AnimateIn variant="fade-up" delay={100}>
            <div className="flex items-start max-w-3xl mx-auto mb-12">
              {[
                { num: '01', title: t('Import GPG Key'), desc: t('One-time setup of the developer public key') },
                { num: '02', title: t('Download .asc File'), desc: t('Grab the signature alongside your binary') },
                { num: '03', title: t('Run gpg --verify'), desc: t('Confirm a good signature before installing') },
              ].map((step, i) => (
                <div key={step.num} className="flex items-start flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-green-400">{step.num}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="h-px bg-white/15 mt-8 w-12 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* Command blocks */}
          <AnimateIn variant="fade-up" delay={400}>
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
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
                  <pre className="bg-black/40 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono overflow-x-auto">
                    {`curl -s https://github.com/bitwalt.gpg | gpg --import`}
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {t('2 — Verify the binary against its signature')}
                  </p>
                  <pre className="bg-black/40 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono overflow-x-auto whitespace-pre-wrap">
                    {`# macOS (Apple Silicon)\ngpg --verify KaleidoSwap_${currentVersion.version}_aarch64.dmg.asc \\\n        KaleidoSwap_${currentVersion.version}_aarch64.dmg\n\n# macOS (Intel)\ngpg --verify KaleidoSwap_${currentVersion.version}_x64.dmg.asc \\\n        KaleidoSwap_${currentVersion.version}_x64.dmg\n\n# Linux\ngpg --verify KaleidoSwap_${currentVersion.version}_amd64.AppImage.asc \\\n        KaleidoSwap_${currentVersion.version}_amd64.AppImage\n\n# Windows\ngpg --verify KaleidoSwap_${currentVersion.version}_x64-setup.exe.asc \\\n        KaleidoSwap_${currentVersion.version}_x64-setup.exe`}
                  </pre>
                </div>

                {/* Expected output */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {t('Expected output')}
                  </p>
                  <pre className="bg-black/40 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono overflow-x-auto">
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
                  <span>{t('Browse all release assets & .asc files')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={verificationGuideUrl}
                  className="inline-flex items-center gap-1.5 h-7 px-3 text-xs rounded-xl font-semibold border-2 border-gray-600/80 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t('Full verification guide')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* Trust signals */}
          <AnimateIn variant="fade-up" delay={500}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500 max-w-4xl mx-auto">
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
