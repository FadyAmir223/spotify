import { z } from 'zod'

export const likedSongsSchema = z.object({
  likedSongs: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      songPath: z.string(),
      imagePath: z.string(),
      artist: z.object({
        id: z.string(),
        name: z.string(),
      }),
    }),
  ),
})
