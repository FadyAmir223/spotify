'use client'

import { useEffect } from 'react'

import { useValueSong } from '../../_contexts/song-context'
import VolumeProvider from '../../_contexts/volume-context'
import MusicPlayerContent from './music-player-content'

export default function MusicPlayer() {
  const { currentSong: song } = useValueSong()

  useEffect(() => {
    const el = document.getElementById('app')

    if (song !== null) {
      el?.classList.add('h-[calc(100vh-5rem)]')
      el?.classList.remove('h-screen')
    } else {
      el?.classList.add('h-screen')
      el?.classList.remove('h-[calc(100vh-5rem)]')
    }
  }, [song])

  if (song === null) return

  return (
    <VolumeProvider>
      <MusicPlayerContent key={song.id} song={song} />
    </VolumeProvider>
  )
}
