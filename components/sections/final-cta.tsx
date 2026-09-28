'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArtSlot, NightSky, Ridge } from '@/components/art/terrain'
import { ScaleToFit } from '@/components/motion/interactive'
import { Magnetic, Reveal, SplitReveal } from '@/components/motion/primitives'
import { ChainScreen } from '@/components/mock/app'
import { PremiumCta } from '@/components/ui/brand'
import { assets } from '@/lib/assets'
import { links } from '@/lib/site'

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const terrainY = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])
  const skyY = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])
  const cardY = useTransform(scrollYProgress, [0, 1], [120, 0])
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-8, -3])

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: skyY }}>
        <NightSky intensity={1.1} />
      </motion.div>
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-[#020304] to-transparent" />

      <div className="container-x relative grid items-center gap-14 pb-[clamp(200px,24vw,340px)] pt-[clamp(72px,9vw,120px)] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SplitReveal
            className="display-lg text-balance"
            lines={[['Your next great prompt'], [{ text: 'is one reveal away.', className: 'text-mint-gradient pb-[0.14em]' }]]}
          />
          <Reveal delay={0.15}>
            <p className="lede mt-6 max-w-[460px]">
              Browse the whole library free. Reveal 14 prompts and 2 chains — they&apos;re yours to keep. Upgrade when the library earns it.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <PremiumCta href={links.signup} size="lg" className="w-full">
                Start for free
              </PremiumCta>
            </Magnetic>
            <PremiumCta href={links.pricing} variant="secondary" size="lg" arrow={false} className="w-full sm:w-auto">
              Compare plans
            </PremiumCta>
          </Reveal>
        </div>
        <motion.div className="relative hidden lg:block" style={reduce ? undefined : { y: cardY, rotate: cardRotate }}>
          <div className="module-glow absolute -inset-2 rounded-[26px] blur-xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#060707] shadow-[0_60px_120px_-40px_rgba(0,0,0,.95)]">
            <ScaleToFit width={820} height={560}>
              <ChainScreen copied={5} compact />
            </ScaleToFit>
          </div>
        </motion.div>
      </div>

      <motion.div className="pointer-events-none absolute inset-x-[-6%] bottom-0 z-10 h-[clamp(200px,28vw,420px)]" style={reduce ? undefined : { y: terrainY }}>
        <ArtSlot
          asset={assets.ctaTerrain}
          objectPosition="top"
          fallback={
            <div className="relative h-full w-full">
              <Ridge seed={131} height={420} base={0.42} amp={0.3} hills={1.2} octaves={3} roughness={0.35} top="#0f2a21" bottom="#040b08" rim={0.7} className="absolute inset-0" />
              <Ridge seed={149} height={420} base={0.62} amp={0.2} hills={1.8} octaves={3} roughness={0.35} top="#081711" bottom="#020304" rim={0.35} className="absolute inset-0" />
            </div>
          }
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#020304]" />
      </motion.div>
      <div className="grain z-20" />
    </section>
  )
}
