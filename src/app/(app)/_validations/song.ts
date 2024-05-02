import { z } from 'zod'

export const songSchema = z.object({
  id: z.string().cuid(),
})

export const extendedSongSchema = songSchema.extend({
  isLiked: z.boolean(),
})
