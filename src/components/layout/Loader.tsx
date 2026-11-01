import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { LogoMark } from '../ui/Logo'

/**
 * Brief branded intro (~1.8s, 0.5s with reduced motion).
 * Click, tap or any key skips it, so it never blocks access to the site.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const duration = reduce ? 500 : 1800

  useEffect(() => {
    const t = window.setTimeout(onDone, duration)
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', skip)
    }
  }, [duration, onDone])

  return (
    <motion.div
      key="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading HEXA Technologies"
      onClick={onDone}
      className="fixed inset-0 z-[90] flex cursor-pointer flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduce ? 1 : 1.04, filter: reduce ? 'none' : 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-full bg-electric/20 blur-[110px]"
      />

      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <LogoMark size={104} />
        {/* Electric-blue line passing through the logo */}
        {!reduce && (
          <div aria-hidden className="absolute inset-x-[-40%] top-1/2 h-[2px] -translate-y-1/2 overflow-hidden">
            <div className="h-full w-1/2 animate-scan bg-gradient-to-r from-transparent via-electric to-transparent shadow-[0_0_16px_3px_rgba(40,123,255,0.9)]" />
          </div>
        )}
      </motion.div>

      <motion.p
        className="relative mt-10 text-center text-[11px] font-medium uppercase tracking-[0.34em] text-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Initializing HEXA Experience...
      </motion.p>

      <div className="relative mt-5 h-px w-48 overflow-hidden bg-white/10" aria-hidden>
        <motion.div
          className="h-full bg-electric"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: duration / 1000, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
