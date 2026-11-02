import { Menu, Search } from 'lucide-react'
import { promptById } from '@/lib/content'
import { PromptCard } from './app'
import { Wordmark } from './atoms'

export const PHONE_W = 390
export const PHONE_H = 760

/** The Library on a phone: search on top, then the prompt cards in one column. */
export function PhoneLibrary() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[34px] border border-white/[0.1] bg-surface p-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,.95)]">
      <div className="relative h-full overflow-hidden rounded-[27px] bg-background">
        <div className="flex h-14 items-center justify-between border-b border-white/[0.05] px-5">
          <Wordmark size={17} />
          <Menu className="size-5 text-white/50" />
        </div>
        <div className="px-4 pt-4">
          <div className="flex h-11 items-center gap-3 rounded-md border border-white/[0.08] pl-4 text-[14px] text-white/35">
            <Search className="size-4" /> Search prompts...
          </div>
        </div>
        <div className="space-y-3 px-4 pt-4 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
          <PromptCard p={promptById('code-review')} hover />
          <PromptCard p={promptById('hooks')} />
        </div>
      </div>
    </div>
  )
}
