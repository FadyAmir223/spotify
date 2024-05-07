'use server'

import { revalidateTag } from 'next/cache'

import { likeSong, unlikeSong } from '@/data/liked-song'

import { currentUser } from '../_utils/auth'
import { extendedSongSchema } from '../_validations/song'

export async function toggleLikeSong(data: unknown) {
  const user = await currentUser()
  if (user?.role !== 'LISTENER') return { error: 'Invalid operation' }

  const result = extendedSongSchema.safeParse(data)
  if (!result.success) return { error: 'Invalid data' }

  const { id: songId, isLiked, pathname } = result.data

  const toggleLikeResponse = isLiked
    ? await unlikeSong(songId, user.id!)
    : await likeSong(songId, user.id!)
  if (toggleLikeResponse?.error) return { error: toggleLikeResponse.error }

  // bug: the first time a song is toggled, `revalidateTag` soft reloads the page and closes the music player
  if (pathname === '/likes') revalidateTag(songId)
}
