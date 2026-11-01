import { Boxes, Cloud, Code2, Cpu, Smartphone } from 'lucide-react'
import type { FeatureStatus } from '../../config/site'
import { Reveal, SectionHeading } from '../ui/Reveal'
import { StatusBadge } from '../ui/StatusBadge'
import { TiltCard } from '../ui/TiltCard'

const items: {
  icon: typeof Cloud
  name: string
  body: string
  status: FeatureStatus
  span?: string
}[] = [
  {
    icon: Cpu,
    name: 'HEXA AI',
    body: 'Our intelligent voice assistant hardware.',
    status: 'in-development',
    span: 'lg:col-span-2',
  },
  { icon: Boxes, name: 'HEXA OS', body: 'Our embedded software platform.', status: 'planned' },
  { icon: Cloud, name: 'HEXA Cloud', body: 'Our cloud infrastructure.', status: 'planned' },
  { icon: Code2, name: 'HEXA API', body: 'Our developer interface.', status: 'concept' },
  {
    icon: Smartphone,
    name: 'HEXA APP',
    body: 'Our planned mobile companion application.',
    status: 'planned',
  },
]

export function Ecosystem() {
  return (
    <section aria-labelledby="eco-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Ecosystem"
          title={
            <span id="eco-title">
              The <span className="text-gradient">HEXA</span> ecosystem
            </span>
          }
          description="A planned technology ecosystem. Concepts and planned services are clearly marked — none are presented as available until they ship."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, name, body, status, span }, i) => (
            <Reveal as="li" key={name} delay={(i % 3) * 0.08} className={span}>
              <TiltCard max={5}>
                <div className="relative flex h-full min-h-[220px] flex-col justify-between gap-8 p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-electric/15 blur-3xl transition-all duration-700 group-hover:bg-electric/30"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sky transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <StatusBadge status={status} />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wide">{name}</h3>
                    <p className="mt-2 text-[15px] text-mute">{body}</p>
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
