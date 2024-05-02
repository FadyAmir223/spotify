/* eslint-disable no-console */

import type { Song, User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const data = {
  user: {
    listener: {
      id: 'clvmpeqss00051w43ghqedqke',
      email: 'listener@gmail.com',
      password: '0',
      role: 'LISTENER',
    },
    artist: {
      email: 'artist@gmail.com',
      password: '0',
      role: 'ARTIST',
      name: 'fugu vibes',
    },
    artist2: {
      email: 'artist2@gmail.com',
      password: '0',
      role: 'ARTIST',
      name: 'tours',
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
    {
      title: 'corridors',
      imagePath: '/uploads/artists/tours/corridors/cover.jpg',
      songPath: '/uploads/artists/tours/corridors/track.mp3',
    },
  ],
  playlist: {
    title: 'DJs',
    imagePath: '/images/icon.png',
  },
}

async function createUser(user: User) {
  const hashedPassword = await bcrypt.hash(user.password!, 10)

  const { id: userId } = await db.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      ...user,
      password: hashedPassword,
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

  // artist - 1
  const artistId = await createUser(data.user.artist as User)
  console.log(`created artist with id: ${artistId}`)

  // song
  const songId1 = await createSong(data.songs[0] as Song, artistId)
  console.log(`  having song with id: ${songId1}`)

  const songId2 = await createSong(data.songs[1] as Song, artistId)
  console.log(`  having song with id: ${songId2}`)

  // artist - 2
  const artistId2 = await createUser(data.user.artist2 as User)
  console.log(`created artist with id: ${artistId2}`)

  // song
  const songId3 = await createSong(data.songs[2] as Song, artistId2)
  console.log(`  having song with id: ${songId3}`)

  // listener
  const listenerId = await createUser(data.user.listener as User)
  console.log(`created listener with id: ${artistId}`)

  // like song
  await db.likedSong.upsert({
    where: {
      userId_songId: {
        userId: listenerId,
        songId: songId2,
      },
    },
    update: {},
    create: { userId: listenerId, songId: songId2 },
  })

  console.log(`  liked song with id: ${songId2}`)

  // playlist
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
          id: songId2,
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
