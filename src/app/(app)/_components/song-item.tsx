'use client'

import { forwardRef, type Ref } from 'react'

import { Button } from '@/components/ui/button'
import type { getLikedSongs } from '@/data/user'

import { useDispatchSong } from '../_contexts/song-context'
import ArtistMedia from './artist-media'
import LikeButton from './buttons/like-button'

type SongsWithArtist = Awaited<ReturnType<typeof getLikedSongs>>

type SongItemProps = {
  index: number
  songs: SongsWithArtist
  playlistName: string
}

export default forwardRef(function SongItem(
  { index, songs, playlistName }: SongItemProps,
  ref: Ref<HTMLLIElement> | null,
) {
  const { setSongsQueue } = useDispatchSong()

  const song = songs[index]

  return (
    <li ref={ref} className='flex items-center gap-x-3'>
      <ArtistMedia
        As={Button}
        variant='none'
        size='none'
        className='w-full rounded-md p-2'
        artistName={song.artist.name}
        song={{ title: song.title, imagePath: song.imagePath }}
        onClick={() => setSongsQueue({ playlistName, songs, index })}
      />

      <LikeButton songId={song.id} />
    </li>
  )
})
