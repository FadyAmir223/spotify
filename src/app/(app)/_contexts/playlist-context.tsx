'use client'

import type { Song } from '@prisma/client'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

import type { PlaylistEssentials } from '../_types/playlist'

type TPlaylistContext = {
  isAddingPlaylist: boolean
  setAddingPlaylist: Dispatch<SetStateAction<boolean>>
  stashSong: Song['id'] | null
  setStashSong: Dispatch<SetStateAction<Song['id'] | null>>
  playlists: PlaylistEssentials[]
  setPlaylists: Dispatch<SetStateAction<PlaylistEssentials[]>>
}

const PlaylistContext = createContext<TPlaylistContext | null>(null)

type PlaylistProviderProps = {
  children: ReactNode
}

export default function PlaylistProvider({ children }: PlaylistProviderProps) {
  const [playlists, setPlaylists] = useState<PlaylistEssentials[]>([])
  const [stashSong, setStashSong] = useState<Song['id'] | null>(null)
  const [isAddingPlaylist, setAddingPlaylist] = useState(false)

  return (
    <PlaylistContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isAddingPlaylist,
        setAddingPlaylist,
        stashSong,
        setStashSong,
        playlists,
        setPlaylists,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  const context = useContext(PlaylistContext)

  if (!context)
    throw new Error('usePlaylist should be used within PlaylistProvider')

  return context
}
