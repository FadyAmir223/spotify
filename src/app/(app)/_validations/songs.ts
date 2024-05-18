import { z } from 'zod'

export const songsSchema = z.object({
  songs: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      songPath: z.string(),
      imagePath: z.string(),
      artist: z.object({
        id: z.string(),
        name: z.string().nullable(),
      }),
    }),
  ),
})

export type SongsSchema = z.infer<typeof songsSchema>

export const songsSchemaWithCursor = songsSchema.extend({
  nextCursor: z.string().nullable().optional(),
})

export type SongsSchemaWithCursor = z.infer<typeof songsSchemaWithCursor>
