import { Search, SlidersHorizontal } from 'lucide-react'
import { Wordmark } from '@/components/ui/brand'
import { samplePrompts } from '@/lib/content'
import { PromptCard, UsageMeter } from './app'

export const PHONE_W = 390
export const PHONE_H = 720

/** Mobile layout of the library — used instead of shrinking the desktop UI on phones. */
export function PhoneLibrary() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[34px] border border-white/[0.1] bg-[#050606] p-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,.95)]">
      <div className="relative h-full overflow-hidden rounded-[27px] border border-white/[0.05] bg-[#060707]">
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Wordmark size={18} beta />
          <span className="grid size-8 place-items-center rounded-lg border border-white/[0.08] text-white/50">
            <SlidersHorizontal className="size-3.5" />
          </span>
        </div>
        <div className="mx-5 flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 text-[13px] text-white/35">
          <Search className="size-4" /> Search 124 prompts…
        </div>
        <div className="scrollbar-hide mt-3 flex gap-2 overflow-hidden px-5">
          {['Coding', 'Research', 'Legal', 'Content'].map((f, i) => (
            <span
              key={f}
              className={
                i === 0
                  ? 'shrink-0 rounded-lg border border-mint/50 bg-mint/[0.08] px-2.5 py-1.5 text-[12px] text-mint'
                  : 'shrink-0 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[12px] text-white/45'
              }
            >
              {f}
            </span>
          ))}
        </div>
        <div className="space-y-3 px-5 pt-4">
          <div className="h-[268px]">
            <PromptCard p={samplePrompts[0]} highlight />
          </div>
          <div className="h-[268px]">
            <PromptCard p={samplePrompts[3]} locked />
          </div>
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <UsageMeter className="bg-[#0a0b0b]/95 backdrop-blur" />
        </div>
      </div>
    </div>
  )
}
