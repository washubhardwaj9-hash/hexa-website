import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NAV_ITEMS, SECTION_IDS } from '../../config/site'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { handleAnchorClick } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: reduce ? 0 : -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-[68px] items-center justify-between sm:h-20"
        >
          <a
            href="#home"
            onClick={(e) => {
              handleAnchorClick(e, '#home')
              setOpen(false)
            }}
            aria-label="HEXA Technologies — home"
            className="rounded-lg"
          >
            <Logo compact />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative py-2 text-[13px] font-medium tracking-wide transition-colors ${
                      isActive ? 'text-white' : 'text-mute hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-electric to-sky transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href="#hexa-ai" className="!min-h-[42px] !px-5 !py-2 !text-[11px]">
                Explore HEXA AI
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="panel"
              id="mobile-menu"
              aria-label="Mobile menu"
              className="fixed inset-y-0 right-0 z-40 flex w-[min(86vw,380px)] flex-col border-l border-white/10 bg-panel/95 px-7 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: reduce ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.12 + i * 0.06, duration: 0.5 }}
                    className="border-b border-white/[0.07]"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        handleAnchorClick(e, item.href)
                        setOpen(false)
                      }}
                      className={`flex min-h-[56px] items-center justify-between font-display text-2xl font-semibold ${
                        active === item.id ? 'text-sky' : 'text-white'
                      }`}
                    >
                      {item.label}
                      <ArrowRight size={18} className="text-mute" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  href="#hexa-ai"
                  className="w-full"
                  magnetic={false}
                  onClick={() => setOpen(false)}
                >
                  Explore HEXA AI
                </Button>
                <p className="mt-6 text-center text-[11px] uppercase tracking-[0.3em] text-mute">
                  Your voice. Your world.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
