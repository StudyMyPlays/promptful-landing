'use client'

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion'
import { Image as ImageIcon, Library, Link2, ScanText } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ScaleToFit } from '@/components/motion/interactive'
import { Reveal, SplitReveal } from '@/components/motion/primitives'
import { APP_H, APP_W, AppWindow, ChainScreen, DetailScreen, LibraryScreen, MediaScreen } from '@/components/mock/app'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/hooks'

const tabs = [
  { key: 'library', label: 'Library', Icon: Library, caption: 'Every prompt tagged by use case, harness, model and platform.', url: 'promptful.org', Screen: LibraryScreen },
  { key: 'detail', label: 'Prompt detail', Icon: ScanText, caption: 'The full prompt, when to use it, and where it runs.', url: 'promptful.org/library', Screen: DetailScreen },
  { key: 'chains', label: 'Chains', Icon: Link2, caption: 'Ordered steps you run one after another, or copy all at once.', url: 'promptful.org/chains', Screen: ChainScreen },
  { key: 'media', label: 'Image & Video', Icon: ImageIcon, caption: 'Every media prompt ships with the output it made.', url: 'promptful.org/image', Screen: MediaScreen },
] as const

const AUTO_MS = 6000
const COMPACT_W = 820
const COMPACT_H = 600
const EASE_OUT = [0.23, 1, 0.32, 1] as const

export function Showcase() {
  const ref = useRef<HTMLElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 768px)', true)
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hovered, setHovered] = useState(false)
  const running = auto && inView && !hovered && !reduce

  const select = useCallback((n: number, manual = true) => {
    setI((n + tabs.length) % tabs.length)
    if (manual) setAuto(false)
  }, [])

  // Auto-advance until the first manual interaction
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => select(i + 1, false), AUTO_MS)
    return () => clearTimeout(t)
  }, [running, i, select])

  // Keep the active tab visible when the strip scrolls (phones)
  useEffect(() => {
    const el = strip.current
    const tab = el?.querySelectorAll<HTMLElement>('[role=tab]')[i]
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return
    el.scrollTo({ left: tab.offsetLeft - el.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' })
  }, [i])

  const t = tabs[i]
  const w = wide ? APP_W : COMPACT_W
  const h = wide ? APP_H : COMPACT_H

  return (
    <section id="library" ref={ref} className="relative py-[clamp(88px,12vw,160px)]">
      <div className="container-x">
        <div className="mx-auto max-w-[640px] text-center">
          <SplitReveal className="display-md text-balance" lines={[['One library for every'], ['prompt you run.']]} />
          <Reveal delay={0.1}>
            <p className="lede mx-auto mt-5 max-w-[520px]">Find it, check where it runs, copy it. That is the whole workflow.</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <LayoutGroup id="showcase-tabs">
            <div
              ref={strip}
              role="tablist"
              aria-label="Library views"
              className="scrollbar-hide relative flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/[0.07] bg-white/[0.02] p-1"
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault()
                  const n = i + (e.key === 'ArrowRight' ? 1 : -1)
                  select(n)
                  strip.current?.querySelectorAll<HTMLElement>('[role=tab]')[(n + tabs.length) % tabs.length]?.focus()
                }
              }}
            >
              {tabs.map((tb, k) => (
                <button
                  key={tb.key}
                  type="button"
                  role="tab"
                  id={`tab-${tb.key}`}
                  aria-selected={k === i}
                  aria-controls="showcase-panel"
                  tabIndex={k === i ? 0 : -1}
                  onClick={() => select(k)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 active:scale-[0.97]',
                    k === i ? 'text-white' : 'text-white/50 hover:text-white/80',
                  )}
                >
                  {k === i && (
                    <motion.span
                      layoutId="showcase-pill"
                      className="absolute inset-0 -z-10 overflow-hidden rounded-full border border-white/[0.09] bg-white/[0.06]"
                      transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
                    >
                      {running && (
                        <motion.span
                          key={`p-${i}`}
                          className="absolute inset-x-3 bottom-0 h-px origin-left bg-mint/70"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                        />
                      )}
                    </motion.span>
                  )}
                  <tb.Icon className={cn('size-4', k === i ? 'text-mint' : 'text-white/40')} />
                  {tb.label}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <Reveal delay={0.2} y={40} className="relative mx-auto mt-8 max-w-[1120px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-16 top-1/3 -z-10"
            style={{ background: 'radial-gradient(60% 60% at 50% 60%, rgba(92,255,176,0.08), transparent 70%)' }}
          />
          <motion.div
            id="showcase-panel"
            role="tabpanel"
            aria-labelledby={`tab-${t.key}`}
            className="relative touch-pan-y"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) select(i + 1)
              else if (info.offset.x > 60) select(i - 1)
            }}
          >
            <ScaleToFit width={w} height={h}>
              <AppWindow url={t.url}>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={t.key}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(2px)' }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <t.Screen compact={!wide} />
                  </motion.div>
                </AnimatePresence>
              </AppWindow>
            </ScaleToFit>
          </motion.div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={t.key}
              className="mt-6 text-center text-[14.5px] text-white/50"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              aria-live="polite"
            >
              {t.caption}
            </motion.p>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
