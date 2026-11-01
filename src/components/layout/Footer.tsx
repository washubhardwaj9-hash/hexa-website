import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { NAV_ITEMS, SITE } from '../../config/site'
import { handleAnchorClick } from '../../lib/scroll'
import { LogoMark } from '../ui/Logo'
import type { LegalDoc } from './LegalModal'

const socials = [
  { name: 'Instagram', icon: Instagram, url: SITE.socials.instagram },
  { name: 'YouTube', icon: Youtube, url: SITE.socials.youtube },
  { name: 'LinkedIn', icon: Linkedin, url: SITE.socials.linkedin },
]

export function Footer({ onOpenLegal }: { onOpenLegal: (d: Exclude<LegalDoc, null>) => void }) {
  const linkCls = 'text-sm text-mute transition-colors hover:text-white'
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink pb-10 pt-20">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
      <div aria-hidden className="absolute -bottom-40 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-electric/10 blur-[110px]" />

      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <p className="font-display text-xl font-bold tracking-[0.2em]">HEXA TECHNOLOGIES</p>
            </div>
            <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.34em] text-sky">
              Your voice. Your world.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a href={n.href} onClick={(e) => handleAnchorClick(e, n.href)} className={linkCls}>
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => onOpenLegal('privacy')} className={linkCls}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenLegal('terms')} className={linkCls}>
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-mute">Follow</p>
            <ul className="flex gap-3">
              {socials.map(({ name, icon: Icon, url }) => (
                <li key={name}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mute transition hover:border-sky hover:text-white hover:shadow-glow"
                    >
                      <Icon size={18} />
                    </a>
                  ) : (
                    <span
                      role="img"
                      aria-label={`${name} — coming soon`}
                      title={`${name} — coming soon`}
                      className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-white/10 text-mute/40"
                    >
                      <Icon size={18} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {socials.every((s) => !s.url) && (
              <p className="mt-3 text-[11px] text-mute/70">Social profiles coming soon.</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-8 text-xs text-mute sm:flex-row">
          <p>© 2026 HEXA Technologies. All Rights Reserved.</p>
          <p className="tracking-[0.2em]">YOUR VOICE. YOUR WORLD.</p>
        </div>
      </div>
    </footer>
  )
}
