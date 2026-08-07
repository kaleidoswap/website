// src/pages/BusinessCard.tsx
// Digital business card, meant to be opened by scanning the QR code printed
// on a physical card. See src/constants/businessCards.ts to edit the data,
// and worker/vcard.ts for the .vcf the primary CTA links to.
import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check, Copy, Download, Mail, Phone } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { buttonVariants } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { GitHubIcon, XIcon, LinkedInIcon } from '@/components/icons/SocialIcons'
import { footerConfig } from '@/constants/footer'
import { getBusinessCard } from '@/constants/businessCards'
import { cn } from '@/lib/utils'

const FALLBACK_PHOTO = '/logos/kaleidoswap-logos/kaleidoswap-pictogram.svg'

// Last-resort copy for when the async Clipboard API is unavailable or refuses
// (insecure context, unfocused document, older mobile browsers). These buttons
// exist precisely as a fallback, so they shouldn't have a silent failure mode
// of their own.
function legacyCopy(value: string): boolean {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

function useCopyFeedback() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copy = async (value: string, key: string) => {
    let ok = false
    try {
      await navigator.clipboard.writeText(value)
      ok = true
    } catch {
      ok = legacyCopy(value)
    }
    // Only confirm what actually happened — a "Copied" label on an empty
    // clipboard is worse than no feedback, since the phone/email stay
    // visible as tappable links right below either way.
    if (!ok) return
    setCopiedKey(key)
    setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2000)
  }

  return { copiedKey, copy }
}

export function BusinessCard() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const card = slug ? getBusinessCard(slug) : null
  const { copiedKey, copy } = useCopyFeedback()

  if (!card) return <Navigate to="/" replace />

  // Order is deliberate: LinkedIn, X, GitHub.
  const socials = [
    card.linkedin && { key: 'linkedin', href: card.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    card.x && { key: 'x', href: card.x, label: 'X', Icon: XIcon },
    card.github && { key: 'github', href: card.github, label: 'GitHub', Icon: GitHubIcon },
  ].filter((s): s is { key: string; href: string; label: string; Icon: typeof GitHubIcon } => Boolean(s))

  return (
    <div className="min-h-screen bg-transparent text-white font-display">
      <SEO
        title={card.fullName}
        description={`${card.role} at ${card.company}. Save my contact details.`}
        url={`/contact/${card.slug}`}
        noIndex
      />

      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background glows — same treatment as the site's hero sections */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-md mx-auto px-6">
          <AnimateIn variant="fade-up">
            <div className="glass-card glass-card-static rounded-2xl p-8 text-center">
              <img
                src={card.photo ?? FALLBACK_PHOTO}
                alt={card.fullName}
                className={cn(
                  'w-32 h-32 mx-auto mb-5 rounded-full ring-2 ring-primary-500/30',
                  card.photo ? 'object-cover' : 'object-contain bg-white/5 p-5'
                )}
              />

              <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                {card.fullName}
              </h1>
              <p className="text-primary-400 text-sm font-medium mt-1.5">{card.role}</p>

              {/* Primary CTA: a plain link (no `download` attribute) so mobile
                  Safari/Chrome recognize the text/vcard response and offer the
                  native "Add Contact" sheet instead of just saving a file. */}
              <a
                href={`/contact/${card.slug}.vcf`}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'w-full h-12 px-8 mt-8 btn-glow flex items-center justify-center gap-2'
                )}
              >
                <Download className="w-5 h-5" />
                {t('Save Contact')}
              </a>

              {/* Act on the contact: dial / open the mail client. */}
              <div className="flex gap-3 mt-3">
                <a
                  href={`tel:${card.phone}`}
                  className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 gap-2')}
                >
                  <Phone className="w-4 h-4" />
                  {t('Call')}
                </a>
                <a
                  href={`mailto:${card.email}`}
                  className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 gap-2')}
                >
                  <Mail className="w-4 h-4" />
                  {t('Email')}
                </a>
              </div>

              {/* The written-out values copy on tap, so the number/address can
                  be pasted anywhere — mono keeps digits evenly spaced and makes
                  a misread character (0/O, 1/l) much less likely. */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                {([
                  { key: 'phone', value: card.phone, display: card.phoneDisplay, Icon: Phone },
                  { key: 'email', value: card.email, display: card.email, Icon: Mail },
                ] as const).map(({ key, value, display, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => copy(value, key)}
                    aria-label={`${t('Copy')} ${display}`}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 text-primary-400 shrink-0" />
                    <span className="font-mono text-sm text-slate-300 truncate flex-1">{display}</span>
                    {copiedKey === key ? (
                      <Check className="w-4 h-4 text-primary-400 shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {socials.length > 0 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  {socials.map(({ key, href, label, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
