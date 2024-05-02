import type { Song, User } from '@prisma/client'

export type SongEssentials = Pick<
  Song,
  'id' | 'title' | 'songPath' | 'imagePath'
> & {
  artist: {
    id: User['id']
    name: User['name']
  }
}
