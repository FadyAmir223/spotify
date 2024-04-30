import type { Song, User } from '@prisma/client'

export type SongEssentials = Pick<
  Song,
  'id' | 'title' | 'songPath' | 'imagePath'
> & {
  artist: { name: User['name'] }
}
