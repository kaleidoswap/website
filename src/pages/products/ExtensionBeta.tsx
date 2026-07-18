// src/pages/products/ExtensionBeta.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Mail, Shield } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; 'error-callback'?: () => void; theme?: string }
      ) => string
      reset: (widgetId?: string) => void
    }
  }
}

interface FormState {
  email: string
  name: string
  company: string
  intended_use: string
  telegram: string
  nostr: string
}

const INITIAL: FormState = {
  email: '',
  name: '',
  company: '',
  intended_use: '',
  telegram: '',
  nostr: '',
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const errorMessages: Record<string, string> = {
  invalid_email: 'Please enter a valid email address.',
  invalid_name: 'Please enter your name.',
  invalid_intended_use: 'Please tell us how you plan to use the beta.',
  invalid_company: 'Company name is too long.',
  invalid_telegram: 'Telegram handle is too long.',
  invalid_nostr: 'Nostr identifier is too long.',
  missing_turnstile: 'Please complete the human verification.',
  turnstile_failed: 'Human verification failed. Please try again.',
  db_error: 'Something went wrong on our side. Please try again later.',
  invalid_json: 'Invalid request. Please refresh and try again.',
  method_not_allowed: 'Invalid request.',
}

export const ExtensionBeta = () => {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return

    const scriptId = 'cf-turnstile-script'
    const ensureScript = (): Promise<void> =>
      new Promise((resolve) => {
        if (document.getElementById(scriptId)) {
          resolve()
          return
        }
        const s = document.createElement('script')
        s.id = scriptId
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        s.async = true
        s.defer = true
        s.onload = () => resolve()
        document.head.appendChild(s)
      })

    let cancelled = false
    void ensureScript().then(() => {
      if (cancelled || !turnstileContainerRef.current || !window.turnstile) return
      widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (token) => setTurnstileToken(token),
        'error-callback': () => setTurnstileToken(''),
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status.kind === 'submitting') return

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus({ kind: 'error', message: errorMessages.missing_turnstile })
      return
    }

    setStatus({ kind: 'submitting' })
    try {
      const res = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, turnstile_token: turnstileToken }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && data.ok) {
        setStatus({ kind: 'success' })
        setForm(INITIAL)
        return
      }
      const msg = (data.error && errorMessages[data.error]) || 'Something went wrong. Please try again.'
      setStatus({ kind: 'error', message: msg })
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
        setTurnstileToken('')
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please try again.' })
    }
  }

  const inputClass =
    'w-full bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition-colors'

  return (
    <div className="min-h-screen bg-transparent text-white font-display">
      <SEO
        title="KaleidoSwap Extension — Beta Access"
        description="Apply for early access to the KaleidoSwap browser extension beta. Multi-protocol Bitcoin wallet for Chrome — mainnet (Spark, Arkade) and RLN testnets."
        url="/products/extension/beta"
        noIndex
      />

      <Navbar />

      <section className="pt-24 pb-8 sm:pt-32 sm:pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/15 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <Link
            to="/products/extension"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-5 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to KaleidoSwap Extension
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-3 sm:mb-4">
            Apply for KaleidoSwap Extension Beta access
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
            Beta covers mainnet (Spark, Arkade) and RLN testnets (regtest, mutinynet). We'll review your
            request and email you a Proton Drive link with the extension package and an install guide.
          </p>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          {status.kind === 'success' ? (
            <div className="glass-card rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">You're on the list</h2>
              <p className="text-slate-400 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                Thanks for applying. We'll review your request and email you a download link if you're selected
                for the beta cohort.
              </p>
              <Link to="/products/extension" className="inline-block w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">Back to KaleidoSwap Extension</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={200}
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputClass}
                    placeholder="Satoshi Nakamoto"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Company <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  maxLength={200}
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  className={inputClass}
                  placeholder="Company or project name"
                />
              </div>

              <div>
                <label htmlFor="intended_use" className="block text-sm font-medium text-slate-300 mb-1.5">
                  How do you plan to use the beta? <span className="text-purple-400">*</span>
                </label>
                <textarea
                  id="intended_use"
                  required
                  maxLength={2000}
                  rows={4}
                  value={form.intended_use}
                  onChange={(e) => update('intended_use', e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Trader, developer, integrator, curious user… tell us a bit about your use case and which protocols you care about (Spark, Arkade, RGB Lightning, etc.)."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="telegram" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Telegram <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <input
                    id="telegram"
                    type="text"
                    maxLength={100}
                    value={form.telegram}
                    onChange={(e) => update('telegram', e.target.value)}
                    className={inputClass}
                    placeholder="@handle"
                  />
                </div>
                <div>
                  <label htmlFor="nostr" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Nostr <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <input
                    id="nostr"
                    type="text"
                    maxLength={200}
                    value={form.nostr}
                    onChange={(e) => update('nostr', e.target.value)}
                    className={inputClass}
                    placeholder="npub1… or NIP-05"
                  />
                </div>
              </div>

              {TURNSTILE_SITE_KEY ? (
                <div ref={turnstileContainerRef} className="flex justify-start" />
              ) : (
                <p className="text-xs text-amber-400/80">
                  Turnstile site key is not configured (set <code>VITE_TURNSTILE_SITE_KEY</code>). The form will
                  still submit but the backend will reject it.
                </p>
              )}

              {status.kind === 'error' && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {status.message}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-2">
                <p className="text-xs text-slate-500 flex items-start sm:items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />
                  <span>We only use your details to review and contact you about the beta.</span>
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status.kind === 'submitting'}
                  className="bg-purple-500 hover:bg-purple-600 w-full sm:w-auto justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {status.kind === 'submitting' ? 'Submitting…' : 'Apply for Beta'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
