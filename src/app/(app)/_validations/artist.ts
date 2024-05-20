import { z } from 'zod'

export const artistIdSchema = z.object({
  artistId: z.string().cuid(),
})
