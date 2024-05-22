import 'server-only'

import { Prisma, type Song } from '@prisma/client'

import db from '@/lib/db'
import { searchLimit } from '@/utils/constants'

export async function getSongs(page = 1) {
  // await sleep()

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
  // await sleep()

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

export async function createSong({
  title,
  imagePath,
  songPath,
  artistId,
}: Pick<Song, 'title' | 'imagePath' | 'songPath' | 'artistId'>) {
  // await sleep(1000)

  try {
    await db.song.create({
      data: { title, imagePath, songPath, artistId },
      select: { id: true },
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2002')
        return { error: 'You already have song with the same name' }
    return { error: "couldn't create song" }
  }
}
