'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArtSlot, NightSky, Ridge } from '@/components/art/terrain'
import { Magnetic, Reveal, SplitReveal } from '@/components/motion/primitives'
import { PremiumCta } from '@/components/ui/brand'
import { assets } from '@/lib/assets'
import { links } from '@/lib/site'

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const terrainY = useTransform(scrollYProgress, [0, 1], ['20%', '0%'])
  const skyY = useTransform(scrollYProgress, [0, 1], ['-8%', '0%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: skyY }}>
        <NightSky intensity={0.9} />
      </motion.div>
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-[#020304] to-transparent" />

      <div className="container-x relative flex flex-col items-center pb-[clamp(120px,13vw,190px)] pt-[clamp(96px,12vw,160px)] text-center">
        <SplitReveal
          className="display-lg max-w-[820px] text-balance"
          lines={[['Your next great prompt'], [{ text: 'is one reveal away.', className: 'text-mint-gradient pb-[0.14em]' }]]}
        />
        <Reveal delay={0.15}>
          <p className="lede mt-6 max-w-[480px]">Browse the whole library free. Reveal 14 prompts and 2 chains, and keep them for good.</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-9 flex w-full max-w-[340px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
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

      {/* Low dune line along the bottom edge */}
      <motion.div className="pointer-events-none absolute inset-x-[-4%] bottom-0 z-10 h-[clamp(84px,9.5vw,150px)]" style={reduce ? undefined : { y: terrainY }}>
        <ArtSlot
          asset={assets.ctaTerrain}
          objectPosition="center 20%"
          fallback={
            <div className="relative h-full w-full">
              <Ridge seed={131} height={420} base={0.42} amp={0.3} hills={1.2} octaves={3} roughness={0.35} top="#0f2a21" bottom="#040b08" rim={0.7} className="absolute inset-0" />
              <Ridge seed={149} height={420} base={0.62} amp={0.2} hills={1.8} octaves={3} roughness={0.35} top="#081711" bottom="#020304" rim={0.35} className="absolute inset-0" />
            </div>
          }
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#020304]" />
      </motion.div>
    </section>
  )
}
