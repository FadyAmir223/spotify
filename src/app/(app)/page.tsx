import Link from 'next/link'
import { Suspense } from 'react'
import { FaHeart } from 'react-icons/fa'
import { RxTriangleRight } from 'react-icons/rx'

import Header from './_components/header'
import SongSkeleton from './_components/skeletons/song-skeleton'
import SongsList from './_components/songs-list'

export default async function Home() {
  return (
    <>
      <Header>
        <h1 className='mb-4 text-3xl font-semibold tracking-wide'>
          Welcome back
        </h1>

        <Link
          href='likes'
          className='group flex w-96 items-center rounded-r-lg bg-neutral-100/10 transition hover:bg-neutral-100/20'
        >
          <div className='grid size-14 place-items-center rounded-l-lg bg-gradient-to-br from-indigo-700 to-slate-400'>
            <FaHeart className='size-5' />
          </div>
          <span className='ml-4 flex h-14 items-center'>Liked Songs</span>
          <div className='ml-auto mr-4 size-10 rounded-full bg-primary p-1 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100'>
            <RxTriangleRight className='size-8 text-black' />
          </div>
        </Link>
      </Header>

      <div className='p-4'>
        <h3 className='mb-4 text-2xl font-bold'>Newest songs</h3>

        <section className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
          <Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <SongSkeleton
                key={i} // eslint-disable-line react/no-array-index-key
              />
            ))}
          >
            <SongsList />
          </Suspense>
        </section>
      </div>
    </>
  )
}
