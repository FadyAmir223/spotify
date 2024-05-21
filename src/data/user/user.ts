import 'server-only'

import type { User } from '@prisma/client'
import { cache } from 'react'

import type { PlaylistEssentials } from '@/app/(app)/_types/playlist'
import { currentUser } from '@/app/(app)/_utils/auth'
import db from '@/lib/db'
import { SITEMAP_LIMIT } from '@/utils/constants'

export async function getPlaylists(page = 1): Promise<PlaylistEssentials[]> {
  // sleep

  try {
    const user = await currentUser()
    if (!user) return []

    const userPlaylists = await db.user.findUnique({
      where: { id: user.id },
      select: {
        playlists: {
          select: {
            id: true,
            title: true,
            imagePath: true,
          },
          take: 10,
          skip: (page - 1) * 10,
          orderBy: { updatedAt: 'desc' },
        },
      },
    })

    return userPlaylists?.playlists || []
  } catch (error) {
    return []
  }
}

export async function getLikedSongs(page = 1) {
  const user = await currentUser()
  if (!user) return []

  try {
    const userLikedSongs = await db.user.findUnique({
      where: { id: user.id },
      select: {
        likedSongs: {
          select: {
            song: {
              select: {
                id: true,
                title: true,
                songPath: true,
                imagePath: true,
                artist: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          take: 10,
          skip: (page - 1) * 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return userLikedSongs?.likedSongs.map(({ song }) => song) || []
  } catch {
    return []
  }
}

export async function updateLitenerToArtist(userId: User['id']) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { role: 'ARTIST' },
      select: { id: true },
    })
  } catch {
    return { error: "couldn't update to artist" }
  }
}

// cache until react render cycle for SSG artists
export const getArtistById = cache(async (artistId: User['id'], page = 1) => {
  // sleep

  try {
    return await db.user.findUnique({
      where: { id: artistId, role: 'ARTIST' },
      select: {
        name: true,
        image: true,
        songs: {
          select: {
            id: true,
            title: true,
            songPath: true,
            imagePath: true,
          },
          take: 20,
          skip: (page - 1) * 20,
          orderBy: { createdAt: 'desc' },
        },
      },
    })
  } catch {
    return null
  }
})

export async function getArtistIds() {
  try {
    return await db.user.findMany({
      where: { role: 'ARTIST' },
      select: { id: true },
    })
  } catch {
    return []
  }
}

export async function getArtists(page = 1) {
  try {
    return await db.user.findMany({
      where: { role: 'ARTIST' },
      select: { id: true, createdAt: true },
      take: SITEMAP_LIMIT,
      skip: (page - 1) * SITEMAP_LIMIT,
    })
  } catch {
    return []
  }
}

export async function getArtistsCount() {
  try {
    return await db.user.count({
      where: { role: 'ARTIST' },
    })
  } catch {
    return 0
  }
}
