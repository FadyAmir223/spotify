'use client'

import { createContext, useContext, useMemo, useRef, useState } from 'react'

import type { SongEssentials } from '../_types/song'

type TValueSongContext = {
  currentSong: SongEssentials | null
  playbackSongs: SongEssentials[]
  songIndex: number
}

const ValueSongContext = createContext<TValueSongContext | null>(null)

type TDispatchSongContext = {
  setPlaybackSongs: (songs: SongEssentials[], name: string) => void
  setCurrentSong: (song: SongEssentials, index: number) => void
}

const DispatchSongContext = createContext<TDispatchSongContext | null>(null)

type SongProviderProps = {
  children: React.ReactNode
}

export default function SongProvider({ children }: SongProviderProps) {
  const [playbackSongs, setPlaybackSongs] = useState<SongEssentials[]>([])
  const playlistName = useRef('')

  const [currentSong, setCurrentSong] = useState<SongEssentials | null>(null)
  const songIndex = useRef(-1)

  const handlePlaybackSongsChange = (songs: SongEssentials[], name: string) => {
    if (name === playlistName.current) return
    playlistName.current = name
    setPlaybackSongs(songs)
  }

  const handleSongChange = (song: SongEssentials, index: number) => {
    setCurrentSong(song)
    songIndex.current = index
  }

  const memoValue = useMemo(
    () => ({
      currentSong,
      playbackSongs,
      songIndex: songIndex.current,
    }),
    [currentSong, playbackSongs],
  )

  return (
    <DispatchSongContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        setCurrentSong: handleSongChange,
        setPlaybackSongs: handlePlaybackSongsChange,
      }}
    >
      <ValueSongContext.Provider value={memoValue}>
        {children}
      </ValueSongContext.Provider>
    </DispatchSongContext.Provider>
  )
}

export function useValueSong() {
  const value = useContext(ValueSongContext)

  if (value === null)
    throw new Error('useValueSong should be used within SongProvider')

  return value
}

export function useDispatchSong() {
  const dispatch = useContext(DispatchSongContext)

  if (dispatch === null)
    throw new Error(
      'useDispatchSong should be used within DispatchSongContext provider',
    )

  return dispatch
}
