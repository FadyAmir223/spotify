import type { SongEssentials } from '@/app/(app)/_types/song'
import db from '@/lib/db'

export async function getSongs(page = 1): Promise<SongEssentials[]> {
  try {
    return await db.song.findMany({
      select: {
        id: true,
        title: true,
        songPath: true,
        imagePath: true,
        artist: {
          select: {
            name: true,
          },
        },
      },
      take: 15,
      skip: (page - 1) * 15,
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}
