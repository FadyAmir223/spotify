import { z } from 'zod'

import { getSchema } from '../_utils/song-base-schema'

const serverFileSchema = z.instanceof(File, { message: 'Required' })

export const songServerSchema = getSchema(serverFileSchema)
