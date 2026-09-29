import { Menu, Search } from 'lucide-react'
import { samplePrompts } from '@/lib/content'
import { PromptCard, UsageMeter } from './app'

export const PHONE_W = 390
export const PHONE_H = 720

/** Mobile layout of the library, used instead of shrinking the desktop UI on phones. */
export function PhoneLibrary() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[34px] border border-white/[0.1] bg-surface p-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,.95)]">
      <div className="relative h-full overflow-hidden rounded-[27px] bg-background">
        <div className="flex h-14 items-center justify-between border-b border-white/[0.05] px-5">
          <span className="flex items-center gap-1.5">
            <span className="text-[17px] font-black tracking-tight text-white">
              promptful<span className="text-mint">.</span>
            </span>
            <span className="rounded border border-white/[0.1] px-1 py-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-white/25">Beta</span>
          </span>
          <Menu className="size-5 text-white/50" />
        </div>
        <div className="space-y-3 px-4 pt-4">
          <div className="flex h-11 items-center gap-3 rounded-md border border-white/[0.08] pl-4 text-[14px] text-white/35">
            <Search className="size-4" /> Search prompts...
          </div>
          <UsageMeter />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">42</span> prompts
          </p>
          <PromptCard p={samplePrompts[0]} hover favorite />
          <PromptCard p={samplePrompts[3]} locked />
        </div>
      </div>
    </div>
  )
}
