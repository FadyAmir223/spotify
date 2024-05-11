import type { Playlist as TPlaylist } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { PiPlaylistFill } from 'react-icons/pi'

import { getPlaylistById } from '@/data/playlist'

import Header from '../../_components/header'
import SongItemSkeleton from '../../_components/skeletons/song-item-skeleton'
import SongItem from '../../_components/song-item'
import { playlistIdSchema } from '../../_validations/playlist'

type PageProps = {
  playlistId: TPlaylist['id']
}

async function Page({ playlistId }: PageProps) {
  const playlist = await getPlaylistById(playlistId)
  if (!playlist) notFound()

  return (
    <main>
      <Header>
        <div className='mt-16 flex items-center gap-x-3'>
          {playlist.imagePath ? (
            <div className='relative aspect-square size-16'>
              <Image
                src={playlist.imagePath}
                alt={`${playlist.title} playlist`}
                className='rounded-sm'
                sizes='4rem'
                fill
              />
            </div>
          ) : (
            <div className='grid size-16 place-items-center rounded-sm bg-gray-700/70'>
              <PiPlaylistFill className='size-[2.4rem]' />
            </div>
          )}

          <div className='ml-2.5 tracking-wide'>
            <span className='mb-2 text-xs font-semibold'>Playlist</span>
            <h1 className='text-xl font-bold'>{playlist.title}</h1>
          </div>
        </div>
      </Header>

      <section className='p-4'>
        {playlist.songs.length === 0 ? (
          <p className='mt-3 text-center text-sm text-neutral-400'>
            this playlist has no songs yet
          </p>
        ) : (
          playlist.songs.map((song, index) => (
            <SongItem
              key={song.id}
              index={index}
              songs={playlist.songs}
              playlistName={playlistId}
            />
          ))
        )}
      </section>
    </main>
  )
}

export default async function Playlist({
  params,
}: {
  params: { playlistId: string }
}) {
  const result = playlistIdSchema.safeParse(params)
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
            {Array.from({ length: 6 }).map((_, i) => (
              <SongItemSkeleton
                key={i} // eslint-disable-line react/no-array-index-key
              />
            ))}
          </div>
        </>
      }
    >
      <Page playlistId={result.data.playlistId} />
    </Suspense>
  )
}
