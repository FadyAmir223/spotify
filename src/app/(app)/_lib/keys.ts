import type { Song } from '@prisma/client'

export const keys = {
  song: (id: Song['id']) => ['song', 'like', id],
}
