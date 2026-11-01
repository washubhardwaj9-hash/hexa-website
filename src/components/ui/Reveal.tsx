import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'h2' | 'h3'
}

/** Scroll-triggered fade + rise. Collapses to a plain fade for reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Masked image / block reveal — a wipe that uncovers the content. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)', opacity: reduce ? 0 : 1 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0.2 : 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
}) {
  const a = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${a}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="h-display text-[2.1rem] sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-base leading-relaxed text-mute sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
