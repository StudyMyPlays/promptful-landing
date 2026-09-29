/* eslint-disable @next/next/no-img-element */
import { Marquee, Reveal } from '@/components/motion/primitives'
import { cn } from '@/lib/cn'
import { harnesses, models, platforms, type Tool } from '@/lib/content'

const tools = [...harnesses, ...models, ...platforms].filter((t, i, a) => a.findIndex((x) => x.label === t.label) === i)

export function LogoMarquee() {
  return (
    <section aria-labelledby="tools-heading" className="relative py-[clamp(32px,5vw,56px)]">
      <Reveal className="container-x mb-8 text-center">
        <p id="tools-heading" className="text-[14px] text-white/40">
          Written for the tools you already run
        </p>
      </Reveal>
      <Marquee duration={50}>
        {tools.map((t: Tool) => (
          <span key={t.label} className="mx-7 inline-flex items-center gap-2.5 opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0">
            <img src={t.logo} alt={t.label} width={22} height={22} className={cn('size-[22px] object-contain', t.invert && 'invert')} loading="lazy" />
            <span className="whitespace-nowrap text-[15px] font-medium text-white/70">{t.label}</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
