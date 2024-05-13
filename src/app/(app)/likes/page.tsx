import { Suspense } from 'react'

import GradientHeart from '../_components/gradient-heart'
import Header from '../_components/header'
import LikesList from '../_components/lists/likes-list'
import SongItemSkeleton from '../_components/skeletons/song-item-skeleton'

export default function Likes() {
  return (
    <main>
      <Header>
        <div className='mt-16 flex items-center gap-x-3'>
          <GradientHeart variant='lg' />
          <div className='ml-2.5 tracking-wide'>
            <span className='mb-2 text-xs font-semibold'>Playlist</span>
            <h1 className='text-5xl font-bold'>Liked Songs</h1>
          </div>
        </div>
      </Header>

      <section className='p-4'>
        <Suspense
          fallback={Array.from(Array(6).keys()).map((i) => (
            <SongItemSkeleton key={i} />
          ))}
        >
          <LikesList />
        </Suspense>
      </section>
    </main>
  )
}
