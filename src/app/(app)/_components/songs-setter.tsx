'use client'

import { useEffect } from 'react'

import { useDispatchSong } from '../_contexts/song-context'
import type { SongEssentials } from '../_types/song'

type SongsSetterProps = {
  songs: SongEssentials[]
}

export default function SongsSetter({ songs }: SongsSetterProps) {
  const { setSongs } = useDispatchSong()

  useEffect(() => {
    if (songs) setSongs(songs)
  }, [songs]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
