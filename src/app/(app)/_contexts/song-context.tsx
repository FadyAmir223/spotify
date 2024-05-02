'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useRef, useState } from 'react'

import { initVolume } from '@/utils/constants'

import type { SongEssentials } from '../_types/song'

type TValueSongContext = {
  currentSong: SongEssentials | null
  songs: SongEssentials[]
  songIndex: number
  volume: number
}

const ValueSongContext = createContext<TValueSongContext | null>(null)

type TDispatchSongContext = {
  setCurrentSong: (song: SongEssentials, index: number) => void
  setSongs: Dispatch<SetStateAction<SongEssentials[]>>
  setVolume: {
    (type: 'set', value: number): void
    (type: 'reset'): void
  }
}

const DispatchSongContext = createContext<TDispatchSongContext | null>(null)

type SongProviderProps = {
  children: ReactNode
}

export default function SongProvider({ children }: SongProviderProps) {
  // song
  const [currentSong, setCurrentSong] = useState<SongEssentials | null>(null)
  const [songs, setSongs] = useState<SongEssentials[]>([])
  const songIndex = useRef(-1)

  const handleSongChange = (song: SongEssentials, index: number) => {
    setCurrentSong(song)
    songIndex.current = index
  }

  // volume
  const [volume, setVolume] = useState(initVolume)
  const playbackBeforeMute = useRef(volume)

  function handleVolumeChange(type: 'set', value: number): void
  function handleVolumeChange(type: 'reset'): void

  function handleVolumeChange(type: 'set' | 'reset', value?: number): void {
    if (type === 'set' && value !== undefined) {
      if (value === 0) playbackBeforeMute.current = volume
      setVolume(value)
    } else if (type === 'reset') setVolume(playbackBeforeMute.current)
  }

  // context
  const memoValue = useMemo(
    () => ({ currentSong, songs, songIndex: songIndex.current, volume }),
    [currentSong, songs, volume],
  )

  return (
    <DispatchSongContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        setCurrentSong: handleSongChange,
        setSongs,
        setVolume: handleVolumeChange,
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
    throw new Error(
      'useValueSong should be used within ValueSongContext provider',
    )

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
