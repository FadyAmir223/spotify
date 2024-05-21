'use client'

import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useRef, useState } from 'react'

import type { SongEssentials } from '../_types/song'

type TValueSongContext = {
  currentSong: SongEssentials | null
  songsQueue: SongEssentials[]
  queueLenght: number
  songIndex: number
  currPlaylistName: string | null
  isPlaying: boolean
}

const ValueSongContext = createContext<TValueSongContext | null>(null)

type SetterProps = {
  playlistName?: string
  songs: SongEssentials[]
  index: number
}

type TDispatchSongContext = {
  setSongsQueue: (props: SetterProps) => void
  setPlaying: Dispatch<SetStateAction<boolean>>
}

const DispatchSongContext = createContext<TDispatchSongContext | null>(null)

type SongProviderProps = {
  children: React.ReactNode
}

export default function SongProvider({ children }: SongProviderProps) {
  const [songsQueue, setSongsQueue] = useState<SongEssentials[]>([])
  const currPlaylistName = useRef<string | null>(null)

  const [currentSong, setCurrentSong] = useState<SongEssentials | null>(null)
  const songIndex = useRef(-1)

  const [isPlaying, setPlaying] = useState(false)

  const handleSongsQueue = ({
    playlistName,
    songs,
    index = 0,
  }: SetterProps) => {
    const newSong = songs[index]

    if (
      playlistName !== undefined &&
      playlistName !== currPlaylistName.current
    ) {
      currPlaylistName.current = playlistName
      songIndex.current = index
      setSongsQueue(songs)
      if (currentSong !== newSong) setCurrentSong(newSong)
      return
    }

    if (currentSong === newSong) return

    songIndex.current = index
    setCurrentSong(newSong)
  }

  const memoValue = useMemo(
    () => ({
      currentSong,
      songsQueue,
      queueLenght: songsQueue.length,
      isPlaying,
      songIndex: songIndex.current,
      currPlaylistName: currPlaylistName.current,
    }),
    [currentSong, songsQueue, isPlaying],
  )

  return (
    <DispatchSongContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ setSongsQueue: handleSongsQueue, setPlaying }}
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
