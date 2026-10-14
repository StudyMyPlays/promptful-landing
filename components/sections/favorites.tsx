'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Activity, RotateCcw, X } from 'lucide-react'
import { useState } from 'react'
import { SpotlightCard } from '@/components/motion/interactive'
import { EASE, Reveal, SplitReveal } from '@/components/motion/primitives'
import { CopyDot, FavoriteDot } from '@/components/mock/atoms'
import { Rail, RailRow } from '@/components/mock/app'
import { cn } from '@/lib/cn'
import { favoriteIds, favoriteLimits, promptById, recommendations } from '@/lib/content'

const nudged = promptById('market')

const points = [
  { k: 'One copy away', v: 'The centred card copies from its corner. No opening, no scrolling.' },
  { k: 'Learns what you reach for', v: 'Most Used counts your copies. Most Recent keeps the order you hearted them in.' },
  { k: 'Because You Favorited', v: 'Suggestions blended from what a prompt is, what it means, and what people favorite alongside it.' },
]

/** The Promptful mark, as on the nudge's button (components/ui/promptful-mark.tsx). */
function Mark() {
  return (
    <span className="grid size-4 place-items-center rounded-[4px] bg-primary/15 text-[10px] font-black leading-none text-primary" aria-hidden>
      p
    </span>
  )
}

export function FavoritesSection() {
  const reduce = useReducedMotion()
  const [kept, setKept] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  // One short of the free cap, so keeping the nudged prompt fills the shelf.
  const favs = favoriteIds.filter((id) => id !== 'clockwork').map(promptById)
  const count = favs.length + (kept ? 1 : 0)
  const limit = favoriteLimits.free
  const recent = (kept ? [nudged, ...[...favs].reverse()] : [...favs].reverse()).slice(0, 4)
  const mostUsed = [...favs].sort((a, b) => (b.yourRuns ?? 0) - (a.yourRuns ?? 0)).slice(0, 4)

  return (
    <section id="favorites" className="relative overflow-hidden py-[clamp(96px,13vw,180px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[1100px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(80,160,255,0.07), transparent)' }}
      />
      <div className="container-x grid items-start gap-[clamp(48px,6vw,96px)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28">
          <SplitReveal className="display-md text-balance" lines={[['Heart what works.'], [{ text: 'Keep it close.', className: 'text-white/45' }]]} />
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-[480px]">
              Favorites is your shelf of go-to prompts: a carousel of the cards you reach for, with the rails that tell you which ones you
              actually use. Free keeps {favoriteLimits.free}. Pro keeps {favoriteLimits.pro}.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-9 space-y-5 border-t border-white/[0.07] pt-7">
              {points.map((p) => (
                <div key={p.k}>
                  <dt className="text-[15px] font-semibold tracking-[-0.01em]">{p.k}</dt>
                  <dd className="mt-1 text-[14px] leading-relaxed text-white/50">{p.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal y={40} className="relative min-w-0">
          <SpotlightCard color="100,200,255" className="rounded-[22px] border border-white/[0.08] bg-[#07080c] p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] sm:p-7">
            {/* The nudge (components/prompts/favorite-nudge.tsx) */}
            <div className="min-h-[106px] sm:min-h-[64px]">
              <AnimatePresence mode="wait" initial={false}>
                {!dismissed && (
                  <motion.div
                    key={kept ? 'kept' : 'ask'}
                    role="status"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-wrap items-center gap-x-3 gap-y-2.5 rounded-xl border border-white/[0.1] bg-[#0b0d14]/95 px-3.5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  >
                    <div className="order-1 min-w-0 flex-1">
                      <p className="text-[12.5px] font-semibold text-white">{kept ? 'Kept. It’s on your shelf.' : 'Copied twice. Keep it close?'}</p>
                      <p className="truncate text-[11.5px] text-white/55">{nudged.title}</p>
                    </div>
                    {kept ? (
                      <button
                        type="button"
                        onClick={() => setKept(false)}
                        className="order-3 inline-flex h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-white/[0.1] px-2.5 sm:order-2 sm:w-auto text-[11.5px] font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
                      >
                        <RotateCcw className="size-3.5" /> Undo
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setKept(true)}
                        className="order-3 inline-flex h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-primary/35 sm:order-2 sm:w-auto bg-primary/[0.08] pl-1.5 pr-2.5 text-[11.5px] font-black tracking-tight text-white shadow-[0_0_12px_rgba(92,255,176,0.12)] transition-all hover:border-primary/60 hover:bg-primary/[0.14] hover:shadow-[0_0_16px_rgba(92,255,176,0.22)] active:scale-[0.97]"
                      >
                        <Mark />
                        Are You Promptful? <span className="text-primary">♥</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setDismissed(true)}
                      aria-label="Not now"
                      className="order-2 grid size-7 shrink-0 place-items-center rounded-md text-white/50 transition-colors hover:text-white/80 sm:order-3"
                    >
                      <X className="size-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {dismissed && (
                <button type="button" onClick={() => setDismissed(false)} className="flex h-[106px] w-full items-center sm:h-[64px] justify-center rounded-xl border border-dashed border-white/[0.08] text-[12.5px] text-white/40 transition-colors hover:text-white/70">
                  Show the nudge again
                </button>
              )}
            </div>

            {/* Meter (FavoritesMeter) */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
              <motion.span key={count} initial={reduce ? false : { y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cn('tabular font-mono', count >= limit ? 'text-red-400/80' : 'text-white/55')}>
                {count} / {limit} favorites
              </motion.span>
              <span className="font-medium text-primary/80">Upgrade to keep up to {favoriteLimits.pro}</span>
            </div>
            <div className="mt-2 flex gap-[3px]" aria-hidden>
              {Array.from({ length: limit }, (_, i) => (
                <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors duration-300', i < count ? (count >= limit ? 'bg-red-400/70' : 'bg-cyan-400 shadow-[0_0_8px_rgba(100,220,255,0.6)]') : 'bg-white/[0.08]')} />
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Rail title="Most Used">
                {mostUsed.map((p, i) => (
                  <RailRow
                    key={p.id}
                    title={p.title}
                    highlight={i === 0}
                    meta={
                      <span className="inline-flex items-center gap-1 text-white/50">
                        <Activity className="size-3" />
                        {p.yourRuns ?? 0}
                      </span>
                    }
                  />
                ))}
              </Rail>
              <Rail title="Most Recent">
                <AnimatePresence initial={false}>
                  {recent.map((p) => (
                    <motion.div
                      key={p.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, x: -12, backgroundColor: 'rgba(92,255,176,0.12)' }}
                      animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(92,255,176,0)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="rounded"
                    >
                      <RailRow title={p.title} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Rail>
              <Rail title="Because You Favorited" className="md:col-span-2">
                {recommendations.map((r) => (
                  <div key={r.title} className="flex items-center gap-1 rounded">
                    <div className="min-w-0 flex-1 px-2 py-1.5">
                      <span className="line-clamp-1 block text-[12px] text-white/70">{r.title}</span>
                      <span className="mt-0.5 block truncate text-[11px] text-white/45">Because you favorited {r.because}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 pr-1">
                      <FavoriteDot />
                      <CopyDot />
                    </div>
                  </div>
                ))}
              </Rail>
            </div>
          </SpotlightCard>
          <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-60 blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.14), transparent)' }} />
        </Reveal>
      </div>
    </section>
  )
}
