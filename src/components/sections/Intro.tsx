import { motion, useReducedMotion } from 'framer-motion'
import { AudioLines, Cpu, Languages, Smartphone, UserRound, Wifi } from 'lucide-react'
import { PRODUCT_IMAGES } from '../../config/site'
import type { FeatureStatus } from '../../config/site'
import { BrandOrb } from '../ui/BrandOrb'
import { ClipReveal, Reveal, SectionHeading } from '../ui/Reveal'
import { ProductImage } from '../ui/ProductImage'
import { StatusBadge } from '../ui/StatusBadge'

/**
 * STATUS NOTE: statuses below are conservative defaults. Change a status to
 * 'available' ONLY once the capability is implemented and tested.
 * The type currently models: concept | planned | in-development.
 */
const highlights: { icon: typeof AudioLines; title: string; status: FeatureStatus }[] = [
  { icon: AudioLines, title: 'Intelligent voice conversations', status: 'in-development' },
  { icon: Languages, title: 'Hindi and English interaction', status: 'in-development' },
  { icon: UserRound, title: 'Personalized owner identity', status: 'in-development' },
  { icon: Cpu, title: 'Premium hardware design', status: 'in-development' },
  { icon: Wifi, title: 'Connected AI experience', status: 'planned' },
  { icon: Smartphone, title: 'Companion mobile application', status: 'planned' },
]

export function Intro() {
  const reduce = useReducedMotion()
  return (
    <section
      id="hexa-ai"
      aria-labelledby="intro-title"
      className="section-y relative overflow-hidden bg-gradient-to-b from-ink via-panel to-ink"
    >
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The product"
              title={
                <span id="intro-title">
                  Introducing <span className="text-gradient">HEXA AI</span>
                </span>
              }
              description="Not just another voice assistant. A more personal way to experience artificial intelligence."
            />

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, status }, i) => (
                <Reveal as="li" key={title} delay={0.05 * i} y={18}>
                  <div className="glass flex h-full items-start gap-4 rounded-2xl p-4 transition-colors duration-300 hover:border-electric/40">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-sky">
                      <Icon size={19} />
                    </span>
                    <div className="flex flex-col items-start gap-2">
                      <span className="text-[14px] font-medium leading-snug">{title}</span>
                      <StatusBadge status={status} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <p className="mt-5 text-xs leading-relaxed text-mute/80">
                Features are labelled by their real stage of development. We only call something
                available once it has been built and tested.
              </p>
            </Reveal>
          </div>

          <ClipReveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_50%_35%,#10244a_0%,#070a10_70%)]">
              <motion.div
                className="absolute inset-0"
                whileHover={reduce ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductImage
                  src={PRODUCT_IMAGES.front}
                  alt="HEXA AI, front view"
                  className="h-full w-full"
                  imgClassName="object-cover"
                  fallback={<BrandOrb label="HEXA AI" showHint="public/images/product/hexa-ai-front.jpg" />}
                />
              </motion.div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_80px_rgba(5,6,8,0.8)]"
              />
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}
