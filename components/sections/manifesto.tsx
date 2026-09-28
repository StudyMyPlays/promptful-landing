import { Reveal, ScrubText } from '@/components/motion/primitives'
import { SectionPill } from '@/components/ui/brand'

const paragraphs = [
  {
    text: 'Promptful is a curated library of production-ready prompts. Every one is written by hand, run before it ships, and tagged with the use case it solves.',
    highlight: ['production-ready', 'written', 'by', 'hand'],
  },
  {
    text: 'Each card tells you exactly where it runs — Claude Code, Codex, Perplexity Comet — and which model it was tuned for. No guessing which window to paste into.',
    highlight: [],
  },
  {
    text: 'When one prompt is not enough, chains string them into ordered, repeatable runs. You bring the work. The library brings the playbook.',
    highlight: ['chains'],
  },
]

export function Manifesto() {
  return (
    <section id="intro" className="relative py-[clamp(96px,14vw,200px)]">
      <div className="container-x">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <SectionPill index="01">Intro</SectionPill>
          </Reveal>
          <div className="mt-10 space-y-[1.1em] text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.3] tracking-[-0.025em]">
            {paragraphs.map((p, i) => (
              <ScrubText key={i} text={p.text} highlight={p.highlight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
