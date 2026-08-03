// src/pages/MediaKit.tsx
import { useState } from 'react'
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Mail,
  Mic,
  Newspaper,
  Palette,
  PlayCircle,
  Type,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnchorHeading } from '@/components/common/AnchorHeading'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { XIcon } from '@/components/icons/SocialIcons'
import { footerConfig } from '@/constants/footer'
import { STATIC_PAGE_META } from '@/constants/pageMeta'
import {
  BOILERPLATE_FULL,
  BOILERPLATE_SHORT,
  BRAND_GRADIENT,
  MEDIA_KIT_ZIP,
  PRESS_CONTACT_EMAIL,
  brandColors,
  conferenceTalks,
  factSheet,
  logoAssets,
  logoRules,
  pressCoverage,
  screenshots,
} from '@/constants/mediaKit'

const useCopy = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }
  return { copiedId, copy }
}

// `id` is passed explicitly rather than slugified from `title`: titles go through
// t(), so deriving the anchor would change it per locale and break shared links.
const SectionHeading = ({
  icon: Icon,
  id,
  title,
  subtitle,
}: {
  icon: typeof Palette
  id: string
  title: string
  subtitle: string
}) => {
  const { t } = useTranslation()
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400">
          <Icon className="w-6 h-6" />
        </div>
        <AnchorHeading id={id} className="text-3xl md:text-4xl font-bold">
          {t(title)}
        </AnchorHeading>
      </div>
      <p className="text-slate-400 max-w-2xl">{t(subtitle)}</p>
    </div>
  )
}

const iconActionClass =
  'h-8 px-3 gap-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center text-sm'
const iconOnlyActionClass =
  'w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center shrink-0'
const iconOnlyActionActiveClass =
  'w-8 h-8 rounded-lg bg-white/5 border border-primary-400/50 text-primary-400 transition-colors flex items-center justify-center shrink-0'

