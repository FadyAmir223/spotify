import { Suspense } from 'react'
import { TbPlaylist } from 'react-icons/tb'

import CreatePlaylistButton from './buttons/create-playlist-button'
import PlaylistGetter from './playlist/playlists-getter'
import PlaylistSkeleton from './skeletons/playlist-skeleton'

export default function Library() {
  return (
    <section className='row-start-2 h-full w-[300px] overflow-y-auto rounded-lg bg-grayish-background p-3 scrollbar-hide'>
      <div className='mb-5 flex items-center justify-between px-3 text-grayish-foreground'>
        <div className='flex items-center gap-x-2'>
          <TbPlaylist className='size-5' />
          <span className='text-sm font-medium'>Your Library</span>
        </div>

        <CreatePlaylistButton />
      </div>

      <nav>
        <Suspense
          fallback={Array.from(Array(5).keys()).map((i) => (
            <PlaylistSkeleton key={i} />
          ))}
        >
          <PlaylistGetter />
        </Suspense>
      </nav>
    </section>
  )
}
