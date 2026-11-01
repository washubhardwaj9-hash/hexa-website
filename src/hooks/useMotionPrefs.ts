import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Returns whether heavy / decorative motion should be enabled.
 * Disabled for: prefers-reduced-motion, coarse pointers (touch), and
 * low-powered devices (few CPU cores or Save-Data on).
 */
export function useMotionPrefs() {
  const reduced = !!useReducedMotion()
  const [lowPower, setLowPower] = useState(false)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number
      connection?: { saveData?: boolean }
    }
    const cores = nav.hardwareConcurrency ?? 8
    const mem = nav.deviceMemory ?? 8
    setLowPower(cores <= 2 || mem <= 2 || !!nav.connection?.saveData)

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFinePointer(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return {
    reduced,
    lowPower,
    /** Mouse parallax / tilt / magnetic effects */
    interactive: !reduced && !lowPower && finePointer,
    /** Particles, drifting gradients, continuous loops */
    ambient: !reduced && !lowPower,
  }
}
