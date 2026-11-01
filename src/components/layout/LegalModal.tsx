import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export type LegalDoc = 'privacy' | 'terms' | null

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        h: 'Overview',
        p: 'This website is an informational website for HEXA Technologies. It does not process payments and does not require an account.',
      },
      {
        h: 'Information you provide',
        p: 'If you use the contact form and a contact service has been connected, the details you enter (name, email address, category, subject and message) are sent to that service so we can respond to you.',
      },
      {
        h: 'Cookies & analytics',
        p: 'This site does not set tracking cookies by default. If analytics are added later, this policy will be updated.',
      },
      {
        h: 'Your choices',
        p: 'You can ask us to access or delete any personal information you have sent us by contacting us through the contact section.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      {
        h: 'Use of this website',
        p: 'The content on this website is provided for general information about HEXA Technologies and its products and services.',
      },
      {
        h: 'Product information',
        p: 'HEXA AI and the wider HEXA ecosystem are in development. Features, specifications, availability and the target price shown here are plans and may change. Nothing on this website is an offer for sale.',
      },
      {
        h: 'Intellectual property',
        p: 'The HEXA name, logo and website content are the property of HEXA Technologies and may not be reused without permission.',
      },
      {
        h: 'Changes',
        p: 'We may update these terms from time to time. Continued use of the website means you accept the updated terms.',
      },
    ],
  },
} as const

/**
 * NOTE: this is starter text, not legal advice. Have it reviewed by a qualified
 * lawyer and replace it with your final policies before launch.
 */
export function LegalModal({ doc, onClose }: { doc: LegalDoc; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!doc) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [doc, onClose])

  const content = doc ? DOCS[doc] : null

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-panel/95 p-7 sm:rounded-[2rem] sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="legal-title" className="font-display text-2xl font-bold uppercase tracking-wide">
                {content.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 hover:border-sky"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-3 rounded-lg border border-amber-300/20 bg-amber-300/5 px-3 py-2 text-xs text-amber-100/90">
              Draft starter text — to be reviewed and finalised before launch.
            </p>
            <div className="mt-6 space-y-6">
              {content.sections.map((s) => (
                <section key={s.h}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky">{s.h}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.p}</p>
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
