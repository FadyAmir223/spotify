'use client'

import type { getSongs } from '@/data/song'
import { cn } from '@/utils/cn'

import { useDispatchSong, useValueSong } from '../../_contexts/song-context'
import TriangleButton from './triangle-button'

type PlaySongButtonProps = {
  index: number
  songs: Awaited<ReturnType<typeof getSongs>>
}

export default function PlaySongButton({ index, songs }: PlaySongButtonProps) {
  const { songsQueue, songIndex } = useValueSong()
  const { setSongsQueue } = useDispatchSong()

  const isSongMatching = songsQueue[songIndex]?.id === songs[index].id

  return (
    <TriangleButton
      className={cn(
        'absolute bottom-2 right-2 group-hover:translate-y-0 group-hover:opacity-100',
        {
          'translate-y-1/4 opacity-0': !isSongMatching,
        },
      )}
      onClick={() => setSongsQueue({ playlistName: 'latest', songs, index })}
      isMatching={isSongMatching}
    />
  )
}
