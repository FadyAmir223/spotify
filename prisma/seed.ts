/* eslint-disable no-console */

import type { Song, User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const data = {
  user: {
    listener: { email: 'listener@gmail.com', password: '0', role: 'LISTENER' },
    artist: {
      email: 'artist@gmail.com',
      password: '0',
      role: 'ARTIST',
      name: 'fugu vibes',
    },
  },
  songs: [
    {
      title: 'fluffy clouds',
      imagePath: '/uploads/artists/fugu-vibes/fluffy-clouds/cover.jpg',
      songPath: '/uploads/artists/fugu-vibes/fluffy-clouds/track.mp3',
    },
    {
      title: 'spatial',
      imagePath: '/uploads/artists/fugu-vibes/spatial/cover.jpg',
      songPath: '/uploads/artists/fugu-vibes/spatial/track.mp3',
    },
  ],
  playlist: {
    title: 'my playlist',
    imagePath: '/images/icon.png',
  },
}

async function createUser(user: User) {
  const hashedPassword = await bcrypt.hash(user.password!, 10)

  const { id: userId } = await db.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      emailVerified: new Date(),
    },
    select: { id: true },
  })

  return userId
}

async function createSong(song: Song, artistId: User['id']) {
  const { id: songId } = await db.song.upsert({
    where: {
      title_artistId: {
        title: song.title,
        artistId,
      },
    },
    update: {},
    create: {
      ...song,
      artistId,
    },
    select: { id: true },
  })

  return songId
}

async function main() {
  console.log('seeding started...')

  // create artist
  const artistId = await createUser(data.user.artist as User)
  console.log(`created artist with id: ${artistId}`)

  // create song
  const songId1 = await createSong(data.songs[0] as Song, artistId)
  console.log(`  having song with id: ${songId1}`)

  const songId = await createSong(data.songs[1] as Song, artistId)
  console.log(`  having song with id: ${songId}`)

  // create listener
  const listenerId = await createUser(data.user.listener as User)
  console.log(`created listener with id: ${artistId}`)

  // like song
  await db.likedSong.upsert({
    where: {
      userId_songId: {
        userId: listenerId,
        songId,
      },
    },
    update: {},
    create: { userId: listenerId, songId },
  })

  console.log(`  liked song with id: ${songId}`)

  // create playlist
  const { id: playlistId } = await db.playlist.upsert({
    where: {
      userId_title: {
        userId: listenerId,
        title: data.playlist.title,
      },
    },
    update: {},
    create: {
      ...data.playlist,
      userId: listenerId,
      songs: {
        connect: {
          id: songId,
        },
      },
    },
    select: { id: true },
  })

  console.log(`  saved it in playlist with id: ${playlistId}`)

  console.log('seeding finished')
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
