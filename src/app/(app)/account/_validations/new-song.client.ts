import { z } from 'zod'

import { getSchema } from '../_utils/song-base-schema'

const clientFileSchema = z
  .instanceof(FileList, { message: 'Required' })
  .transform((value) => value?.item(0)! || {})

export const songClientSchema = getSchema(clientFileSchema)
export type SongClientSchema = z.infer<typeof songClientSchema>