export const MediaKit = () => {
  const { t } = useTranslation()
  const { copiedId, copy } = useCopy()

  return (
    <div className="min-h-screen bg-transparent text-white font-display">
      <SEO {...STATIC_PAGE_META['/media-kit']} url="/media-kit" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kaleidoswap.com' },
              { '@type': 'ListItem', position: 2, name: 'Media Kit', item: 'https://kaleidoswap.com/media-kit' },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 mb-6">
              <Newspaper className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{t('Media Kit')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              KaleidoSwap Assets
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mb-8">
              {t('Everything you need to cover KaleidoSwap: official logos, brand colors, product screenshots, press coverage, and conference talks.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={MEDIA_KIT_ZIP} download>
                <Button className="btn-glow">
                  <Download className="w-4 h-4 mr-2" />
                  {t('Download Full Kit')}
                </Button>
              </a>
              <a href={`mailto:${PRESS_CONTACT_EMAIL}`}>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  {t('Press Contact')}
                </Button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* About / Boilerplate */}
      <section id="about" className="py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionHeading
              icon={Newspaper}
              id="about"
              title="About KaleidoSwap"
              subtitle="Official boilerplate copy, ready to paste into your article."
            />
          </AnimateIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start">
            <AnimateIn variant="fade-up" className="flex flex-col gap-6">
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Short version')}</span>
                  <button
                    onClick={() => copy('short', BOILERPLATE_SHORT)}
                    aria-label={copiedId === 'short' ? t('Copied') : t('Copy')}
                    title={copiedId === 'short' ? t('Copied') : t('Copy')}
                    className={copiedId === 'short' ? iconOnlyActionActiveClass : iconOnlyActionClass}
                  >
                    {copiedId === 'short' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-slate-300 leading-relaxed">{BOILERPLATE_SHORT}</p>
              </div>
              <div className="glass-card rounded-2xl p-8">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-6">{t('Fact Sheet')}</span>
                <div className="divide-y divide-white/5">
                  {factSheet.map((entry) => (
                    <div key={entry.label} className="flex items-center gap-4 py-3">
                      <span className="w-32 shrink-0 text-sm font-medium text-slate-500">{t(entry.label)}</span>
                      <span className="flex-1 text-sm text-slate-300">{entry.value}</span>
                      {entry.url && (
                        <Link
                          to={entry.url}
                          aria-label={t('Read article')}
                          title={t('Read article')}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={120}>
              <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Extended version')}</span>
                  <button
                    onClick={() => copy('full', BOILERPLATE_FULL)}
                    aria-label={copiedId === 'full' ? t('Copied') : t('Copy')}
                    title={copiedId === 'full' ? t('Copied') : t('Copy')}
                    className={copiedId === 'full' ? iconOnlyActionActiveClass : iconOnlyActionClass}
                  >
                    {copiedId === 'full' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-slate-300 leading-relaxed">{BOILERPLATE_FULL}</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section id="logos" className="py-16 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionHeading
              icon={ImageIcon}
              id="logos"
              title="Logos"
              subtitle="All lockups are designed for dark backgrounds. Download the version that fits your layout."
            />
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {logoAssets.map((logo, i) => (
              <AnimateIn key={logo.id} variant="fade-up" delay={i * 120}>
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-center h-36 rounded-xl bg-[#0D1813] border border-white/5 mb-5 p-6">
                    <img src={logo.preview} alt={logo.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="font-bold mb-1">{t(logo.name)}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-1">{t(logo.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {logo.files.map((file) => (
                      <a key={file.path} href={file.path} download className={iconActionClass}>
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span>{file.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn variant="fade-up" delay={200}>
            <div className="glass-panel rounded-2xl p-8">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-4">{t('Usage Guidelines')}</span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {logoRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                    {t(rule)}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Colors & Typography */}
      <section id="colors-typography" className="py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionHeading
              icon={Palette}
              id="colors-typography"
              title="Colors & Typography"
              subtitle="The official palette and typeface. Click any swatch to copy its hex value."
            />
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
            <div
              className="h-3 rounded-full mb-6"
              style={{ background: BRAND_GRADIENT }}
              title="Brand gradient — 135°, #15E99A → #6F32FF"
            />
          </AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {brandColors.map((color, i) => (
              <AnimateIn key={color.hex} variant="fade-up" delay={i * 80}>
                <button
                  onClick={() => copy(color.hex, color.hex)}
                  className="glass-card rounded-2xl p-4 w-full text-left group"
                >
                  <div
                    className="h-20 rounded-xl mb-4 border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h3 className="text-sm font-bold mb-0.5">{color.name}</h3>
                  <p className="text-xs text-slate-500 mb-2 min-h-[2rem] line-clamp-2">{t(color.usage)}</p>
                  <span
                    className={
                      copiedId === color.hex
                        ? 'inline-flex items-center gap-2 h-8 px-3 rounded-lg bg-white/5 border border-primary-400/50 text-primary-400 text-xs font-mono transition-colors'
                        : 'inline-flex items-center gap-2 h-8 px-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-mono transition-colors group-hover:text-white group-hover:border-white/20'
                    }
                  >
                    {copiedId === color.hex ? (
                      <>
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>{t('Copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>{color.hex}</span>
                      </>
                    )}
                  </span>
                </button>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn variant="fade-up" delay={200}>
            <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-8">
              <div className="p-4 rounded-xl bg-secondary-500/10 text-secondary-400 w-fit">
                <Type className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">Satoshi</h3>
                <p className="text-slate-400 text-sm max-w-[78ch] text-pretty">
                  {t('Brand typeface across all platforms. Bold for headlines, Medium for UI labels, Regular for body copy. Free for commercial use under the SIL OFL 1.1 license.')}
                </p>
              </div>
              <a href="https://www.fontshare.com/fonts/satoshi" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  {t('Get the Font')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" className="py-16 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionHeading
              icon={ImageIcon}
              id="screenshots"
              title="Product Screenshots"
              subtitle="High-resolution screenshots of the KaleidoSwap products, free to use in coverage."
            />
          </AnimateIn>
          {/*
            The portrait screenshot takes the right column outright, so its height
            matches the two landscape cards stacked in the left column.

            Every frame is filled edge to edge — no letterboxing. The landscape shots
            sit just wide of a 3:2 frame, so they keep their full height and lose a
            sliver off each side; the portrait shot is anchored to the top and loses
            its empty lower half.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {screenshots.map((shot, i) => (
              <AnimateIn
                key={shot.id}
                variant="fade-up"
                delay={i * 120}
                className={shot.portrait ? 'md:col-start-2 md:row-start-1 md:row-span-2' : undefined}
              >
                <div className="glass-card rounded-2xl p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between px-1 mb-4">
                    <h3 className="font-bold">{t(shot.name)}</h3>
                    <a href={shot.path} download aria-label="PNG" title="PNG" className={iconOnlyActionClass}>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  {/*
                    The image is absolutely positioned so it never contributes intrinsic
                    height: the portrait frame stretches to the two rows it spans instead
                    of pushing them taller.
                  */}
                  <div
                    className={
                      shot.portrait
                        ? 'relative rounded-xl overflow-hidden border border-white/5 aspect-[3/4] md:aspect-auto md:flex-1 md:min-h-0'
                        : 'relative rounded-xl overflow-hidden border border-white/5 aspect-[3/2]'
                    }
                  >
                    <img
                      src={shot.preview}
                      alt={`${shot.name} screenshot`}
                      className={`absolute inset-0 w-full h-full object-cover ${shot.portrait ? 'object-top' : 'object-center'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section id="press-coverage" className="py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionHeading
              icon={Newspaper}
              id="press-coverage"
              title="Press Coverage"
              subtitle="Selected articles and features about KaleidoSwap."
            />
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
            <div className="glass-card rounded-2xl divide-y divide-white/5">
              {pressCoverage.map((article) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-8 py-4 group hover:bg-white/[0.03] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  {article.type === 'video' ? (
                    <PlayCircle className="w-4 h-4 text-secondary-400 shrink-0" />
                  ) : article.type === 'social' ? (
                    <XIcon className="w-4 h-4 text-slate-300 shrink-0" />
                  ) : (
                    <Newspaper className="w-4 h-4 text-primary-400 shrink-0" />
                  )}
                  <span className="w-40 shrink-0 text-sm font-semibold text-slate-300 truncate">{article.outlet}</span>
                  <span className="flex-1 text-sm text-slate-400 group-hover:text-white transition-colors truncate">
                    {article.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Conference Talks */}
      <section id="conference-talks" className="py-16 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-secondary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn variant="fade-up">
            <SectionHeading
              icon={Mic}
              id="conference-talks"
              title="Conference Talks"
              subtitle="Where the team has presented KaleidoSwap and sovereign trading on Bitcoin L2s."
            />
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
            <div className="glass-card rounded-2xl divide-y divide-white/5">
              {conferenceTalks.map((talk) => (
                <div
                  key={`${talk.event}-${talk.date}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-8 py-4"
                >
                  <span className="w-24 shrink-0 text-sm font-mono text-slate-500">{talk.date}</span>
                  <span className="flex-1 text-sm font-semibold text-slate-200">{talk.event}</span>
                  <span className="flex-1 text-sm text-slate-400">{talk.location}</span>
                  {talk.videoUrl ? (
                    <a
                      href={talk.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors shrink-0"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {t('Watch')}
                    </a>
                  ) : (
                    <span className="w-16 shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Press Contact CTA */}
      <section id="press-contact" className="py-20 bg-gradient-to-br from-secondary-500/5 to-primary-500/5 scroll-mt-24">
        <AnimateIn variant="scale" className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('Write about KaleidoSwap')}</h2>
          <p className="text-slate-400 mb-8 text-base sm:text-lg">
            {t('For interviews, quotes, additional assets, or anything else you need, reach out — we answer fast.')}
          </p>
          <a href={`mailto:${PRESS_CONTACT_EMAIL}`}>
            <Button size="lg" className="btn-glow flex items-center gap-2 mx-auto">
              <Mail className="w-4 h-4" />
              {PRESS_CONTACT_EMAIL}
            </Button>
          </a>
        </AnimateIn>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
