'use server'

import { updateLitenerToArtist } from '@/data/user/user'

import { currentUser } from '../../_utils/auth'

export async function updateListener() {
  const user = await currentUser()
  if (user?.role === 'ARTIST') return { error: 'you are already an artist' }

  const updateResponse = await updateLitenerToArtist(user?.id!)
  if (updateResponse?.error) return { error: updateResponse.error }
}
