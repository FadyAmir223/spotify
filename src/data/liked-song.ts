import 'server-only'

import type { Song, User } from '@prisma/client'

import db from '@/lib/db'

export async function likeSong(songId: Song['id'], userId: User['id']) {
  // await sleep(500)

  try {
    await db.likedSong.create({ data: { userId, songId } })
  } catch (error) {
    return { error: "Couldn't like the song" }
  }
}

export async function unlikeSong(songId: Song['id'], userId: User['id']) {
  // await sleep(500)

  try {
    await db.likedSong.delete({
      where: { userId_songId: { userId, songId } },
      select: { songId: true },
    })
  } catch (error) {
    return { error: "Couldn't unlike the song" }
  }
}

export async function getLikedSong(songId: Song['id'], userId: User['id']) {
  // await sleep(400)

  try {
    return await db.likedSong.findUnique({
      where: { userId_songId: { userId, songId } },
      select: { createdAt: true },
    })
  } catch (error) {
    return null
  }
}
