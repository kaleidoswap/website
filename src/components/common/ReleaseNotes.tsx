// src/components/common/ReleaseNotes.tsx
import { useMemo } from 'react'
import { ExternalLink, Loader2, ScrollText, Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { useLatestRelease } from '@/hooks/useLatestRelease'
import { parseReleaseNotes, tokenizeInline, type InlineToken } from '@/lib/releaseNotes'
import { GITHUB } from '@/constants/urls'

const InlineText = ({ text }: { text: string }) => (
  <>
    {tokenizeInline(text).map((token: InlineToken, i: number) => {
      switch (token.type) {
        case 'bold':
          return <strong key={i} className="font-semibold text-slate-200">{token.text}</strong>
        case 'code':
          return <code key={i} className="px-1.5 py-0.5 rounded bg-white/[0.06] text-primary-300 text-[0.85em] font-mono">{token.text}</code>
        case 'link':
          return (
            <a
              key={i}
              href={token.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
            >
              {token.text}
            </a>
          )
        default:
          return <span key={i}>{token.text}</span>
      }
    })}
  </>
)

/**
 * Release Notes section — always in sync with the latest GitHub release.
 * Fetches the release body at runtime and renders it as inert React elements.
 */
export const ReleaseNotes = () => {
  const { t } = useTranslation()
  const { release, isLoading } = useLatestRelease()

  const blocks = useMemo(
    () => (release?.body ? parseReleaseNotes(release.body) : []),
    [release?.body]
  )

  const releasesUrl = `${GITHUB.repoUrl}/releases`
  const notesUrl = release?.notesUrl ?? releasesUrl

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateIn variant="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Release Notes')}</h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t('The latest changelog, always in sync with GitHub.')}
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={150}>
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="inline-flex p-2.5 rounded-full bg-primary-500/10 text-primary-400">
                  <ScrollText className="w-5 h-5" />
                </div>
                {isLoading ? (
                  <span className="flex items-center gap-2 text-slate-400 text-sm">
                    <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                    {t('Loading release notes...')}
                  </span>
                ) : release ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">KaleidoSwap</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/30">
                        <Tag className="w-3 h-3" />
                        v{release.version}
                      </span>
                    </div>
                    {release.date && (
                      <p className="text-xs text-slate-500 mt-0.5">{release.date}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
                    {t('Release notes could not be loaded.')}
                  </p>
                )}
              </div>
              <a
                href={notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs rounded-xl font-semibold border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-gray-800/50 hover:text-gray-200 transition-all duration-300 w-fit"
              >
                <span>{t('View on GitHub')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Body */}
            {!isLoading && blocks.length > 0 && (
              <div className="p-6 md:p-8 max-h-[480px] overflow-y-auto space-y-3 text-sm leading-relaxed">
                {blocks.map((block, index) => {
                  switch (block.type) {
                    case 'heading':
                      return (
                        <h4 key={index} className="text-base font-bold text-white pt-3 first:pt-0">
                          <InlineText text={block.text} />
                        </h4>
                      )
                    case 'bullet':
                      return (
                        <div key={index} className="flex items-start gap-2.5 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                          <span><InlineText text={block.text} /></span>
                        </div>
                      )
                    case 'note':
                      return (
                        <div key={index} className="px-4 py-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-200/80">
                          <InlineText text={block.text} />
                        </div>
                      )
                    default:
                      return (
                        <p key={index} className="text-slate-400">
                          <InlineText text={block.text} />
                        </p>
                      )
                  }
                })}
              </div>
            )}
          </div>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={250} className="text-center mt-6">
          <a
            href={releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-slate-300 inline-flex items-center gap-1.5 transition-colors"
          >
            {t('Browse all releases')}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </AnimateIn>
      </div>
    </section>
  )
}
