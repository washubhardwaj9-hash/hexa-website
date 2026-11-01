import { Cloud, Cpu, Languages, MessagesSquare, Smartphone, UserRound } from 'lucide-react'
import type { FeatureStatus } from '../../config/site'
import { Reveal, SectionHeading } from '../ui/Reveal'
import { StatusBadge } from '../ui/StatusBadge'
import { TiltCard } from '../ui/TiltCard'

const features: {
  icon: typeof Cloud
  title: string
  body: string
  status: FeatureStatus
}[] = [
  {
    icon: MessagesSquare,
    title: 'Intelligent Conversations',
    body: 'Natural AI-powered voice interaction.',
    status: 'in-development',
  },
  {
    icon: Languages,
    title: 'Your Language',
    body: 'Designed for multilingual conversations, including Hindi and English.',
    status: 'in-development',
  },
  {
    icon: UserRound,
    title: 'HEXA Identity',
    body: 'Customize how your personal HEXA assistant addresses you.',
    status: 'in-development',
  },
  {
    icon: Smartphone,
    title: 'HEXA Connect',
    body: 'A companion application concept for device configuration and personalization.',
    status: 'concept',
  },
  {
    icon: Cpu,
    title: 'Premium Hardware',
    body: 'Purpose-designed hardware with an elegant physical design.',
    status: 'in-development',
  },
  {
    icon: Cloud,
    title: 'HEXA Cloud',
    body: 'Our planned cloud platform for connecting devices and AI services.',
    status: 'planned',
  },
]

export function Features() {
  return (
    <section aria-labelledby="features-title" className="section-y relative">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <span id="features-title">
              Built around <span className="text-gradient">you</span>
            </span>
          }
          description="Six ideas that shape how HEXA AI is being designed."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body, status }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 0.08}>
              <TiltCard>
                <div className="flex h-full flex-col gap-5 p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric/30 to-electric/5 text-sky ring-1 ring-electric/30">
                      <Icon size={25} strokeWidth={1.6} />
                    </span>
                    <span className="font-display text-sm tracking-widest text-white/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-mute">{body}</p>
                  <div className="mt-auto pt-2">
                    <StatusBadge status={status} />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
