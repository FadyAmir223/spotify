import { z } from 'zod'

export const playlistIdSchema = z.object({
  playlistId: z.string().cuid(),
})

export const playlistNameSchema = z.object({
  playlistName: z.string().max(99),
})

export type PlaylistNameSchema = z.infer<typeof playlistNameSchema>

export const playlistInfoSchema = playlistIdSchema.merge(playlistNameSchema)

export const newPlaylistSchema = playlistNameSchema.extend({
  stashSong: z.string().cuid().nullable(),
})

export type NewPlaylistSchema = z.infer<typeof newPlaylistSchema>

export const playlistWithSongSchema = playlistIdSchema.extend({
  songId: z.string().cuid(),
})
