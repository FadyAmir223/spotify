'use server'

import { z } from 'zod'

import { likeSong } from '@/data/liked-song'

import { currentUser } from '../_utils/auth'

const songIdSchema = z.string().cuid()

export async function toggleLikeSong(songId: unknown) {
  const user = await currentUser()
  if (user?.role !== 'LISTENER') return { error: 'Invalid operation' }

  const result = songIdSchema.safeParse(songId)
  if (!result.success) return { error: 'Invalid song id' }

  const likeSongResponse = await likeSong(user.id!, result.data)
  if (likeSongResponse?.error) return { error: likeSongResponse.error }
}
