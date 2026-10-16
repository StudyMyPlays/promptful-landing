import { Menu, Search } from 'lucide-react'
import { FavoritesMeter } from './app'
import { Wordmark } from './atoms'
import { FavoritesCoverflow } from './hologram'

export const PHONE_W = 390
export const PHONE_H = 760

/** The Favorites view on a phone: the hologram carousel leads, one swipe per card. */
export function PhoneFavorites({ autoplay = 0 }: { autoplay?: number }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[34px] border border-white/[0.1] bg-surface p-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,.95)]">
      <div className="relative h-full overflow-hidden rounded-[27px] bg-background">
        <div className="flex h-14 items-center justify-between border-b border-white/[0.05] px-5">
          <Wordmark size={17} />
          <Menu className="size-5 text-white/50" />
        </div>
        <div className="space-y-3 px-4 pt-4">
          <div className="flex h-11 items-center gap-3 rounded-md border border-white/[0.08] pl-4 text-[14px] text-white/35">
            <Search className="size-4" /> Search favorites...
          </div>
          <FavoritesMeter />
        </div>
        <div className="-mx-1 mt-4">
          <FavoritesCoverflow cardW={250} autoplay={autoplay} />
        </div>
      </div>
    </div>
  )
}
