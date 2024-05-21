'use server'

import { revalidatePath } from 'next/cache'

import {
  addUserSongToPlaylist,
  createUserPlaylist,
  deletePlaylistById,
  renameUserPlaylist,
} from '@/data/playlist'

import { currentUser } from '../_utils/auth'
import {
  newPlaylistSchema,
  playlistIdSchema,
  playlistInfoSchema,
  playlistWithSongSchema,
} from '../_validations/playlist'

export async function createPlaylist(formData: unknown) {
  const user = await currentUser()
  if (!user) return { error: 'You must login first' }

  const result = newPlaylistSchema.safeParse(formData)
  if (!result.success) return { error: 'Invalid form data' }

  const { playlistName, stashSong } = result.data

  const creationResponse = await createUserPlaylist({
    playlistName,
    stashSong,
    userId: user.id!,
  })
  if (creationResponse?.error) return { error: creationResponse.error }

  revalidatePath('/(app)', 'layout')
}

export async function renamePlaylist(formData: unknown) {
  const user = await currentUser()
  if (!user) return { error: 'You must login first' }

  const result = playlistInfoSchema.safeParse(formData)
  if (!result.success) return { error: 'Invalid form data' }

  const { playlistId, playlistName } = result.data

  const reanameResponse = await renameUserPlaylist({
    playlistName,
    playlistId,
    userId: user.id!,
  })
  if (reanameResponse?.error) return { error: reanameResponse.error }

  revalidatePath('/(app)', 'layout')
}

export async function deletePlaylist(formData: unknown) {
  const user = await currentUser()
  if (!user) return { error: 'You must login first' }

  const result = playlistIdSchema.safeParse(formData)
  if (!result.success) return { error: 'Invalid form data' }

  const deletionResponse = await deletePlaylistById(result.data.playlistId)
  if (deletionResponse?.error) return { error: deletionResponse.error }

  revalidatePath('/(app)', 'layout')
  // revalidatePath(`/(app)/playlist/${playlistId}`, 'page')
}

export async function addSongToPlaylist(formData: unknown) {
  const user = await currentUser()
  if (!user) return { error: 'You must login first' }

  const result = playlistWithSongSchema.safeParse(formData)
  if (!result.success) return { error: 'Invalid form data' }

  const { playlistId, songId } = result.data

  const additionResponse = await addUserSongToPlaylist({
    playlistId,
    songId,
    userId: user.id!,
  })
  if (additionResponse?.error) return { error: additionResponse.error }

  revalidatePath(`/(app)/playlist/${playlistId}`, 'page')
}
