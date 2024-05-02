'use server'

import { likeSong, unlikeSong } from '@/data/liked-song'

import { currentUser } from '../_utils/auth'
import { extendedSongSchema } from '../_validations/song'

export async function toggleLikeSong(data: unknown) {
  const user = await currentUser()
  if (user?.role !== 'LISTENER') return { error: 'Invalid operation' }

  const result = extendedSongSchema.safeParse(data)
  if (!result.success) return { error: 'Invalid data' }

  const { id: songId, isLiked } = result.data

  const toggleLikeResponse = isLiked
    ? await unlikeSong(songId, user.id!)
    : await likeSong(songId, user.id!)
  if (toggleLikeResponse?.error) return { error: toggleLikeResponse.error }
}
