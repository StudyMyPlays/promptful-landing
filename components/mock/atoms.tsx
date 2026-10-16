/**
 * Small pieces of the current Promptful UI (be-promptful main), shared by
 * every mock: use case badges (components/ui/use-case-badge.tsx +
 * badge-surfaces.ts), model marks, the harness note, platform chips and
 * the card's round icon buttons (components/prompts/card-actions.tsx).
 */
/* eslint-disable @next/next/no-img-element */
import {
  Activity,
  BarChart2,
  Box,
  Briefcase,
  Clapperboard,
  ClipboardList,
  Code,
  Copy,
  CreditCard,
  DollarSign,
  FilePen,
  Flame,
  Gauge,
  GraduationCap,
  House,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  Palette,
  Plane,
  Scale,
  Search,
  Server,
  ServerCog,
  Share2,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  Video,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { glowFor, harnessMeta, modelMeta, platformMeta } from '@/lib/content'

export const mix = (c: string, p: number, base = 'transparent') => `color-mix(in srgb, ${c} ${p}%, ${base})`

const icons: Record<string, LucideIcon> = {
  Coding: Code,
  'Sales & Marketing': TrendingUp,
  'Content Creation': FilePen,
  Security: Shield,
  Backend: Server,
  'Real-World Use Cases': Lightbulb,
  'Data & Analytics': BarChart2,
  Research: Search,
  'UI/UX Design': Palette,
  'Writing & Communication': MessageSquare,
  'Legal & Compliance': Scale,
  'Education & Learning': GraduationCap,
  Finance: DollarSign,
  'Video Editing': Clapperboard,
  Household: House,
  Business: Briefcase,
  Travel: Plane,
  'Mobile App Development': Smartphone,
  'Social Media': Share2,
  'DevOps & Infrastructure': ServerCog,
  'Payments & Billing': CreditCard,
  'Product Management': ClipboardList,
  Performance: Gauge,
  'Parallax Website': Layers,
  'Image Gen': ImageIcon,
  'Photo Editing': WandSparkles,
  'Video Gen': Video,
  'Motion Graphics': Sparkles,
  'UGC / Creator Content': Smartphone,
  Animations: Layers,
  '3D / CGI': Box,
  'VFX / Experimental': Flame,
  'Product / E-commerce': ShoppingBag,
}

export function useCaseIcon(label: string): LucideIcon {
  return icons[label] ?? Code
}

/** badgeSurfaces(): the gradient, rim and glow every use case badge shares. */
export function badgeSurfaces(color: string) {
  const bg = mix(color, 12, '#0a0a0a')
  return {
    background: `linear-gradient(135deg, ${bg} 0%, ${mix(color, 22, '#0a0a0a')} 55%, ${bg} 100%)`,
    borderColor: mix(color, 40),
    color: mix(color, 72, 'white'),
    boxShadow: [`0 0 10px ${mix(color, 22)}`, `0 0 2px ${mix(color, 35)}`, `inset 0 1px 0 ${mix(color, 18)}`, 'inset 0 -1px 0 rgba(0,0,0,0.3)'].join(', '),
  }
}

export function UseCaseBadge({ label, size = 'md', overlay, className }: { label: string; size?: 'sm' | 'md'; overlay?: boolean; className?: string }) {
  const Icon = useCaseIcon(label)
  return (
    <span
      className={cn(
        'inline-flex min-w-0 items-center border font-medium leading-none',
        size === 'sm' ? 'h-[18px] gap-[3px] rounded-[5px] px-1.5 text-[11px] tracking-[0.01em]' : 'h-6 gap-1 rounded-md px-2 text-xs',
        overlay && 'backdrop-blur-md',
        className,
      )}
      style={badgeSurfaces(glowFor(label))}
    >
      <Icon className={cn('shrink-0', size === 'sm' ? 'size-2.5' : 'size-3')} />
      <span className="truncate">{label}</span>
    </span>
  )
}

/** The lead model's logo, with a "+N" counter on its corner for extra models. */
export function ModelMarks({ model, extra = 0, size = 'md' }: { model: string; extra?: number; size?: 'sm' | 'md' }) {
  const m = modelMeta[model]
  if (!m) return null
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={cn('inline-grid shrink-0 place-items-center overflow-hidden rounded-full border', size === 'sm' ? 'size-6 p-[3px]' : 'size-7 p-1')}
        style={{ borderColor: mix(m.color, 35), background: mix(m.color, 12) }}
      >
        <img src={m.logo} alt="" className={cn('size-full object-contain', m.invert && 'invert')} />
      </span>
      {extra > 0 && (
        <span className="absolute -bottom-1 -right-1.5 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-white/[0.15] bg-[#111] px-0.5 text-[10px] font-bold leading-none text-white/80">
          +{extra}
        </span>
      )}
    </span>
  )
}

