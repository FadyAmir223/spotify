'use client'

import type { Song } from '@prisma/client'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

type Likes = Record<Song['id'], boolean>

type TLikesContext = {
  likes: Likes
  setLikes: {
    (songId: Song['id'], value: boolean): void
    (updates: Song['id'][]): void
  }
}

const LikesContext = createContext<TLikesContext | null>(null)

type LikesProviderProps = {
  children: ReactNode
}

export default function LikesProvider({ children }: LikesProviderProps) {
  const [likes, setLikes] = useState<Likes>({})

  const handleLikeChange = (
    songIdOrSongs: Song['id'] | Song['id'][],
    value?: boolean,
  ) =>
    setLikes((prevLikes) =>
      typeof songIdOrSongs === 'string'
        ? { ...prevLikes, [songIdOrSongs]: value ?? false }
        : {
            ...prevLikes,
            ...songIdOrSongs.reduce(
              (acc, songId) => ({ ...acc, [songId]: true }),
              {},
            ),
          },
    )

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LikesContext.Provider value={{ likes, setLikes: handleLikeChange }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes() {
  const context = useContext(LikesContext)

  if (!context) throw new Error('useLikes should be used within LikesProvider')

  return context
}
