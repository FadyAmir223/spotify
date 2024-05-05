import 'server-only'

import type { PlaylistEssentials } from '@/app/(app)/_types/playlist'
import { currentUser } from '@/app/(app)/_utils/auth'
import db from '@/lib/db'

export async function getPlaylists(page = 1): Promise<PlaylistEssentials[]> {
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
