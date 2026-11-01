import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Mic, ScanSearch, Volume2 } from 'lucide-react'
import { Reveal, SectionHeading } from '../ui/Reveal'

const steps = [
  { n: '01', icon: Mic, title: 'Speak', body: 'Talk naturally to HEXA.' },
  { n: '02', icon: ScanSearch, title: 'Understand', body: 'HEXA processes your request through its AI system.' },
  { n: '03', icon: Brain, title: 'Think', body: 'The AI engine prepares an intelligent response.' },
  { n: '04', icon: Volume2, title: 'Respond', body: 'HEXA answers through its voice interface.' },
]

export function HowItWorks() {
  const reduce = useReducedMotion()
  return (
    <section
      id="technology"
      aria-labelledby="how-title"
      className="section-y relative overflow-hidden bg-panel"
    >
      <div aria-hidden className="absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[110px]" />
      </div>
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Technology"
          title={
            <span id="how-title">
              How <span className="text-gradient">HEXA</span> works
            </span>
          }
          description="Four steps from your voice to HEXA's response."
        />

        <div className="relative mt-20">
          {/* Connecting line — horizontal on desktop */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-electric via-sky to-electric shadow-[0_0_12px_rgba(40,123,255,0.9)]"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: reduce ? 0 : 2.2, ease: 'easeInOut' }}
            />
          </div>
          {/* Vertical on mobile */}
          <div aria-hidden className="absolute bottom-8 left-8 top-8 w-px bg-white/10 lg:hidden">
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-electric via-sky to-electric"
              initial={{ scaleY: reduce ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: reduce ? 0 : 2, ease: 'easeInOut' }}
            />
          </div>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map(({ n, icon: Icon, title, body }, i) => (
              <Reveal as="li" key={n} delay={reduce ? 0 : i * 0.25}>
                <div className="flex items-start gap-6 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-electric/50 bg-ink text-sky shadow-glow">
                    <Icon size={26} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-display text-xs tracking-[0.3em] text-electric">{n}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-[260px] text-[15px] leading-relaxed text-mute">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
