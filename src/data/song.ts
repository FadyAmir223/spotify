import db from '@/lib/db'

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
