import db from '@/lib/db'
import { searchLimit } from '@/utils/constants'

export async function getSongs(page = 1) {
  try {
    return await db.song.findMany({
      select: {
        id: true,
        title: true,
        songPath: true,
        imagePath: true,
        artist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export async function getSongsByQuery(query: string, cursor: string | null) {
  try {
    const songs = await db.song.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artist: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
      select: {
        id: true,
        title: true,
        songPath: true,
        imagePath: true,
        artist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: searchLimit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { title: 'asc' },
    })

    let nextCursor: typeof cursor | undefined
    if (songs.length > searchLimit) {
      const nextItem = songs.pop()
      nextCursor = nextItem?.id
    }

    return { songs, nextCursor }
  } catch {
    return { songs: [] }
  }
}
