import { z } from 'zod'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const MAX_SONG_SIZE = 50 * 1024 * 1024

export const getSchema = (
  mainSchema:
    | z.ZodType<File, z.ZodTypeDef, File>
    | z.ZodEffects<z.ZodType<FileList, z.ZodTypeDef, FileList>, File, FileList>,
) =>
  z.object({
    title: z.string().min(1, { message: 'Song must have a title' }),
    image: mainSchema
      .refine((file) => file.size > 0, 'Image is required')
      .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Max image size is 10MB')
      .refine(
        (file) => file.type?.startsWith('image/'),
        'Invalid image format',
      ),
    song: mainSchema
      .refine((file) => file.size > 0, 'Song is required')
      .refine((file) => file.size <= MAX_SONG_SIZE, 'Max song size is 50MB')
      .refine((file) => file.type?.startsWith('audio/'), 'Invalid song format'),
  })
