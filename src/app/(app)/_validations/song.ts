import { z } from 'zod'

export const songIdSchema = z.object({
  id: z.string().cuid(),
})

export const extendedSongSchema = songIdSchema.extend({
  isLiked: z.boolean(),
})
