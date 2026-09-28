/* eslint-disable @next/next/no-img-element */
import { Marquee, Reveal } from '@/components/motion/primitives'
import { cn } from '@/lib/cn'
import { harnesses, models, platforms, type Tool } from '@/lib/content'

function Chip({ t }: { t: Tool }) {
  return (
    <span className="mx-2 inline-flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.02] py-2 pl-2 pr-4 transition-colors hover:border-white/15 hover:bg-white/[0.04]">
      <span className="grid size-7 place-items-center rounded-full border border-white/[0.06] bg-black/40">
        <img src={t.logo} alt="" width={16} height={16} className={cn('size-4 object-contain', t.invert && 'invert')} loading="lazy" />
      </span>
      <span className="whitespace-nowrap text-[13.5px] font-medium text-white/70">{t.label}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/25">{t.kind}</span>
    </span>
  )
}

const dedupe = (list: Tool[]) => list.filter((t, i, a) => a.findIndex((x) => x.label === t.label) === i)

export function LogoMarquee() {
  const rowA = dedupe([...harnesses, ...models.slice(0, 3)])
  const rowB = dedupe([...models.slice(3), ...platforms])
  return (
    <section aria-labelledby="tools-heading" className="relative py-[clamp(40px,6vw,72px)]">
      <Reveal className="container-x mb-10 flex flex-col items-center text-center">
        <p id="tools-heading" className="micro text-white/40">
          Written for the tools you already run
        </p>
      </Reveal>
      <div className="space-y-3">
        <Marquee duration={55}>
          {rowA.map((t) => (
            <Chip key={t.label} t={t} />
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {rowB.map((t) => (
            <Chip key={t.label} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
