import Link from 'next/link'
import { cn } from '@/lib/cn'

export function Wordmark({ size = 18, className, beta = false }: { size?: number; className?: string; beta?: boolean }) {
  return (
    <span className={cn('inline-flex select-none items-center gap-2', className)}>
      <span className="flex items-center" style={{ fontSize: size, lineHeight: 1 }}>
        <span className="font-black tracking-[-0.04em] text-white">promptful</span>
        <span className="font-black text-mint">.</span>
      </span>
      {beta && (
        <span className="rounded border border-white/[0.08] px-1 py-[1px] font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-white/35">
          Beta
        </span>
      )}
    </span>
  )
}

export function Arrow({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg className={cn('cta-arrow', className)} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const sizes = {
  sm: 'text-[12.5px] px-4 py-2 rounded-[9px] gap-1.5',
  md: 'text-[14px] px-[22px] py-[11px] rounded-[10px] gap-2',
  lg: 'text-[15px] px-7 py-[14px] rounded-[12px] gap-2.5 font-extrabold',
}

export function PremiumCta({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className,
  external,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: keyof typeof sizes
  arrow?: boolean
  className?: string
  external?: boolean
}) {
  const cls = cn('premium-cta', `premium-cta--${variant}`, sizes[size], className)
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow size={size === 'sm' ? 12 : 14} />}
    </>
  )
  if (href.startsWith('#')) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </Link>
  )
}

export function StatusPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.06] px-3.5 py-[5px] backdrop-blur-md',
        className,
      )}
    >
      <span className="pulse-dot size-1.5 rounded-full bg-mint shadow-[0_0_6px_rgba(92,255,176,0.8)]" />
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-mint">{children}</span>
    </span>
  )
}

/** Section pill — Fora-style "• Intro" chip in Promptful's language */
export function SectionPill({ children, index, className }: { children: React.ReactNode; index?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] py-1 pl-2 pr-3.5 backdrop-blur-md',
        className,
      )}
    >
      <span className="grid size-5 place-items-center rounded-full bg-mint/10 ring-1 ring-mint/25">
        <span className="size-1.5 rounded-full bg-mint shadow-[0_0_8px_rgba(92,255,176,.9)]" />
      </span>
      {index && <span className="font-mono text-[10.5px] font-semibold tracking-[0.12em] text-white/30">{index}</span>}
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/70">{children}</span>
    </span>
  )
}

export function UseCaseBadge({ label, glow, className }: { label: string; glow: string; className?: string }) {
  return (
    <span
      className={cn('badge-shimmer inline-flex items-center rounded-md px-2 py-[3px] text-[10.5px] font-semibold', className)}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${glow} 12%, #0a0a0a), color-mix(in srgb, ${glow} 22%, #0a0a0a), color-mix(in srgb, ${glow} 12%, #0a0a0a))`,
        border: `1px solid color-mix(in srgb, ${glow} 40%, transparent)`,
        color: `color-mix(in srgb, ${glow} 72%, white)`,
        boxShadow: `0 0 10px color-mix(in srgb, ${glow} 22%, transparent)`,
      }}
    >
      {label}
    </span>
  )
}
