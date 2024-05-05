import { Suspense } from 'react'
import { TbPlaylist } from 'react-icons/tb'

import CreatePlaylistButton from './buttons/create-playlist-button'
import PlaylistsList from './lists/playlists-list'
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
          fallback={Array.from({ length: 5 }).map((_, i) => (
            <PlaylistSkeleton
              key={i} // eslint-disable-line react/no-array-index-key
            />
          ))}
        >
          <PlaylistsList />
        </Suspense>
      </nav>
    </section>
  )
}
