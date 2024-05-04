'use client'

import { useDispatchSong } from '../../_contexts/song-context'
import type { SongEssentials } from '../../_types/song'
import TriangleButton from './triangle-button'

type PlaySongButtonProps = {
  index: number
  songs: SongEssentials[]
}

export default function PlaySongButton({ index, songs }: PlaySongButtonProps) {
  const { setCurrentSong, setPlaybackSongs } = useDispatchSong()

  const handlePlaySong = () => {
    setPlaybackSongs(songs, 'latest')
    setCurrentSong(songs[index], index)
  }

  return (
    <TriangleButton
      className='absolute bottom-2 right-2 translate-y-1/4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
      onClick={handlePlaySong}
    />
  )
}
