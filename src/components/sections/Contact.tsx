import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { SITE } from '../../config/site'
import { Button } from '../ui/Button'
import { Reveal, SectionHeading } from '../ui/Reveal'

const CATEGORIES = [
  'Business Enquiries',
  'Retailer Partnerships',
  'Technology Partnerships',
  'General Enquiries',
] as const

type Values = { name: string; email: string; category: string; subject: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'unconfigured' }
  | { kind: 'error'; message: string }

const EMPTY: Values = { name: '', email: '', category: CATEGORIES[3], subject: '', message: '' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!CATEGORIES.includes(v.category as (typeof CATEGORIES)[number])) e.category = 'Please choose a category.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (v.message.trim().length < 10) e.message = 'Please write at least 10 characters.'
  else if (v.message.length > 3000) e.message = 'Please keep your message under 3000 characters.'
  return e
}

export function Contact() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [honeypot, setHoneypot] = useState('')

  // Other sections (pricing, coming soon) can prefill the form.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<{ category?: string; subject?: string }>).detail
      setValues((v) => ({
        ...v,
        category: d.category && CATEGORIES.includes(d.category as (typeof CATEGORIES)[number]) ? d.category : v.category,
        subject: d.subject ?? v.subject,
      }))
    }
    window.addEventListener('hexa:prefill', onPrefill)
    return () => window.removeEventListener('hexa:prefill', onPrefill)
  }, [])

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...values, [k]: val }
    setValues(next)
    if (touched[k]) setErrors(validate(next))
    if (status.kind !== 'idle' && status.kind !== 'sending') setStatus({ kind: 'idle' })
  }
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, category: true, subject: true, message: true })
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    if (honeypot) return // bot

    /**
     * INTEGRATION POINT — contact service.
     * Without VITE_CONTACT_ENDPOINT nothing is sent and we say so honestly.
     * Expected: a JSON POST returning a 2xx status on success.
     */
    if (!SITE.contactEndpoint) {
      setStatus({ kind: 'unconfigured' })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(SITE.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          category: values.category,
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })
      if (!res.ok) throw new Error(`Service responded with ${res.status}`)
      setStatus({ kind: 'sent' })
      setValues(EMPTY)
      setTouched({})
      setErrors({})
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not send your message. Please try again in a moment.',
      })
    }
  }

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined)
  const field = (k: keyof Values) => ({
    id: `field-${k}`,
    'aria-invalid': !!err(k),
    'aria-describedby': err(k) ? `err-${k}` : undefined,
    onBlur: () => blur(k),
  })
  const Err = ({ k }: { k: keyof Values }) =>
    err(k) ? (
      <p id={`err-${k}`} role="alert" className="mt-1.5 text-[13px] text-red-300">
        {err(k)}
      </p>
    ) : null

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative bg-panel">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title={
                <span id="contact-title">
                  Let's <span className="text-gradient">talk</span>
                </span>
              }
              description="Partnerships, retail, technology or general questions — choose a category and tell us how we can help."
            />
            {SITE.contactEmail && (
              <Reveal delay={0.2}>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="glass mt-10 inline-flex items-center gap-3 rounded-2xl px-5 py-4 text-sm transition-colors hover:border-electric/50"
                >
                  <Mail size={18} className="text-sky" />
                  {SITE.contactEmail}
                </a>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-label="Contact form"
              className="glass rounded-[2rem] p-6 sm:p-10"
            >
              <fieldset className="mb-7">
                <legend className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-mute">
                  Category
                </legend>
                <div className="flex flex-wrap gap-2.5" role="radiogroup">
                  {CATEGORIES.map((c) => {
                    const on = values.category === c
                    return (
                      <label
                        key={c}
                        className={`relative cursor-pointer rounded-full border px-4 py-2.5 text-[13px] transition-all duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-sky ${
                          on
                            ? 'border-electric bg-electric/20 text-white shadow-glow'
                            : 'border-white/12 text-mute hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={c}
                          checked={on}
                          onChange={() => set('category', c)}
                          className="sr-only"
                        />
                        {c}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-name" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-mute">
                    Full name
                  </label>
                  <input
                    {...field('name')}
                    className="input"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                  <Err k="name" />
                </div>
                <div>
                  <label htmlFor="field-email" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-mute">
                    Email address
                  </label>
                  <input
                    {...field('email')}
                    className="input"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  <Err k="email" />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="field-subject" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-mute">
                  Subject
                </label>
                <input
                  {...field('subject')}
                  className="input"
                  type="text"
                  placeholder="What is this about?"
                  value={values.subject}
                  onChange={(e) => set('subject', e.target.value)}
                />
                <Err k="subject" />
              </div>

              <div className="mt-5">
                <label htmlFor="field-message" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-mute">
                  Message
                </label>
                <textarea
                  {...field('message')}
                  className="input min-h-[150px] resize-y"
                  placeholder="Tell us more…"
                  value={values.message}
                  onChange={(e) => set('message', e.target.value)}
                />
                <Err k="message" />
              </div>

              {/* Honeypot — hidden from people, catches simple bots */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label>
                  Leave this field empty
                  <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
              </div>

              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  disabled={status.kind === 'sending'}
                  icon={
                    status.kind === 'sending' ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )
                  }
                >
                  {status.kind === 'sending' ? 'Sending' : 'Send message'}
                </Button>
              </div>

              <div aria-live="polite" className="mt-6 empty:hidden">
                <AnimatePresence mode="wait">
                  {status.kind === 'sent' && (
                    <motion.p
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200"
                    >
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                      Thank you — your message was delivered to the contact service.
                    </motion.p>
                  )}
                  {status.kind === 'unconfigured' && (
                    <motion.p
                      key="unconf"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100"
                    >
                      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                      <span>
                        Your message was <strong>not sent</strong> — the contact service isn't connected
                        yet.
                        {SITE.contactEmail ? (
                          <>
                            {' '}
                            Please email us at{' '}
                            <a className="underline" href={`mailto:${SITE.contactEmail}`}>
                              {SITE.contactEmail}
                            </a>
                            .
                          </>
                        ) : (
                          ' Please check back soon.'
                        )}
                      </span>
                    </motion.p>
                  )}
                  {status.kind === 'error' && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
                    >
                      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
