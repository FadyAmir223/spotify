'use client'

import { useValueSong } from '../../_contexts/song-context'
import VolumeProvider from '../../_contexts/volume-context'
import MusicPlayerContent from './music-player-content'

export default function MusicPlayer() {
  const { currentSong: song } = useValueSong()

  if (song === null) return

  return (
    <VolumeProvider>
      <MusicPlayerContent key={song.id} song={song} />
    </VolumeProvider>
  )
}
