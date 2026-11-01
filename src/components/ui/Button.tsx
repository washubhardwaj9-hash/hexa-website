import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { useMotionPrefs } from '../../hooks/useMotionPrefs'
import { handleAnchorClick } from '../../lib/scroll'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  type?: 'button' | 'submit'
  disabled?: boolean
  icon?: ReactNode
  magnetic?: boolean
  className?: string
  external?: boolean
}

const base =
  'relative inline-flex min-h-[48px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3 text-[12.5px] font-semibold uppercase tracking-[0.18em] transition-[box-shadow,border-color,background-color,opacity] duration-300 select-none disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary:
    'bg-electric text-white shadow-glow hover:shadow-glow-lg before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700',
  ghost:
    'border border-white/20 bg-white/[0.03] text-white backdrop-blur hover:border-sky/70 hover:bg-white/[0.08]',
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled,
  icon,
  magnetic = true,
  className = '',
  external,
}: Props) {
  const { interactive } = useMotionPrefs()
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.34)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const cls = `${base} ${variants[variant]} ${className}`
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon}
      </span>
    </>
  )
  const motionProps = {
    style: { x: sx, y: sy },
    onPointerMove: onMove,
    onPointerLeave: reset,
    whileTap: { scale: 0.96 },
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={(e) => {
          handleAnchorClick(e, href)
          onClick?.(e)
        }}
        {...motionProps}
      >
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={cls}
      onClick={onClick}
      {...motionProps}
    >
      {inner}
    </motion.button>
  )
}
