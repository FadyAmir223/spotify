'use client'

import type { getSongs } from '@/data/song'

import { useDispatchSong } from '../../_contexts/song-context'
import TriangleButton from './triangle-button'

type PlaySongButtonProps = {
  index: number
  songs: Awaited<ReturnType<typeof getSongs>>
}

export default function PlaySongButton({ index, songs }: PlaySongButtonProps) {
  const { setSongsQueue } = useDispatchSong()

  return (
    <TriangleButton
      className='absolute bottom-2 right-2 translate-y-1/4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
      onClick={() => setSongsQueue({ playlistName: 'latest', songs, index })}
    />
  )
}
