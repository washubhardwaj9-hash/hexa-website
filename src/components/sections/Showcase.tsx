import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Box, ChevronLeft, ChevronRight, Lightbulb, PackageOpen, Smartphone, Unplug } from 'lucide-react'
import { useCallback, useState } from 'react'
import { PRODUCT_IMAGES } from '../../config/site'
import { ProductImage } from '../ui/ProductImage'
import { SectionHeading } from '../ui/Reveal'

const slides = [
  { key: 'front', label: 'Front view', icon: Box, src: PRODUCT_IMAGES.front },
  { key: 'side', label: 'Side view', icon: Smartphone, src: PRODUCT_IMAGES.side },
  { key: 'led', label: 'LED lighting close-up', icon: Lightbulb, src: PRODUCT_IMAGES.led },
  { key: 'unboxing', label: 'Packaging & unboxing', icon: PackageOpen, src: PRODUCT_IMAGES.unboxing },
  { key: 'accessories', label: 'Complete accessories', icon: Unplug, src: PRODUCT_IMAGES.accessories },
] as const

function StudioFallback({ label, Icon, file }: { label: string; Icon: typeof Box; file: string }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_50%_30%,#12295a_0%,#070a10_68%)] text-center">
      <div aria-hidden className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-electric/10 to-transparent" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-sky/30 bg-white/[0.03] text-sky">
        <Icon size={26} strokeWidth={1.4} />
      </span>
      <p className="relative font-display text-lg font-semibold uppercase tracking-widest">{label}</p>
      <p className="relative text-xs uppercase tracking-[0.25em] text-mute">Photography coming soon</p>
      {import.meta.env.DEV && (
        <p className="relative rounded-md border border-dashed border-sky/40 px-2 py-1 text-[10px] text-sky/80">
          DEV hint: add {file}
        </p>
      )}
    </div>
  )
}

export function Showcase() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const n = (next + slides.length) % slides.length
      setDir(next > cur || (cur === slides.length - 1 && n === 0) ? 1 : -1)
      return n
    })
  }, [])

  const slide = slides[index]

  return (
    <section
      aria-labelledby="showcase-title"
      aria-roledescription="carousel"
      className="section-y relative overflow-hidden bg-panel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        if (e.key === 'ArrowLeft') go(index - 1)
      }}
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title={
            <span id="showcase-title">
              Product <span className="text-gradient">showcase</span>
            </span>
          }
          description="A closer look at HEXA AI, shown under studio light."
        />

        <div className="mt-14">
          <div
            className="group relative mx-auto aspect-[4/5] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-ink sm:aspect-[16/10]"
            aria-live="polite"
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={slide.key}
                custom={dir}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
                className="absolute inset-0 overflow-hidden"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 80, scale: reduce ? 1 : 1.04 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -80, scale: reduce ? 1 : 0.98 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(index + 1)
                  else if (info.offset.x > 70) go(index - 1)
                }}
              >
                <ProductImage
                  src={slide.src}
                  alt={`HEXA AI — ${slide.label}`}
                  className="h-full w-full overflow-hidden"
                  imgClassName="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.08]"
                  fallback={
                    <StudioFallback
                      label={slide.label}
                      Icon={slide.icon}
                      file={slide.src.replace('/images/', 'public/images/')}
                    />
                  }
                />
              </motion.div>
            </AnimatePresence>

            <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(5,6,8,0.7)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/90 to-transparent p-5 sm:p-8">
              <p className="font-display text-base font-semibold uppercase tracking-widest sm:text-lg">
                {slide.label}
              </p>
              <p className="text-xs tracking-[0.25em] text-mute">
                {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 backdrop-blur transition hover:border-sky hover:bg-ink sm:left-5"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/60 backdrop-blur transition hover:border-sky hover:bg-ink sm:right-5"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="mx-auto mt-6 flex max-w-5xl items-center justify-center gap-2.5" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.label}
                onClick={() => go(i)}
                className="group flex h-11 items-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-10 bg-electric shadow-glow' : 'w-5 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
