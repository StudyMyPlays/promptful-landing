'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Copy, Fingerprint, Lock, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SpotlightCard } from '@/components/motion/interactive'
import { Reveal, SplitReveal } from '@/components/motion/primitives'
import { UseCaseBadge } from '@/components/ui/brand'
import { cn } from '@/lib/cn'
import { glowFor } from '@/lib/content'

const HOLD_MS = 1400
const TOTAL = 14

const promptLines = [
  '# Role',
  'You are a conversion copywriter who has written',
  'landing pages for 40+ developer tools.',
  '# Task',
  'Rewrite the hero for the product below. Lead with the',
  'outcome, not the feature. Max 9 words in the headline.',
  '# Constraints',
  'No "revolutionary". No "AI-powered". Give three options',
  'and say which one you would ship, and why.',
]

export function RevealDemo() {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [state, setState] = useState<'locked' | 'holding' | 'revealed'>('locked')
  const [used, setUsed] = useState(5)
  const [copied, setCopied] = useState(false)
  const raf = useRef<number | null>(null)
  const start = useRef(0)

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = null
  }, [])

  const begin = useCallback(() => {
    if (state === 'revealed') return
    setState('holding')
    start.current = performance.now() - progress * HOLD_MS
    const tick = (t: number) => {
      const p = Math.min(1, (t - start.current) / HOLD_MS)
      setProgress(p)
      if (p >= 1) {
        stop()
        setState('revealed')
        setUsed((u) => Math.min(TOTAL, u + 1))
        navigator.vibrate?.(18)
        return
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [progress, state, stop])

  const release = useCallback(() => {
    if (state !== 'holding') return
    stop()
    setState('locked')
    // ease the ring back down
    const from = progress
    const t0 = performance.now()
    const back = (t: number) => {
      const k = Math.min(1, (t - t0) / 380)
      setProgress(from * (1 - k))
      if (k < 1) raf.current = requestAnimationFrame(back)
    }
    raf.current = requestAnimationFrame(back)
  }, [progress, state, stop])

  useEffect(() => stop, [stop])

  const reset = () => {
    stop()
    setProgress(0)
    setState('locked')
    setCopied(false)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promptLines.join('\n'))
    } catch {
      /* clipboard unavailable: still show confirmation */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const revealed = state === 'revealed'
  const blur = revealed ? 0 : 7 - progress * 5
  const holdLabel = state === 'holding' ? (progress > 0.7 ? 'Revealing…' : 'Keep holding…') : 'Hold to reveal'
  const left = TOTAL - used

  return (
    <section id="reveal" className="relative overflow-hidden py-[clamp(96px,13vw,180px)]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[1100px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(92,255,176,0.07), transparent)' }}
      />
      <div className="container-x grid items-center gap-[clamp(48px,6vw,96px)] lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SplitReveal
            className="display-md text-balance"
            lines={[['Press. Hold.'], [{ text: 'It’s yours for good.', className: 'text-white/45' }]]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-[480px]">
              Free accounts browse the whole library and reveal 14 prompts and 2 chains of their choosing. Once revealed, a prompt stays
              yours, even if you never upgrade.
            </p>
          </Reveal>
        </div>

        <Reveal y={40} className="relative">
          <SpotlightCard className="rounded-[22px] border border-white/[0.08] bg-[#0a0a0a] shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)]">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-5 py-4">
              <UseCaseBadge label="Sales & Marketing" glow={glowFor('Sales & Marketing')} />
              <span className="text-[11px] font-medium">
                <span className="text-white/35">Use with </span>
                <span className="text-[#7fcdb3]">ChatGPT Work</span>
              </span>
            </div>
            <div className="px-5 pt-5">
              <h3 className="text-[19px] font-semibold tracking-[-0.02em]">Landing Page Hero Rewriter</h3>
            </div>
            <div className="relative mx-5 mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 p-4">
              <div
                className="space-y-1 font-mono text-[12px] leading-[1.75] text-white/70 transition-[filter] duration-150 sm:text-[12.5px]"
                style={{ filter: `blur(${revealed ? 6 : reduce ? 6 : blur}px)`, opacity: revealed ? 0 : 1, transition: 'opacity 600ms ease 400ms' }}
                aria-hidden
              >
                {promptLines.map((l, i) => (
                  <p key={i} className={l.startsWith('#') ? 'text-white/95' : undefined}>
                    {l}
                  </p>
                ))}
              </div>
              <AnimatePresence>
                {!revealed && (
                  <motion.div
                    className="absolute inset-0 grid place-items-center bg-gradient-to-b from-black/10 to-black/40"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="grid size-10 place-items-center rounded-full border border-white/10 bg-black/60 backdrop-blur">
                        <Lock className="size-4 text-white/70" />
                      </span>
                      <span className="mt-2.5 text-[13px] font-medium text-white/80">Reveal this prompt</span>
                      <span className="mt-1 max-w-[260px] text-[12px] leading-snug text-white/45">
                        Uses 1 of your {TOTAL} free reveals. Once revealed, it stays yours for good.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {revealed && (
                <>
                  {/* Top-down wipe with a light beam, as in the app's reveal */}
                  <motion.div
                    className="absolute inset-0 space-y-1 p-4 font-mono text-[12px] leading-[1.75] text-white/70 sm:text-[12.5px]"
                    initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                    animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                  >
                    {promptLines.map((l, i) => (
                      <p key={i} className={l.startsWith('#') ? 'text-white/95' : undefined}>
                        {l}
                      </p>
                    ))}
                  </motion.div>
                  {!reduce && (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 h-px bg-mint shadow-[0_0_14px_3px_rgba(92,255,176,.55)]"
                      initial={{ top: '0%', opacity: 1 }}
                      animate={{ top: '100%', opacity: [1, 1, 0] }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                    />
                  )}
                </>
              )}
            </div>

            <div className="px-5 pb-5 pt-4">
              <div className="flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                <span>Free reveals</span>
                <motion.span key={left} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-mint">
                  {left} left
                </motion.span>
              </div>
              <div className="mt-2 flex gap-[3px]" aria-hidden>
                {Array.from({ length: TOTAL }, (_, i) => (
                  <motion.span
                    key={i}
                    className={cn('h-1.5 flex-1 rounded-full', i < used ? 'bg-mint shadow-[0_0_6px_rgba(92,255,176,.6)]' : 'bg-white/[0.08]')}
                    animate={i === used - 1 && revealed ? { scaleY: [1, 2.2, 1] } : undefined}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>

              <div className="mt-5">
                {revealed ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={copy}
                      className="premium-cta premium-cta--primary flex-1 gap-2 rounded-xl py-3 text-[14px]"
                    >
                      <span className="flex items-center gap-2">
                        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                        {copied ? 'Copied to clipboard' : 'Copy prompt'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      aria-label="Reset demo"
                      className="grid size-12 place-items-center rounded-xl border border-white/[0.1] text-white/60 transition-colors hover:border-white/25 hover:text-white"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId)
                      begin()
                    }}
                    onPointerUp={release}
                    onPointerCancel={release}
                    onKeyDown={(e) => {
                      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
                        e.preventDefault()
                        begin()
                      }
                    }}
                    onKeyUp={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') release()
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    aria-label="Press and hold to reveal the prompt"
                    className="relative flex h-12 w-full touch-none select-none items-center justify-center gap-2 overflow-hidden rounded-xl border border-mint/30 bg-mint/[0.06] text-[14px] font-bold text-mint transition-transform active:scale-[0.99]"
                  >
                    <span className="relative flex items-center gap-2">
                      <Fingerprint className="size-4" /> {holdLabel}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center gap-2 bg-mint text-ink"
                      style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
                    >
                      <Fingerprint className="size-4" /> {holdLabel}
                    </span>
                  </button>
                )}
                <p className="mt-2.5 text-center text-[11.5px] text-white/35" aria-live="polite">
                  {revealed ? 'Revealed. This one is yours now.' : 'Press and hold for a moment to confirm'}
                </p>
              </div>
            </div>
          </SpotlightCard>
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(249,115,22,0.12), transparent)' }}
            aria-hidden
          />
        </Reveal>
      </div>
    </section>
  )
}
