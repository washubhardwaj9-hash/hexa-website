import { LogoMark } from './Logo'

/**
 * Abstract brand visual (glowing rings + HEXA mark).
 * Used ONLY as a stand-in while real product photos are not yet in /public/images/product.
 * It is intentionally not a depiction of the device, so no product details are invented.
 */
export function BrandOrb({ label, showHint }: { label?: string; showHint?: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div aria-hidden className="absolute h-[70%] w-[70%] rounded-full bg-electric/25 blur-[70px]" />
      {[100, 78, 56].map((s, i) => (
        <div
          key={s}
          aria-hidden
          className="absolute rounded-full border border-sky/20"
          style={{ width: `${s}%`, height: `${s}%`, opacity: 1 - i * 0.2 }}
        />
      ))}
      <div
        aria-hidden
        className="absolute h-[56%] w-[56%] animate-pulseRing rounded-full border border-electric/50"
      />
      <div className="relative flex flex-col items-center gap-3">
        <LogoMark size={92} />
        {label && (
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-mute">{label}</span>
        )}
        {import.meta.env.DEV && showHint && (
          <span className="max-w-[240px] rounded-md border border-dashed border-sky/40 px-2 py-1 text-center text-[10px] text-sky/80">
            DEV hint: add {showHint}
          </span>
        )}
      </div>
    </div>
  )
}
