import { z } from 'zod'

// valid as SSR is disabled for using FileList
const isServer = typeof window === 'undefined'

export const newSongSchema = z.object({
  title: z.string().min(1, { message: 'Song must have a title' }),

  image: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file.size > 0, 'Image is required')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Max image size is 10MB')
    .refine((file) => file.type?.startsWith('image/'), 'Invalid image format'),

  song: z
    .instanceof(isServer ? File : FileList, { message: 'Required' })
    .transform((value) =>
      value instanceof File ? value : value?.item(0)! || {},
    )
    .refine((file) => file.size > 0, 'Song is required')
    .refine((file) => file.size <= 100 * 1024 * 1024, 'Max song size is 100MB')
    .refine((file) => file.type?.startsWith('audio/'), 'Invalid song format'),
})

export type NewSongSchema = z.infer<typeof newSongSchema>
