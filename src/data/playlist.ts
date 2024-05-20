import 'server-only'

import type { Playlist, Song, User } from '@prisma/client'
import { cache } from 'react'

import { currentUser } from '@/app/(app)/_utils/auth'
import db from '@/lib/db'

export async function createUserPlaylist({
  playlistName,
  stashSong,
  userId,
}: {
  playlistName: Playlist['title']
  stashSong: Song['id'] | null
  userId: User['id']
}) {
  try {
    await db.playlist.create({
      data: {
        title: playlistName,
        user: {
          connect: { id: userId },
        },
        songs: stashSong ? { connect: { id: stashSong } } : {},
      },
      select: { id: true },
    })
  } catch {
    return { error: "couldn't create playlist" }
  }
}

// cache until end of react render cycle - for metadata and page
export const getPlaylistById = cache(async (id: Playlist['id'], page = 1) => {
  const user = await currentUser()
  if (!user) return null

  try {
    return await db.playlist.findUnique({
      where: { id, userId: user.id },
      select: {
        id: true,
        title: true,
        imagePath: true,
        songs: {
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

export async function deletePlaylistById(id: Playlist['id']) {
  try {
    await db.playlist.delete({
      where: { id },
      select: { id: true },
    })
  } catch {
    return { error: "couldn't delete playlist" }
  }
}

export async function addUserSongToPlaylist({
  playlistId,
  songId,
  userId,
}: {
  playlistId: Playlist['id']
  songId: Song['id']
  userId: User['id']
}) {
  try {
    await db.playlist.update({
      where: { id: playlistId, userId },
      data: { songs: { connect: { id: songId } } },
    })
  } catch {
    return { error: "couldn't add song to playlist" }
  }
}

export async function renameUserPlaylist({
  playlistName,
  playlistId,
  userId,
}: {
  playlistName: Playlist['title']
  playlistId: Playlist['id']
  userId: User['id']
}) {
  try {
    await db.playlist.update({
      where: { id: playlistId, userId },
      data: { title: playlistName },
      select: { id: true },
    })
  } catch {
    return { error: "couldn't rename playlist" }
  }
}
