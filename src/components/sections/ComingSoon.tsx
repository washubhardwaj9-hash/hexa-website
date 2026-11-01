import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SITE } from '../../config/site'
import { openContact } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

const items = ['HEXA AI', 'HEXA OS', 'HEXA Cloud', 'HEXA App']

function useCountdown(iso: string) {
  const target = iso ? new Date(iso).getTime() : NaN
  const valid = Number.isFinite(target)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!valid) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [valid])

  if (!valid) return null
  const diff = Math.max(0, target - now)
  return {
    done: diff === 0,
    parts: [
      { label: 'Days', value: Math.floor(diff / 86400000) },
      { label: 'Hours', value: Math.floor((diff / 3600000) % 24) },
      { label: 'Minutes', value: Math.floor((diff / 60000) % 60) },
      { label: 'Seconds', value: Math.floor((diff / 1000) % 60) },
    ],
  }
}

export function ComingSoon() {
  const reduce = useReducedMotion()
  const countdown = useCountdown(SITE.launchDate)

  return (
    <section aria-labelledby="soon-title" className="section-y relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(40,123,255,0.28),transparent_60%)]" />
      <div className="container-x text-center">
        <Reveal>
          <span className="eyebrow">Launch</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="soon-title" className="h-display mt-6 text-[2.2rem] sm:text-6xl lg:text-7xl">
            The next generation <span className="text-gradient">is coming.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-lg text-mute">Something intelligent is taking shape.</p>
        </Reveal>

        {/* Countdown only when a real launch date is configured */}
        {countdown && !countdown.done ? (
          <Reveal delay={0.24}>
            <div
              role="timer"
              aria-label="Time until launch"
              className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-3 sm:gap-5"
            >
              {countdown.parts.map((p) => (
                <div key={p.label} className="glass rounded-2xl px-2 py-5 sm:py-7">
                  <div className="font-display text-3xl font-bold tabular-nums sm:text-5xl">
                    {String(p.value).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-mute">{p.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.24}>
            <div className="mx-auto mt-12 flex items-center justify-center gap-3" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-electric"
                  animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-sky">Coming soon</p>
          </Reveal>
        )}

        <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {items.map((name, i) => (
            <Reveal as="li" key={name} delay={0.1 * i} y={16}>
              <div className="glass rounded-2xl px-3 py-5 transition-colors duration-300 hover:border-electric/50">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] sm:text-[15px]">
                  {name}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.3}>
          <div className="mt-14">
            <Button
              icon={<ArrowRight size={16} />}
              onClick={() => openContact({ category: 'General Enquiries', subject: 'Keep me updated' })}
            >
              Follow our journey
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
