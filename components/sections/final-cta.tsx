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
  // Dunes are anchored to the section's bottom edge and over-sized below it, so every
  // parallax offset only hides more of the (dark) dune base, never exposes a gap or crops a crest.
  const backY = useTransform(scrollYProgress, [0, 1], ['10%', '0%'])
  const frontY = useTransform(scrollYProgress, [0, 1], ['22%', '0%'])
  const glowOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1])
  const skyY = useTransform(scrollYProgress, [0, 1], ['-8%', '0%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden [--dune-w:max(118vw,860px)] [--dune-h:calc(var(--dune-w)*794/2048)]">
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: skyY }}>
        <NightSky intensity={0.9} />
      </motion.div>
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-[#020304] to-transparent" />

      <div className="container-x relative z-20 flex flex-col items-center pb-[calc(var(--dune-h)*0.5+40px)] pt-[clamp(96px,12vw,160px)] text-center">
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

      {/* Horizon glow the dune crests catch */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--dune-h)*0.1)] -z-10 h-[calc(var(--dune-h)*0.9)]"
        style={reduce ? undefined : { opacity: glowOpacity }}
      >
        <div className="h-full w-full bg-[radial-gradient(50%_45%_at_50%_55%,rgba(92,255,176,0.16),transparent_100%)]" />
      </motion.div>

      {/* Back dune plane: mirrored, dimmer, slower */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(var(--dune-h)*-0.38)] left-[calc(50%-var(--dune-w)*0.46)] z-0 h-[var(--dune-h)] w-[var(--dune-w)]"
        style={reduce ? undefined : { y: backY }}
      >
        <ArtSlot
          asset={assets.ctaTerrain}
          unoptimized
          objectPosition="center top"
          className="-scale-x-100 opacity-35 brightness-[0.5] saturate-[0.8]"
          fallback={<Ridge seed={131} height={420} base={0.42} amp={0.3} hills={1.2} octaves={3} roughness={0.35} top="#0f2a21" bottom="#040b08" rim={0.5} className="absolute inset-0" />}
        />
      </motion.div>

      {/* Front dune plane */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(var(--dune-h)*-0.5)] left-[calc(50%-var(--dune-w)*0.54)] z-10 h-[var(--dune-h)] w-[var(--dune-w)]"
        style={reduce ? undefined : { y: frontY }}
      >
        <ArtSlot
          asset={assets.ctaTerrain}
          unoptimized
          objectPosition="center top"
          fallback={<Ridge seed={149} height={420} base={0.3} amp={0.2} hills={1.8} octaves={3} roughness={0.35} top="#0f2a21" bottom="#020304" rim={0.7} className="absolute inset-0" />}
        />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[calc(var(--dune-h)*0.22)] bg-gradient-to-b from-transparent to-[#030405]" />
    </section>
  )
}
