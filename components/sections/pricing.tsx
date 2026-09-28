'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { SpotlightCard, Tilt } from '@/components/motion/interactive'
import { EASE, Reveal, SplitReveal } from '@/components/motion/primitives'
import { PremiumCta, SectionPill } from '@/components/ui/brand'
import { pricing } from '@/lib/content'
import { links } from '@/lib/site'

export function Pricing() {
  const { free, pro, academy } = pricing
  return (
    <section id="pricing" className="relative overflow-hidden py-[clamp(96px,13vw,180px)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[800px] w-[1200px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(92,255,176,0.06), transparent)' }}
      />
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionPill index="06">Pricing</SectionPill>
          </Reveal>
          <SplitReveal
            className="display-md mt-6 text-balance"
            lines={[['Simple, honest pricing.'], [{ text: 'Start free. Stay if it earns it.', className: 'text-white/45' }]]}
          />
        </div>

        <div className="mx-auto mt-16 grid max-w-[980px] items-stretch gap-5 md:grid-cols-2">
          {/* Free */}
          <Reveal y={40} className="h-full">
            <SpotlightCard className="flex h-full flex-col rounded-[20px] border border-white/[0.07] bg-white/[0.02] p-7 sm:p-8">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{free.name}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-[52px] font-black leading-none tracking-[-0.04em]">{free.price}</span>
                <span className="text-[14px] text-white/40">{free.cadence}</span>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/55">{free.tagline}</p>
              <div className="my-7 h-px bg-white/[0.06]" />
              <ul className="space-y-3.5">
                {free.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[14px] text-white/70">
                    <span className="mt-[7px] size-[5px] shrink-0 rounded-full bg-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-9">
                <PremiumCta href={links.signup} variant="secondary" size="lg" className="w-full">
                  {free.cta}
                </PremiumCta>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Pro */}
          <Reveal y={40} delay={0.1} className="h-full">
            <Tilt max={3} className="h-full">
              <div className="relative h-full">
                <div className="module-glow absolute -inset-[3px] rounded-[23px] blur-lg" aria-hidden />
                <SpotlightCard className="conic-border relative flex h-full flex-col rounded-[20px] bg-[#07130f] p-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,.8)] sm:p-8">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[20px]"
                    style={{ background: 'radial-gradient(120% 60% at 50% 0%, rgba(92,255,176,0.12), transparent 60%), rgba(20,46,37,0.5)' }}
                  />
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-mint">{pro.name}</div>
                    <span className="badge-shimmer rounded-full bg-mint px-2.5 py-1 font-mono text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-ink">
                      Most popular
                    </span>
                  </div>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-[52px] font-black leading-none tracking-[-0.04em]">{pro.price}</span>
                    <span className="text-[14px] text-white/40">{pro.cadence}</span>
                  </div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">{pro.tagline}</p>
                  <p className="mt-2 text-[12.5px] text-mint/70">{pro.billing}</p>
                  <div className="my-7 h-px bg-mint/[0.12]" />
                  <ul className="space-y-3.5">
                    {pro.features.map((f, i) => (
                      <motion.li
                        key={f.title}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.06 }}
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-mint/25 bg-mint/10">
                          <Check className="size-3 text-mint" strokeWidth={3} />
                        </span>
                        <span className="text-[14px] leading-snug">
                          <span className="font-semibold text-white/90">{f.title}</span>
                          {'proOnly' in f && f.proOnly && (
                            <span className="ml-2 rounded border border-mint/25 bg-mint/[0.08] px-1 py-[1px] align-middle font-mono text-[8.5px] font-extrabold uppercase tracking-[0.1em] text-mint">
                              Pro only
                            </span>
                          )}
                          <span className="block text-[13px] text-white/45">{f.detail}</span>
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-9">
                    <PremiumCta href={links.signup} size="lg" className="w-full">
                      {pro.cta}
                    </PremiumCta>
                  </div>
                </SpotlightCard>
              </div>
            </Tilt>
          </Reveal>
        </div>

        {/* Academy */}
        <Reveal y={30} delay={0.1} className="mx-auto mt-5 max-w-[980px]">
          <Link
            href={links.academy}
            className="cta-card group flex flex-col gap-6 p-6 transition-colors hover:border-white/[0.12] sm:p-7 md:flex-row md:items-center"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-mint/25 bg-mint/[0.07]">
              <GraduationCap className="size-5 text-mint" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mint/70">{academy.name} · Now enrolling</div>
              <div className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.015em] sm:text-[18px]">{academy.headline}</div>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
              {academy.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[20px] font-extrabold tracking-[-0.03em]">{s.value}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">{s.label}</div>
                </div>
              ))}
              <div className="h-9 w-px bg-white/[0.08]" />
              <div className="text-right">
                <div className="text-[20px] font-extrabold tracking-[-0.03em] text-mint">{academy.price}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">One-time</div>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
