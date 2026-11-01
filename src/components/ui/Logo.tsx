type Props = { size?: number; className?: string; title?: string }

/** HEXA brand mark: a hexagon with an H monogram. Pure SVG, no assets needed. */
export function LogoMark({ size = 36, className, title = 'HEXA' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="hexa-lg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#69B5FF" />
          <stop offset="1" stopColor="#287BFF" />
        </linearGradient>
      </defs>
      <path
        d="M32 5 56 18.5v27L32 59 8 45.5v-27z"
        stroke="url(#hexa-lg)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M23 22v20M41 22v20M23 32h18" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={compact ? 30 : 36} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-bold tracking-[0.22em] text-white">HEXA</span>
        <span className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.34em] text-mute">
          Technologies
        </span>
      </span>
    </span>
  )
}
