'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, Image as ImageIcon, Library, Link2, ScanText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ArtSlot, NightSky, Ridge } from '@/components/art/terrain'
import { ScaleToFit } from '@/components/motion/interactive'
import { EASE, Reveal, SplitReveal } from '@/components/motion/primitives'
import { scrollToTarget, useLenis } from '@/components/motion/smooth-scroll'
import { APP_H, APP_W, AppWindow, ChainScreen, DetailScreen, LibraryScreen, MediaScreen } from '@/components/mock/app'
import { SectionPill } from '@/components/ui/brand'
import { assets } from '@/lib/assets'
import { cn } from '@/lib/cn'

const tabs = [
  {
    key: 'library',
    label: 'Library',
    Icon: Library,
    title: 'Every prompt, tagged four ways.',
    body: 'Filter by use case, the harness it runs in, the model it targets and the platform it was built for. New drops land every week.',
    url: 'promptful.org/library',
    Screen: LibraryScreen,
  },
  {
    key: 'detail',
    label: 'Prompt detail',
    Icon: ScanText,
    title: 'Everything you need before you paste.',
    body: 'The full prompt, when to use it, where it runs, and how many times everyone else has run it.',
    url: 'promptful.org/library/production-code-review',
    Screen: DetailScreen,
  },
  {
    key: 'chains',
    label: 'Chains',
    Icon: Link2,
    title: 'One prompt is a tool. A chain is a workflow.',
    body: 'Ordered, runnable sequences that share one use case. Step through with Back and Next, or copy the whole thing.',
    url: 'promptful.org/chains/ship-ready-codebase-audit',
    Screen: ChainScreen,
  },
  {
    key: 'media',
    label: 'Image & Video',
    Icon: ImageIcon,
    title: 'See the output before you spend a credit.',
    body: 'Every image and video prompt ships with the picture or clip it produced — and the settings behind it.',
    url: 'promptful.org/image',
    Screen: MediaScreen,
  },
] as const

const COMPACT_W = 820
const COMPACT_H = 600

function Backdrop({ drift }: { drift?: MotionValue<string> }) {
  return (
    <motion.div className="absolute -inset-y-[8%] inset-x-0" style={drift ? { y: drift } : undefined}>
      <ArtSlot
        asset={assets.showcaseBackdrop}
        sizes="(min-width: 1024px) 70vw, 100vw"
        fallback={
          <div className="absolute inset-0">
            <NightSky intensity={1.5} />
            <Ridge seed={73} height={500} base={0.55} amp={0.2} hills={1.2} octaves={3} roughness={0.4} top="#1a4a3a" bottom="#07140f" rim={0.5} className="absolute inset-x-0 bottom-0 h-[62%]" />
            <Ridge seed={91} height={500} base={0.72} amp={0.14} hills={1.9} octaves={3} roughness={0.4} top="#0d2a20" bottom="#030806" rim={0.3} texture={18} className="absolute inset-x-0 bottom-0 h-[50%]" />
          </div>
        }
      />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_40%,transparent,rgba(2,3,4,.55))]" />
    </motion.div>
  )
}

function Heading() {
  return (
    <>
      <Reveal>
        <SectionPill index="02">The library</SectionPill>
      </Reveal>
      <SplitReveal
        className="display-md mt-6 text-balance"
        lines={[['One library for every'], [{ text: 'prompt you run.', className: 'text-white/45' }]]}
      />
    </>
  )
}

export function Showcase() {
  return (
    <section id="library" className="relative">
      <PinnedShowcase />
      <CarouselShowcase />
    </section>
  )
}

/* ── Desktop: pinned, scroll-scrubbed ─────────────────────── */
function PinnedShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(tabs.length - 1, Math.floor(v * tabs.length * 0.9999))))
  const drift = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const frameScale = useTransform(scrollYProgress, [0, 0.08], [0.94, 1])

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    scrollToTarget(lenis, top + range * ((i + 0.5) / tabs.length), 0)
  }

  return (
    <div ref={ref} className="relative hidden h-[440vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1480px] grid-cols-[minmax(280px,340px)_1fr] items-center gap-[clamp(32px,4vw,64px)] px-[var(--page-gutter)]">
          <div>
            <Heading />
            <div className="mt-10 space-y-1" role="tablist" aria-label="Library views">
              {tabs.map((t, i) => (
                <TabRow key={t.key} i={i} active={active === i} progress={scrollYProgress} onClick={() => jump(i)} />
              ))}
            </div>
            <div className="relative mt-8 h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-white">{tabs[active].title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/55">{tabs[active].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div className="relative overflow-hidden rounded-[28px] border border-white/[0.08]" style={{ scale: frameScale }}>
            <Backdrop drift={drift} />
            <div className="relative p-[clamp(18px,2.6vw,40px)]">
              <div className="relative mx-auto" style={{ maxWidth: 'calc((100vh - 150px) * 1.58)' }}>
                {tabs.map((t, i) => (
                  <ScreenLayer key={t.key} i={i} progress={scrollYProgress}>
                    <ScaleToFit width={APP_W} height={APP_H}>
                      <AppWindow url={t.url}>
                        <t.Screen />
                      </AppWindow>
                    </ScaleToFit>
                  </ScreenLayer>
                ))}
              </div>
            </div>
            <div className="grain" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function TabRow({ i, active, progress, onClick }: { i: number; active: boolean; progress: MotionValue<number>; onClick: () => void }) {
  const t = tabs[i]
  const fill = useTransform(progress, [i / tabs.length, (i + 1) / tabs.length], ['0%', '100%'])
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-colors duration-300',
        active ? 'border-white/[0.09] bg-white/[0.035]' : 'border-transparent hover:bg-white/[0.02]',
      )}
    >
      <t.Icon className={cn('size-4 transition-colors', active ? 'text-mint' : 'text-white/35')} />
      <span className={cn('text-[14px] font-medium transition-colors', active ? 'text-white' : 'text-white/45 group-hover:text-white/70')}>{t.label}</span>
      <span className="ml-auto font-mono text-[10px] tracking-[0.12em] text-white/25">0{i + 1}</span>
      <span className="absolute inset-x-3.5 bottom-0 h-px bg-white/[0.05]">
        <motion.span className="block h-full bg-mint shadow-[0_0_8px_rgba(92,255,176,.8)]" style={{ width: fill }} />
      </span>
    </button>
  )
}

