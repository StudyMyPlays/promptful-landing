'use client'

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArtSlot, NightSky, Ridge } from '@/components/art/terrain'
import { ScaleToFit } from '@/components/motion/interactive'
import { EASE, Magnetic, SplitReveal } from '@/components/motion/primitives'
import { APP_H, APP_W, AppWindow, LibraryScreen } from '@/components/mock/app'
import { PHONE_H, PHONE_W, PhoneLibrary } from '@/components/mock/mobile'
import { PremiumCta, StatusPill } from '@/components/ui/brand'
import { assets, videos } from '@/lib/assets'
import { useFinePointer } from '@/lib/hooks'
import { links } from '@/lib/site'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  // Depth planes — each moves at its own rate
  const skyY = useTransform(p, [0, 1], ['0%', '22%'])
  const farY = useTransform(p, [0, 1], ['0%', '10%'])
  const nearY = useTransform(p, [0, 1], ['0%', '-14%'])
  const copyY = useTransform(p, [0, 0.5], [0, -90])
  const copyOpacity = useTransform(p, [0, 0.38], [1, 0])
  const copyBlur = useTransform(p, [0, 0.38], ['blur(0px)', 'blur(10px)'])
  const mockRotate = useTransform(p, [0, 0.45], [24, 0])
  const mockScale = useTransform(p, [0, 0.45], [0.9, 1])
  const mockY = useTransform(p, [0, 0.6], [0, -40])

  // Pointer micro-parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })
  const skyX = useTransform(smx, (v) => v * -10)
  const farX = useTransform(smx, (v) => v * -18)
  const nearX = useTransform(smx, (v) => v * -34)
  const mockX = useTransform(smx, (v) => v * 8)
  const mockTiltY = useTransform(smx, (v) => v * 3)
  const mockTiltX = useTransform(smy, (v) => v * -2)

  useEffect(() => {
    if (!fine || reduce) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, reduce, mx, my])

  const still = !!reduce

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden pb-[clamp(40px,8vw,120px)]">
      {/* Plane 0 — sky */}
      <motion.div className="absolute inset-0 -z-30" style={still ? undefined : { y: skyY, x: skyX }}>
        <ArtSlot asset={assets.heroSky} priority fallback={<NightSky />} />
        <HeroVideo />
      </motion.div>
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-20 h-[70%]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-20 h-[420px] w-[900px] max-w-full -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at top, rgba(92,255,176,0.09) 0%, transparent 70%)' }}
      />

      {/* Plane 1 — far ridges */}
      <motion.div
        className="pointer-events-none absolute inset-x-[-6%] bottom-[16%] -z-10 h-[46%] md:bottom-[22%]"
        style={still ? undefined : { y: farY, x: farX }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
      >
        <ArtSlot
          asset={assets.heroRidges}
          fallback={
            <div className="relative h-full w-full">
              <Ridge seed={11} height={600} base={0.5} amp={0.2} hills={1.1} octaves={3} roughness={0.38} top="#12342a" bottom="#05100c" rim={0.25} className="absolute inset-0 opacity-60" />
              <Ridge seed={23} height={600} base={0.68} amp={0.16} hills={1.7} octaves={4} roughness={0.4} top="#0c211a" bottom="#030806" rim={0.45} className="absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#020304]/80" />
            </div>
          }
        />
      </motion.div>

      {/* Copy */}
      <motion.div
        className="container-x relative z-10 flex flex-col items-center pt-[clamp(120px,17vh,190px)] text-center"
        style={still ? undefined : { y: copyY, opacity: copyOpacity, filter: copyBlur }}
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <StatusPill>The prompt library for builders</StatusPill>
        </motion.div>
        <SplitReveal
          as="h1"
          immediate
          delay={0.15}
          stagger={0.09}
          className="display-xl mt-7 text-balance"
          lines={[['Curated. Validated.'], [{ text: 'Yours.', className: 'text-mint-gradient pr-[0.06em]' }]]}
        />
        <motion.p
          className="lede mt-7 max-w-[560px] text-pretty"
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 0.55 }}
        >
          A hand-built library of production-ready prompts and chains — each tagged with the harness it runs in and the model it was
          tuned for. Stop guessing. Start from something that already works.
        </motion.p>
        <motion.div
          className="mt-9 flex w-full max-w-[340px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        >
          <Magnetic className="w-full sm:w-auto">
            <PremiumCta href={links.signup} size="lg" className="w-full">
              Start free — 14 reveals
            </PremiumCta>
          </Magnetic>
          <PremiumCta href="#library" variant="secondary" size="lg" arrow={false} className="w-full sm:w-auto">
            Explore the library
          </PremiumCta>
        </motion.div>
        <motion.p
          className="micro mt-6 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          No card required · Cancel Pro any time
        </motion.p>
      </motion.div>

      {/* Plane 2 — product */}
      <div className="container-x relative z-10 mt-[clamp(56px,8vw,96px)] [perspective:1800px]">
        <motion.div
          className="relative mx-auto w-full max-w-[1120px] origin-bottom"
          style={still ? undefined : { rotateX: mockRotate, scale: mockScale, y: mockY, x: mockX }}
          initial={{ opacity: 0, y: 140 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.45 }}
        >
          <motion.div style={still ? undefined : { rotateY: mockTiltY, rotateX: mockTiltX }} className="relative">
            <div className="module-glow absolute -inset-[3px] rounded-[24px] opacity-70 blur-xl" aria-hidden />
            <div className="hidden md:block">
              <ScaleToFit width={APP_W} height={APP_H}>
                <AppWindow>
                  <LibraryScreen />
                </AppWindow>
              </ScaleToFit>
            </div>
            <div className="mx-auto w-[min(88vw,380px)] md:hidden">
              <ScaleToFit width={PHONE_W} height={PHONE_H}>
                <PhoneLibrary />
              </ScaleToFit>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Plane 3 — near foreground, overlaps the product (depth cue) */}
      <motion.div
        className="pointer-events-none absolute inset-x-[-8%] -bottom-[12%] z-20 h-[44%] md:h-[48%]"
        style={still ? undefined : { y: nearY, x: nearX }}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.35 }}
      >
        <ArtSlot
          asset={assets.heroForeground}
          objectPosition="top"
          fallback={
            <div className="relative h-full w-full">
              <Ridge seed={41} height={500} base={0.5} amp={0.13} hills={0.9} octaves={2} roughness={0.3} points={200} top="#0a1f18" bottom="#020304" rim={0.45} className="absolute inset-0" />
              <Ridge seed={57} height={500} base={0.68} amp={0.1} hills={1.4} octaves={2} roughness={0.3} points={200} top="#05110d" bottom="#020304" rim={0.22} className="absolute inset-0" />
            </div>
          }
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#020304]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent to-[#020304]" />
      <div className="grain z-30" />
    </section>
  )
}

/** Optional Seedance ambient loop — only on larger screens with motion allowed. */
function HeroVideo() {
  const [enabled, setEnabled] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!videos.heroLoop.ready) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const ok =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !conn?.saveData
    setEnabled(ok)
  }, [])
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()))
    io.observe(v)
    return () => io.disconnect()
  }, [enabled])
  if (!enabled) return null
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={videos.heroLoop.src}
      poster={videos.heroLoop.poster}
      muted
      playsInline
      loop
      preload="none"
      aria-hidden
    />
  )
}
