import type { Playlist } from '@prisma/client'

export type PlaylistEssentials = Pick<Playlist, 'id' | 'title' | 'imagePath'>