/** Scroll-linked transforms are WAAPI-accelerated in framer-motion 13 — input ranges must stay within [0, 1]. */
const within = (a: number, b: number): [number, number] => [Math.max(0, a), Math.min(1, b)]

function ScreenLayer({ i, progress, children }: { i: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const n = tabs.length
  const edge = i / n
  const reveal = useTransform(progress, within(edge - 0.05, edge + 0.03), [100, 0])
  const clip = useTransform(reveal, (v) => (i === 0 ? 'inset(0% 0 0 0 round 20px)' : `inset(${v}% 0 0 0 round 20px)`))
  const next = (i + 1) / n
  const scale = useTransform(progress, within(next - 0.05, next + 0.03), [1, i === n - 1 ? 1 : 0.94])
  const dim = useTransform(progress, within(next - 0.05, next + 0.03), [1, i === n - 1 ? 1 : 0.35])
  const y = useTransform(reveal, [100, 0], [40, 0])
  return (
    <motion.div
      className={cn(i === 0 ? 'relative' : 'absolute inset-0')}
      style={{ clipPath: clip, scale, opacity: dim, y: i === 0 ? 0 : y, zIndex: i }}
    >
      {children}
    </motion.div>
  )
}

/* ── Mobile / tablet: swipeable carousel ──────────────────── */
function CarouselShowcase() {
  const [i, setI] = useState(0)
  const strip = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = strip.current
    const tab = el?.querySelectorAll<HTMLElement>('[role=tab]')[i]
    if (!el || !tab) return
    el.scrollTo({ left: tab.offsetLeft - el.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' })
  }, [i])
  const [dir, setDir] = useState(1)
  const go = (next: number) => {
    const n = (next + tabs.length) % tabs.length
    setDir(n > i || (i === tabs.length - 1 && n === 0) ? 1 : -1)
    setI(n)
  }
  const t = tabs[i]
  return (
    <div className="container-x py-[clamp(72px,12vw,120px)] lg:hidden">
      <Heading />
      <div ref={strip} className="scrollbar-hide relative -mx-[var(--page-gutter)] mt-8 overflow-x-auto px-[var(--page-gutter)]" role="tablist" aria-label="Library views">
        <div className="flex w-max gap-2">
          {tabs.map((tb, k) => (
            <button
              key={tb.key}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => go(k)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors',
                k === i ? 'border-mint/40 bg-mint/[0.08] text-mint' : 'border-white/[0.08] bg-white/[0.02] text-white/55',
              )}
            >
              <tb.Icon className="size-3.5" /> {tb.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-5 overflow-hidden rounded-[22px] border border-white/[0.08]">
        <Backdrop />
        <div className="relative p-3 sm:p-6">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go(i + 1)
              else if (info.offset.x > 50) go(i - 1)
            }}
            className="relative touch-pan-y"
          >
            <ScaleToFit width={COMPACT_W} height={COMPACT_H} className="invisible" >
              <div />
            </ScaleToFit>
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={t.key}
                custom={dir}
                className="absolute inset-0"
                variants={{
                  enter: (d: number) => ({ x: `${d * 30}%`, opacity: 0, scale: 0.96 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (d: number) => ({ x: `${d * -30}%`, opacity: 0, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
              >
                <ScaleToFit width={COMPACT_W} height={COMPACT_H}>
                  <AppWindow url={t.url}>
                    <t.Screen compact />
                  </AppWindow>
                </ScaleToFit>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-4">
        <button type="button" aria-label="Previous view" onClick={() => go(i - 1)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/70 transition-colors hover:border-white/25 hover:text-white">
          <ArrowLeft className="size-4" />
        </button>
        <div className="min-w-0 flex-1 text-center" aria-live="polite">
          <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{t.title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/55">{t.body}</p>
        </div>
        <button type="button" aria-label="Next view" onClick={() => go(i + 1)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/70 transition-colors hover:border-white/25 hover:text-white">
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
