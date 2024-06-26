import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { env } from '@/lib/env'

import PlayFavoritesButton from './_components/buttons/play-likes-button'
import GradientHeart from './_components/gradient-heart'
import Header from './_components/header'
import SongsList from './_components/lists/songs-list'
import SongCardSkeleton from './_components/skeletons/song-card-skeleton'

const meta = {
  title: 'Home',
  description: 'Customize your listening experience',
  pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.pageUrl,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
  alternates: {
    canonical: meta.pageUrl,
  },
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <>
      <Header>
        <h1 className='mb-4 text-3xl font-semibold tracking-wide'>
          Welcome back
        </h1>

        <Link
          href='likes'
          className='group flex max-w-96 items-center rounded-lg bg-neutral-100/10 transition hover:bg-neutral-100/20'
        >
          <GradientHeart variant='sm' className='rounded-l-lg' />
          <span className='ml-4 flex h-14 items-center'>Liked Songs</span>
          <PlayFavoritesButton />
        </Link>
      </Header>

      <div className='p-4'>
        <h3 className='mb-4 text-2xl font-bold'>Newest songs</h3>

        <section className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
          <Suspense
            fallback={Array.from(Array(6).keys()).map((i) => (
              <SongCardSkeleton key={i} />
            ))}
          >
            <SongsList />
          </Suspense>
        </section>
      </div>
    </>
  )
}
