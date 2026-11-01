import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMotionPrefs } from '../../hooks/useMotionPrefs'

type Props = {
  children: ReactNode
  className?: string
  max?: number
}

/** Glass card with subtle 3D tilt, a pointer-following glare and a glowing hover border. */
export function TiltCard({ children, className = '', max = 7 }: Props) {
  const { interactive } = useMotionPrefs()
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(105,181,255,0.16), transparent 60%)`

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`group glass relative h-full overflow-hidden rounded-3xl transition-[border-color,box-shadow] duration-500 hover:border-electric/60 hover:shadow-glow ${className}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <div className="relative h-full">{children}</div>
      </motion.div>
    </div>
  )
}
