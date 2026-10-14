'use client'

/**
 * The Favorites carousel (be-promptful components/prompts/coverflow-carousel.tsx):
 * hologram cards in a 3D coverflow, the centred one lit cyan with a scan
 * sweep and a copy tab folded into its corner.
 */
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Copy, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { favoriteIds, featuredFavorite, promptById, type SamplePrompt } from '@/lib/content'
import { HarnessNote, ModelMarks, PlatformChips, PromptBody, UseCaseBadge } from './atoms'
import { MediaArt } from './media-art'

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 35, mass: 0.8 }
const RATIO = 533 / 300

const ACTIVE_GLOW = ['0 0 0 1px rgba(100,200,255,0.2)', '0 0 28px rgba(80,160,255,0.28)', '0 0 80px rgba(100,60,255,0.16)', 'inset 0 0 60px rgba(60,120,255,0.05)'].join(', ')

function cardTransform(offset: number, w: number, hovered: boolean) {
  const abs = Math.abs(offset)
  const sign = offset < 0 ? -1 : 1
  const u = w / 300
  let t =
    abs === 0
      ? { x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 10 }
      : abs === 1
        ? { x: sign * 290 * u, y: 0, scale: 0.82, rotateY: -sign * 18, opacity: 0.6, zIndex: 5 }
        : abs === 2
          ? { x: sign * 520 * u, y: 0, scale: 0.65, rotateY: -sign * 28, opacity: 0.22, zIndex: 3 }
          : { x: sign * 700 * u, y: 0, scale: 0.5, rotateY: -sign * 35, opacity: 0, zIndex: 1 }
  if (hovered && abs === 0) t = { ...t, y: -8, scale: 1.02 }
  else if (hovered && abs <= 2) t = { ...t, x: t.x - sign * 34 * u, scale: t.scale + 0.05, rotateY: t.rotateY * 0.55, opacity: Math.min(1, t.opacity + 0.3), zIndex: t.zIndex + 1 }
  return t
}

