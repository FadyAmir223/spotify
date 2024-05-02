'use client'

import { useValueSong } from '../../_contexts/song-context'
import MusicPlayerContent from './music-player-content'

export default function MusicPlayer() {
  const { currentSong: song } = useValueSong()

  if (song === null) return

  return (
    <div className='absolute bottom-0 left-0 grid h-20 w-full grid-cols-2 bg-black px-4 py-2 sm:grid-cols-3'>
      <MusicPlayerContent key={song.id} song={song} />
    </div>
  )
}
