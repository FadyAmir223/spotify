import 'server-only'

import type { Song, User } from '@prisma/client'

import db from '@/lib/db'

export async function likeSong(userId: User['id'], songId: Song['id']) {
  try {
    await db.likedSong.create({ data: { userId, songId } })
  } catch (error) {
    return { error: "Couldn't like the song" }
  }
}