export function HologramCard({ p, active, className, style }: { p: SamplePrompt; active: boolean; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const media = p.kind !== 'text'
  return (
    <div
      className={cn('relative h-full w-full overflow-hidden rounded-2xl border bg-[#070810] transition-colors duration-500', active ? 'border-cyan-500/40' : 'border-white/[0.08]', className)}
      style={{ boxShadow: active ? ACTIVE_GLOW : '0 8px 32px rgba(0,0,0,0.5)', ...style }}
    >
      {/* scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(100,200,255,0.014) 0px, rgba(100,200,255,0.014) 1px, transparent 1px, transparent 4px)' }}
      />
      {active && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-10"
          style={{ height: '55%', background: 'linear-gradient(to bottom, transparent, rgba(100,200,255,0.055), transparent)' }}
          animate={{ y: ['-100%', '260%'] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.4 }}
        />
      )}

      {media ? (
        <div className="relative z-20 h-full w-full">
          <MediaArt k={p.art!} className="absolute inset-0" sizes="300px" />
          {p.kind === 'video' && (
            <>
              <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/[0.15] bg-white/[0.06] backdrop-blur-sm">
                <Play className="ml-0.5 size-5 fill-white text-white" />
              </span>
              {p.duration && <span className="absolute bottom-[86px] right-3 rounded border border-white/[0.15] bg-black/70 px-1.5 font-mono text-[10px] text-white/80">{p.duration}</span>}
            </>
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex flex-col items-start gap-1.5 px-4 pt-4">
            <div className="flex max-w-full items-center gap-1 rounded-full border border-white/[0.12] bg-black/30 p-0.5 backdrop-blur-md">
              <ModelMarks model={p.model} size="sm" />
              <PlatformChips names={p.platforms} max={2} />
            </div>
            <HarnessNote harness={p.harness} overlay />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex min-w-0 flex-col items-start gap-1.5 px-4 pb-4 pr-14">
            <UseCaseBadge label={p.useCase} size="sm" overlay className="max-w-full" />
            <p className="w-full truncate text-sm font-semibold leading-snug text-white">{p.title}</p>
          </div>
        </div>
      ) : (
        <div className="relative z-20 flex h-full flex-col px-4 pb-4 pt-4">
          <div className="mb-3 shrink-0">
            <div className="flex h-7 items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <ModelMarks model={p.model} size="sm" />
                <UseCaseBadge label={p.useCase} className="shrink" />
              </div>
              <PlatformChips names={p.platforms} max={2} className="shrink-0" />
            </div>
            <HarnessNote harness={p.harness} className="mt-1.5" />
          </div>
          <p className="mb-3 line-clamp-2 shrink-0 text-sm font-semibold leading-snug text-foreground">{p.title}</p>
          <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3">
            <PromptBody lines={p.body} className="h-full overflow-hidden text-[11px] leading-relaxed text-white/55 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
          </div>
          <div className="mt-3 flex h-6 shrink-0 items-center gap-1.5 overflow-hidden pr-10">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="truncate text-[11px] font-medium text-white/50">
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}

      {active && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(100,200,255,0.06) 0%, transparent 50%, rgba(120,60,255,0.04) 100%)' }}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard?.writeText(p.body.join('\n')).catch(() => {})
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }}
            className={cn(
              'group/copy absolute bottom-0 right-0 z-40 inline-flex size-11 items-center justify-center rounded-tl-2xl border-l border-t backdrop-blur-md transition-all duration-200',
              copied
                ? 'border-green-400/45 bg-green-500/25 text-green-200'
                : 'border-cyan-400/35 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(99,102,241,0.18))] text-cyan-100 hover:border-cyan-300/60 hover:text-white',
            )}
            style={{ boxShadow: copied ? '0 0 18px rgba(74,222,128,0.35)' : '0 0 18px rgba(80,200,255,0.35), inset 1px 1px 0 rgba(255,255,255,0.18)' }}
          >
            <span aria-hidden className="pointer-events-none absolute left-0 top-0 size-3.5 rounded-tl-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_60%)]" />
            {copied ? <Check className="size-4 translate-x-px translate-y-px" /> : <Copy className="size-4 translate-x-px translate-y-px transition-transform group-hover/copy:scale-110" />}
          </button>
        </>
      )}
    </div>
  )
}

/**
 * The carousel. `autoplay` turns it on its own while nobody is pointing at
 * it; clicking a side card brings it to the centre, as in the app.
 */
export function FavoritesCoverflow({
  cardW = 300,
  autoplay = 0,
  label = 'Favorites',
  className,
}: {
  cardW?: number
  /** Milliseconds between turns; 0 keeps it still. */
  autoplay?: number
  label?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const list = favoriteIds.map(promptById)
  const [active, setActive] = useState(featuredFavorite)
  const [hovered, setHovered] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const cardH = Math.round(cardW * RATIO)
  const go = useCallback((i: number) => setActive(Math.max(0, Math.min(list.length - 1, i))), [list.length])

  // Ping-pong through the shelf, starting from the featured card.
  const [dir, setDir] = useState(1)
  useEffect(() => {
    if (!autoplay || paused || reduce) return
    const t = setTimeout(() => {
      let d = dir
      if (active + d < 0 || active + d >= list.length) d = -d
      setDir(d)
      setActive(active + d)
    }, autoplay)
    return () => clearTimeout(t)
  }, [autoplay, paused, reduce, active, dir, list.length])

  return (
    <div className={cn('w-full select-none', className)} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="mb-5 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="relative grid size-3 place-items-center">
            <span className="absolute size-3 animate-ping rounded-full bg-cyan-400/25" />
            <span className="size-1.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px rgba(100,220,255,0.9)' }} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400/80" style={{ textShadow: '0 0 12px rgba(100,200,255,0.45)' }}>
            {label}
          </span>
          <span className="tabular font-mono text-[11px] text-white/55">
            {String(active + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { dir: -1, Icon: ChevronLeft, dis: active === 0, name: 'Previous favorite' },
            { dir: 1, Icon: ChevronRight, dis: active === list.length - 1, name: 'Next favorite' },
          ].map(({ dir: d, Icon, dis, name }) => (
            <button
              key={d}
              type="button"
              aria-label={name}
              disabled={dis}
              onClick={() => go(active + d)}
              className="inline-grid size-8 place-items-center rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400/50 backdrop-blur-md transition-all hover:border-cyan-400/35 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-20"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="relative" style={{ height: cardH + 24, perspective: '1200px', perspectiveOrigin: '50% 50%' }}>
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400) go(active + (info.offset.x < 0 ? 1 : -1))
          }}
        >
          {list.map((p, i) => {
            const offset = i - active
            const t = cardTransform(offset, cardW, hovered === i && !reduce)
            return (
              <motion.div
                key={p.id}
                animate={{ x: t.x, y: t.y, scale: t.scale, rotateY: t.rotateY, opacity: t.opacity, zIndex: t.zIndex }}
                initial={false}
                transition={reduce ? { duration: 0 } : SPRING}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered((h) => (h === i ? null : h))}
                onClick={() => go(i)}
                className="absolute cursor-pointer"
                style={{ left: '50%', top: '50%', width: cardW, height: cardH, marginLeft: -cardW / 2, marginTop: -cardH / 2, pointerEvents: t.opacity === 0 ? 'none' : undefined }}
              >
                <HologramCard p={p} active={i === active} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {list.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            aria-label={`Go to favorite ${i + 1}`}
            onClick={() => go(i)}
            animate={{ width: i === active ? 24 : 6, opacity: i === active ? 1 : 0.2 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
            className="h-1.5 rounded-full"
            style={{ background: i === active ? 'rgb(34,211,238)' : 'rgba(255,255,255,0.4)', boxShadow: i === active ? '0 0 8px rgba(100,220,255,0.8)' : 'none' }}
          />
        ))}
      </div>
    </div>
  )
}