export function HarnessNote({ harness, overlay, className }: { harness?: string; overlay?: boolean; className?: string }) {
  const h = harness ? harnessMeta[harness] : undefined
  if (!h) return null
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-baseline gap-1 overflow-hidden text-[11px] font-medium leading-none',
        overlay && 'rounded-full border border-white/[0.1] bg-black/40 px-2 py-1 backdrop-blur-md',
        className,
      )}
    >
      <span className="shrink-0 text-white/50">Use with</span>
      <span className="truncate" style={{ color: mix(h.color, 55, 'white') }}>
        {h.label}
      </span>
    </span>
  )
}

/** Platform logos in small rounded squares; a lone one shows its name. */
export function PlatformChips({ names = [], max = 3, named = false, className }: { names?: string[]; max?: number; named?: boolean; className?: string }) {
  const known = names.map((n) => platformMeta[n]).filter(Boolean)
  if (known.length === 0) return null
  if (named && known.length === 1) {
    const p = known[0]
    return (
      <span className={cn('inline-flex h-6 min-w-0 shrink-0 items-center gap-1 rounded-md border px-2', className)} style={{ borderColor: mix(p.color, 35), background: mix(p.color, 12) }}>
        <img src={p.logo} alt="" className={cn('size-3.5 shrink-0 object-contain', p.invert && 'invert')} />
        <span className="truncate text-xs font-medium leading-none text-white/80">{p.label}</span>
      </span>
    )
  }
  const shown = known.slice(0, max)
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {shown.map((p) => (
        <span key={p.label} className="inline-grid size-5 shrink-0 place-items-center overflow-hidden rounded-md border p-[2.5px]" style={{ borderColor: mix(p.color, 35), background: mix(p.color, 12) }}>
          <img src={p.logo} alt="" className={cn('size-full object-contain', p.invert && 'invert')} />
        </span>
      ))}
      {known.length > shown.length && <span className="text-[10px] font-semibold text-white/50">+{known.length - shown.length}</span>}
    </span>
  )
}

export function HeartGlyph({ filled = false, size = 13, className }: { filled?: boolean; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 20.6c-.35 0-.69-.12-.96-.35-3.02-2.54-5.17-4.5-6.5-6.3C3.2 12.14 2.7 10.66 2.7 9.06 2.7 6.2 4.86 4 7.6 4c1.75 0 3.34.9 4.4 2.35C13.06 4.9 14.65 4 16.4 4c2.74 0 4.9 2.2 4.9 5.06 0 1.6-.5 3.08-1.84 4.89-1.33 1.8-3.48 3.76-6.5 6.3-.27.23-.61.35-.96.35Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'rgba(255,255,255,0.85)' : 'currentColor'}
        strokeWidth={filled ? 1.4 : 1.7}
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ICON_BTN = 'inline-grid size-7 shrink-0 place-items-center rounded-full border backdrop-blur-sm'
const ICON_IDLE = 'border-white/[0.1] bg-black/40 text-white/55'

export function FavoriteDot({ on = false }: { on?: boolean }) {
  return (
    <span className={cn(ICON_BTN, on ? 'border-red-500/40 bg-red-500/10 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.22)]' : ICON_IDLE)}>
      <HeartGlyph filled={on} />
    </span>
  )
}

export function CopyDot({ locked = false }: { locked?: boolean }) {
  return <span className={cn(ICON_BTN, ICON_IDLE)}>{locked ? <Lock className="size-[13px]" /> : <Copy className="size-[13px]" />}</span>
}

export function RunsBadge({ count, overlay }: { count: number; overlay?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 min-w-7 shrink-0 items-center justify-center gap-1 rounded-lg border px-2 text-sm font-semibold',
        overlay ? 'border-white/15 bg-black/40 text-white/80 backdrop-blur-sm' : 'border-white/10 bg-white/5 text-muted-foreground',
      )}
    >
      <Activity className="size-3.5" />
      {count.toLocaleString('en-US')}
    </span>
  )
}

export function TagChip({ tag, small }: { tag: string; small?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex min-w-0 items-center gap-0.5 truncate rounded-md border border-white/[0.07] bg-white/[0.04] font-medium leading-none tracking-wide text-white/60',
        small ? 'h-5 px-1.5 text-[11px]' : 'h-6 px-2 text-[11px]',
      )}
    >
      <span className="text-white/50">#</span>
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </span>
  )
}

/** A prompt body: "## " lines render as headings at the body size. */
export function PromptBody({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {lines.map((l, i) =>
        l.startsWith('## ') ? (
          <p key={i} className="pt-0.5 font-semibold text-white/80">
            {l.slice(3)}
          </p>
        ) : (
          <p key={i}>{l}</p>
        ),
      )}
    </div>
  )
}

export function Wordmark({ size = 16 }: { size?: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-semibold leading-none tracking-[-0.02em] text-white" style={{ fontSize: size }}>
        promptful<span className="text-primary">.</span>
      </span>
      <span className="rounded-full border border-white/[0.1] px-1.5 py-[3px] text-[9px] font-medium uppercase leading-none tracking-[0.22em] text-white/45">Beta</span>
    </span>
  )
}
