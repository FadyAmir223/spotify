import type { Song } from '@prisma/client'

export const keys = {
  like: ['song', 'like'],
  song: (id: Song['id']) => [...keys.like, id],
}
