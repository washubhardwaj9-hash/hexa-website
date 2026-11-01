import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { PRODUCT_IMAGES } from '../../config/site'
import { useMotionPrefs } from '../../hooks/useMotionPrefs'
import { BrandOrb } from '../ui/BrandOrb'
import { Button } from '../ui/Button'
import { Particles } from '../ui/Particles'
import { ProductImage } from '../ui/ProductImage'
import { scrollToId } from '../../lib/scroll'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const { interactive, ambient } = useMotionPrefs()

  // Mouse parallax (desktop, fine pointer only)
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const deviceX = useTransform(mx, (v) => v * 26)
  const deviceY = useTransform(my, (v) => v * 20)
  const deviceRY = useTransform(mx, (v) => v * 10)
  const deviceRX = useTransform(my, (v) => v * -8)
  const glowX = useTransform(mx, (v) => v * -40)
  const glowY = useTransform(my, (v) => v * -30)

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const line = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 40, filter: reduce ? 'none' : 'blur(10px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, delay: reduce ? 0 : delay, ease },
  })

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 sm:pt-32"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#0d1a33_0%,#050608_62%)]" />
        <div
          className={`absolute -left-[10%] top-[10%] h-[55vmax] w-[55vmax] rounded-full bg-electric/[0.12] blur-[120px] ${
            ambient ? 'animate-drift' : ''
          }`}
        />
        <div className="grid-bg absolute inset-0" />
        <Particles />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Copy */}
        <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          <motion.span
            {...line(0.1)}
            className="eyebrow mb-6 justify-center lg:justify-start"
          >
            HEXA Technologies
          </motion.span>

          <h1
            id="hero-title"
            className="h-display text-[2.7rem] sm:text-7xl xl:text-[5.6rem]"
          >
            <motion.span {...line(0.2)} className="block">
              The future
            </motion.span>
            <motion.span {...line(0.35)} className="text-gradient block">
              speaks HEXA.
            </motion.span>
          </h1>

          <motion.p
            {...line(0.55)}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-mute sm:text-lg lg:mx-0"
          >
            Meet a new generation of intelligent voice technology. Designed to make AI feel more
            personal, natural and accessible.
          </motion.p>

          <motion.div
            {...line(0.7)}
            className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center lg:justify-start"
          >
            <Button href="#hexa-ai" icon={<ArrowRight size={16} />}>
              Explore HEXA AI
            </Button>
            <Button href="#vision" variant="ghost">
              Discover our vision
            </Button>
          </motion.div>
        </div>

        {/* Device visual */}
        <div className="relative order-1 mx-auto w-full max-w-[340px] sm:max-w-[460px] lg:order-2 lg:max-w-[560px]">
          <motion.div
            aria-hidden
            style={interactive ? { x: glowX, y: glowY } : undefined}
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(40,123,255,0.38)_0%,rgba(40,123,255,0.08)_45%,transparent_68%)]" />
            <div className="absolute inset-[12%] rounded-full border border-sky/20" />
            <div className="absolute inset-[22%] animate-pulseRing rounded-full border border-electric/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.86, y: reduce ? 0 : 40 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.3, delay: reduce ? 0 : 0.3, ease }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={
                interactive
                  ? { x: deviceX, y: deviceY, rotateY: deviceRY, rotateX: deviceRX }
                  : undefined
              }
              animate={ambient ? { y: [0, -14, 0] } : undefined}
              transition={ambient ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : undefined}
            >
              <ProductImage
                src={PRODUCT_IMAGES.hero}
                alt="HEXA AI voice assistant device"
                eager
                className="aspect-square w-full"
                imgClassName="object-contain drop-shadow-[0_40px_60px_rgba(40,123,255,0.35)]"
                fallback={<BrandOrb showHint="public/images/product/hexa-ai-hero.png" />}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to HEXA AI"
        onClick={() => scrollToId('hexa-ai')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute transition-colors hover:text-white sm:flex"
      >
        Scroll
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/25 pt-2">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-sky"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <ChevronDown size={14} className="-mt-1" />
      </motion.button>
    </section>
  )
}
