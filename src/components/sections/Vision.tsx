import { motion, useReducedMotion } from 'framer-motion'
import { useMotionPrefs } from '../../hooks/useMotionPrefs'
import { Reveal } from '../ui/Reveal'

export function Vision() {
  const reduce = useReducedMotion()
  const { ambient } = useMotionPrefs()
  return (
    <section
      id="vision"
      aria-labelledby="vision-title"
      className="section-y relative isolate overflow-hidden bg-panel"
    >
      {/* Futuristic animated background: rotating hex rings + drifting glow */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div
          className={`absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.16] blur-[110px] ${
            ambient ? 'animate-drift' : ''
          }`}
        />
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            viewBox="0 0 100 100"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${55 + i * 28}vmin`, height: `${55 + i * 28}vmin`, opacity: 0.35 - i * 0.08 }}
            animate={reduce || !ambient ? undefined : { rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 90 + i * 40, repeat: Infinity, ease: 'linear' }}
          >
            <polygon
              points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
              fill="none"
              stroke="#69B5FF"
              strokeWidth="0.2"
              strokeDasharray={i === 1 ? '1 2' : undefined}
            />
          </motion.svg>
        ))}
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow">Our vision</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="vision-title"
              className="h-display mt-6 text-[2.2rem] sm:text-6xl lg:text-7xl"
            >
              We are building <span className="text-gradient">more than a product.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-9 max-w-2xl text-lg leading-[1.75] text-mute sm:text-xl">
              At HEXA Technologies, we believe artificial intelligence should feel natural, accessible
              and personal. Our mission is to bring intelligent technology closer to everyday life
              through thoughtful hardware, software and connected experiences.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mx-auto mt-14 flex items-center justify-center gap-4" aria-hidden>
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-sky/70" />
              <span className="h-2 w-2 rotate-45 bg-electric shadow-glow" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-sky/70" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
