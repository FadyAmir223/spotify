'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

import type { SongEssentials } from '../_types/song'

type TValueSongContext = {
  song: SongEssentials | null
}

const ValueSongContext = createContext<TValueSongContext | null>(null)

type TDispatchSongContext = Dispatch<SetStateAction<SongEssentials | null>>

const DispatchSongContext = createContext<TDispatchSongContext | null>(null)

type SongProviderProps = {
  children: ReactNode
}

export default function SongProvider({ children }: SongProviderProps) {
  const [song, setSong] = useState<SongEssentials | null>(null)
  const memoSong = useMemo(() => ({ song }), [song])

  return (
    <DispatchSongContext.Provider value={setSong}>
      <ValueSongContext.Provider value={memoSong}>
        {children}
      </ValueSongContext.Provider>
    </DispatchSongContext.Provider>
  )
}

export function useValueSong() {
  const song = useContext(ValueSongContext)

  if (song === null)
    throw new Error(
      'useValueSong should be used within ValueSongContext provider',
    )

  return song
}

export function useDispatchSong() {
  const setSong = useContext(DispatchSongContext)

  if (setSong === null)
    throw new Error(
      'useDispatchSong should be used within DispatchSongContext provider',
    )

  return setSong
}
