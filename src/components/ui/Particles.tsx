import { useEffect, useRef } from 'react'
import { useMotionPrefs } from '../../hooks/useMotionPrefs'

type Props = { count?: number; className?: string }

/** Lightweight canvas particle field. Skipped entirely on reduced-motion / low-power devices. */
export function Particles({ count = 46, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { ambient } = useMotionPrefs()

  useEffect(() => {
    if (!ambient) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number }
    let ps: P[] = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = w < 640 ? Math.round(count * 0.55) : count
      ps = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.22 + 0.04),
        a: Math.random() * 0.5 + 0.15,
        t: Math.random() * Math.PI * 2,
      }))
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        p.t += 0.015
        if (p.y < -4) {
          p.y = h + 4
          p.x = Math.random() * w
        }
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.t))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(105,181,255,${alpha})`
        ctx.shadowColor = 'rgba(40,123,255,0.9)'
        ctx.shadowBlur = 8
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const onVis = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(tick)
      else cancelAnimationFrame(raf)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ambient, count])

  if (!ambient) return null
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
