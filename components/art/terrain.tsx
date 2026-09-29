/**
 * Code-drawn nocturnal terrain: the fallback (and texture layer) for the
 * generated landscape imagery. Deterministic so SSR and client match.
 */
import Image from 'next/image'
import { cn } from '@/lib/cn'
import type { Asset } from '@/lib/assets'

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type RidgeOpts = {
  seed: number
  width?: number
  height: number
  base: number // 0..1 baseline from top
  amp: number // 0..1 amplitude relative to height
  octaves?: number
  roughness?: number
  points?: number
  hills?: number // number of big hills across
}

export function ridgePath({ seed, width = 1600, height, base, amp, octaves = 5, roughness = 0.5, points = 220, hills = 2.2 }: RidgeOpts) {
  const rand = mulberry32(seed)
  const layers = Array.from({ length: octaves }, (_, o) => ({
    f: hills * Math.pow(2.15, o) * (0.85 + rand() * 0.3),
    p: rand() * Math.PI * 2,
    a: Math.pow(roughness, o),
  }))
  const norm = layers.reduce((s, l) => s + l.a, 0)
  const pts: string[] = []
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width
    const t = i / points
    let n = 0
    for (const l of layers) n += Math.sin(t * Math.PI * 2 * l.f + l.p) * l.a
    n /= norm
    const y = height * base - n * height * amp
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M0,${height} L${pts.join(' L')} L${width},${height} Z`
}

export function ridgeLine(opts: RidgeOpts) {
  return ridgePath(opts).replace(/^M0,[\d.]+ L/, 'M').replace(/ L[\d.]+,[\d.]+ Z$/, '')
}

export function Ridge({
  className,
  seed,
  height = 600,
  base,
  amp,
  octaves,
  roughness,
  hills,
  top = '#0b1512',
  bottom = '#020304',
  rim = 0,
  rimColor = '#5cffb0',
  points,
  preserve = 'none',
  texture = 0,
}: RidgeOpts & {
  texture?: number
  className?: string
  top?: string
  bottom?: string
  rim?: number
  rimColor?: string
  preserve?: string
}) {
  const id = `r${seed}`
  const d = ridgePath({ seed, height, base, amp, octaves, roughness, hills, points })
  const line = ridgeLine({ seed, height, base, amp, octaves, roughness, hills, points })
  return (
    <svg className={cn('block h-full w-full', className)} viewBox={`0 0 1600 ${height}`} preserveAspectRatio={preserve} aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset={Math.max(0, base - amp)} stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={rimColor} stopOpacity="0" />
          <stop offset="0.5" stopColor={rimColor} stopOpacity={rim} />
          <stop offset="1" stopColor={rimColor} stopOpacity="0" />
        </linearGradient>
        {texture > 0 && (
          <filter id={`${id}-tex`} x="0" y="-20%" width="100%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.09" numOctaves="3" seed={seed} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={texture} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        )}
        {rim > 0 && (
          <filter id={`${id}-blur`} x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        )}
      </defs>
      <g filter={texture > 0 ? `url(#${id}-tex)` : undefined}>
        {rim > 0 && <path d={line} fill="none" stroke={`url(#${id}-rim)`} strokeWidth="14" filter={`url(#${id}-blur)`} />}
        <path d={d} fill={`url(#${id}-fill)`} />
        {rim > 0 && (
          <path d={line} fill="none" stroke={`url(#${id}-rim)`} strokeOpacity="0.55" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        )}
      </g>
    </svg>
  )
}

/** Night sky: gradient, drifting aurora ribbons, and a sparse star field. */
export function NightSky({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  const rand = mulberry32(7)
  const stars = Array.from({ length: 70 }, () => ({
    x: rand() * 100,
    y: rand() * 55,
    r: rand() * 1.1 + 0.3,
    d: rand() * 6,
    o: rand() * 0.5 + 0.2,
  }))
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 100%, #0b2a20 0%, #06120e 35%, #030706 60%, #020304 100%)',
        }}
      />
      <div
        className="aurora-drift absolute -inset-x-[20%] top-[18%] h-[60%]"
        style={{
          opacity: 0.9 * intensity,
          background:
            'radial-gradient(40% 55% at 30% 60%, rgba(92,255,176,0.20), transparent 70%), radial-gradient(35% 45% at 68% 50%, rgba(56,220,200,0.14), transparent 70%), radial-gradient(60% 40% at 50% 85%, rgba(92,255,176,0.16), transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
      <div
        className="aurora-drift absolute -inset-x-[10%] top-[30%] h-[40%]"
        style={{
          animationDuration: '26s',
          animationDirection: 'reverse',
          opacity: 0.7 * intensity,
          background:
            'conic-gradient(from 200deg at 50% 120%, transparent 0deg, rgba(92,255,176,0.12) 40deg, transparent 80deg, rgba(120,255,214,0.08) 120deg, transparent 160deg)',
          filter: 'blur(40px)',
        }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#e8fff4]"
          style={{
            left: `${s.x.toFixed(2)}%`,
            top: `${s.y.toFixed(2)}%`,
            width: `${(s.r * 1.6).toFixed(2)}px`,
            height: `${(s.r * 1.6).toFixed(2)}px`,
            opacity: Number(s.o.toFixed(2)),
            animation: `star-twinkle ${(4 + s.d).toFixed(2)}s ease-in-out ${s.d.toFixed(2)}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** Renders the generated asset when ready, otherwise the provided fallback art. */
export function ArtSlot({
  asset,
  fallback,
  className,
  priority,
  sizes = '100vw',
  objectPosition = 'center',
  unoptimized,
}: {
  asset: Asset
  fallback: React.ReactNode
  className?: string
  priority?: boolean
  sizes?: string
  objectPosition?: string
  /** Serve the file as-is. Use for alpha-keyed cut-outs: re-encoding smears their edges. */
  unoptimized?: boolean
}) {
  if (!asset.ready) return <>{fallback}</>
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={sizes}
      unoptimized={unoptimized}
      className={cn('h-full w-full object-cover', className)}
      style={{ objectPosition }}
    />
  )
}
