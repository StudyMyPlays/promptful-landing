'use client'

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Mail, Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { EASE, Reveal, SplitReveal } from '@/components/motion/primitives'
import { PremiumCta, SectionPill } from '@/components/ui/brand'
import { cn } from '@/lib/cn'
import { faqs } from '@/lib/content'
import { links } from '@/lib/site'

type Cat = keyof typeof faqs
const cats = Object.keys(faqs) as Cat[]

export function Faq() {
  const [cat, setCat] = useState<Cat>('General')
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section id="faq" className="relative py-[clamp(96px,13vw,180px)]">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionPill>FAQ</SectionPill>
          </Reveal>
          <SplitReveal className="display-md mt-6 text-balance" lines={[['Honest answers.'], [{ text: 'No fine print.', className: 'text-white/45' }]]} />
          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-white/[0.07] pt-6">
              <Mail className="size-5 text-mint" />
              <div className="mt-4 text-[16px] font-semibold tracking-[-0.01em]">Still wondering?</div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-white/50">We read every message, and we answer fast.</p>
              <PremiumCta href={links.support} variant="secondary" size="sm" className="mt-5">
                support@promptful.org
              </PremiumCta>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <LayoutGroup id="faq-tabs">
              <div role="tablist" aria-label="FAQ categories" className="scrollbar-hide -mx-1 flex gap-1 overflow-x-auto px-1">
                {cats.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={c === cat}
                    onClick={() => {
                      setCat(c)
                      setOpen(0)
                    }}
                    className={cn(
                      'relative shrink-0 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors',
                      c === cat ? 'text-white' : 'text-white/45 hover:text-white/75',
                    )}
                  >
                    {c === cat && (
                      <motion.span layoutId="faq-pill" className="absolute inset-0 -z-10 rounded-full border border-white/[0.08] bg-white/[0.05]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    {c}
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </Reveal>

          <div className="mt-6 border-t border-white/[0.07]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
                {faqs[cat].map((f, i) => {
                  const isOpen = open === i
                  const id = `${uid}-${cat}-${i}`
                  return (
                    <div key={f.q} className="border-b border-white/[0.07]">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={id}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-center gap-4 py-5 text-left"
                        >
                          <span className={cn('flex-1 text-[15.5px] font-medium tracking-[-0.01em] transition-colors', isOpen ? 'text-white' : 'text-white/75')}>{f.q}</span>
                          <span className={cn('grid size-6 shrink-0 place-items-center transition-colors duration-200', isOpen ? 'text-mint' : 'text-white/45')}>
                            {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={id}
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pr-12 text-[14.5px] leading-relaxed text-white/55">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
