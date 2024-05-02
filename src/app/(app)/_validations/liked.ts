import { z } from 'zod'

export const likedSchema = z.object({
  liked: z.boolean(),
})

export type LikedSchema = z.infer<typeof likedSchema>
