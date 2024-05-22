import type { User } from '@prisma/client'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { PiMicrophoneStageFill } from 'react-icons/pi'

import { getArtistById, getArtistIds } from '@/data/user/user'
import { env } from '@/lib/env'

import Header from '../../_components/header'
import SongItemSkeleton from '../../_components/skeletons/song-item-skeleton'
import SongItem from '../../_components/song-item'
import { artistIdSchema } from '../../_validations/artist'

type ArtistProps = {
  params: { artistId: string }
}

// dynamic metadata (non blocking because of ISR)
export async function generateMetadata({
  params,
}: ArtistProps): Promise<Metadata> {
  const { artistId } = params
  const artist = await getArtistById(artistId)

  const meta = {
    title: `${artist?.name} | artist`,
    description: 'Right now about 1,000,000 monthly listeners',
    pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/artist/${artistId}`,
    image: artist?.image || '/meta-image.webp',
  }

  return {
    title: { absolute: meta.title },
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.pageUrl,
      images: [{ url: meta.image }],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: meta.image,
    },
    alternates: {
      canonical: meta.pageUrl,
    },
  }
}

// if new artist registered he will SSR in the mean time
// if an artist uploaded new song it will only be available after half hour at most
export const revalidate = 1800

// ISR
export async function generateStaticParams() {
  const artistsIds = await getArtistIds()
  return artistsIds.map(({ id }) => ({ artistId: id }))
}

type PageProps = {
  artistId: User['id']
}

async function Page({ artistId }: PageProps) {
  const artist = await getArtistById(artistId)
  if (!artist) notFound()

  const artistSongs = artist.songs.map((song) => ({
    artist: { id: artistId, name: artist.name },
    ...song,
  }))

  return (
    <main>
      <Header>
        <div className='mt-16 flex items-center gap-x-3'>
          {artist.image ? (
            <div className='relative aspect-square size-16'>
              <Image
                src={artist.image}
                alt={`${artist.name} artist`}
                className='rounded-sm'
                sizes='4rem'
                fill
                priority
              />
            </div>
          ) : (
            <div className='grid size-16 place-items-center rounded-sm bg-gray-700/70'>
              <PiMicrophoneStageFill className='size-[2.4rem]' />
            </div>
          )}

          <div className='ml-2.5 tracking-wide'>
            <span className='mb-2 text-xs font-semibold'>Artist</span>
            <h1 className='text-xl font-bold'>{artist.name}</h1>
          </div>
        </div>
      </Header>

      <section className='p-4'>
        {artist.songs.length === 0 ? (
          <p className='mt-3 text-center text-sm text-neutral-400'>
            This artist has no released songs yet
          </p>
        ) : (
          artist.songs.map((song, index) => (
            <SongItem
              key={song.id}
              index={index}
              songs={artistSongs}
              playlistName={artistId}
            />
          ))
        )}
      </section>
    </main>
  )
}

export default function Artist({ params }: ArtistProps) {
  const result = artistIdSchema.safeParse(params)
  if (!result.success) notFound()

  return (
    <Suspense
      fallback={
        <>
          <Header>
            <div className='mt-16 flex animate-pulse items-center gap-x-3'>
              <div className='size-16 rounded-sm bg-neutral-600' />

              <div className='ml-2.5 tracking-wide'>
                <div className='mb-2 h-3.5 w-24 rounded-md bg-neutral-600' />
                <div className='h-4 w-44 rounded-md bg-neutral-600' />
              </div>
            </div>
          </Header>

          <div className='p-4'>
            {Array.from(Array(6).keys()).map((i) => (
              <SongItemSkeleton key={i} />
            ))}
          </div>
        </>
      }
    >
      <Page artistId={result.data.artistId} />
    </Suspense>
  )
}
