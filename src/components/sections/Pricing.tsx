import { ArrowRight, Info } from 'lucide-react'
import { openContact } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { LogoMark } from '../ui/Logo'
import { Reveal, SectionHeading } from '../ui/Reveal'

export function Pricing() {
  return (
    <section aria-labelledby="pricing-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <span id="pricing-title">
              Premium AI. <span className="text-gradient">Accessible technology.</span>
            </span>
          }
        />

        <Reveal className="mx-auto mt-16 max-w-3xl" delay={0.1}>
          <div className="relative overflow-hidden rounded-[2rem] p-px [background:linear-gradient(140deg,rgba(105,181,255,0.7),rgba(255,255,255,0.06)_35%,rgba(40,123,255,0.5))]">
            <div className="glass relative overflow-hidden rounded-[calc(2rem-1px)] bg-panel/90 px-6 py-12 text-center sm:px-14 sm:py-16">
              <div aria-hidden className="absolute left-1/2 top-0 h-56 w-[70%] -translate-x-1/2 rounded-full bg-electric/25 blur-[90px]" />

              <div className="relative flex flex-col items-center">
                <LogoMark size={52} />
                <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-[0.2em]">HEXA AI</h3>

                <p className="mt-9 text-[11px] font-medium uppercase tracking-[0.3em] text-sky">
                  Planned target price
                </p>
                <p className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-7xl">
                  <span className="text-lg font-medium uppercase tracking-[0.2em] text-mute sm:text-xl">
                    Under{' '}
                  </span>
                  <span className="text-gradient">₹4,999</span>
                </p>

                <p className="mt-6 text-lg text-white/90">Premium AI. Accessible technology.</p>

                <p className="mx-auto mt-7 flex max-w-md items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-[13px] leading-relaxed text-mute">
                  <Info size={16} className="mt-0.5 shrink-0 text-sky" aria-hidden />
                  This is an expected target price, not a confirmed retail price. Final pricing will
                  be announced officially. No payment is taken on this website.
                </p>

                <div className="mt-10">
                  <Button
                    icon={<ArrowRight size={16} />}
                    onClick={() =>
                      openContact({ category: 'General Enquiries', subject: 'Early access to HEXA AI' })
                    }
                  >
                    Get early access
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
