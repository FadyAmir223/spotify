/* eslint-disable no-console */

import type { Playlist, Song, User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import data from './data.json'

const db = new PrismaClient()

async function createUser({ id, email, password, role, name }: User) {
  const hashedPassword = await bcrypt.hash(password!, 10)

  const { id: userId } = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      id,
      name,
      email,
      password: hashedPassword,
      emailVerified: new Date(),
      role,
    },
    select: { id: true },
  })

  return userId
}

async function createSong(song: Song, artistId: User['id']) {
  const { id: songId } = await db.song.upsert({
    where: { title_artistId: { title: song.title, artistId } },
    update: {},
    create: { ...song, artistId },
    select: { id: true },
  })

  return songId
}

async function likeSong(songId: Song['id'], userId: User['id']) {
  await db.likedSong.upsert({
    where: { userId_songId: { userId, songId } },
    update: {},
    create: { userId, songId },
  })
}

async function createPlaylist(
  playlist: Playlist,
  songs: Song['id'][],
  listenerId: User['id'],
) {
  const { id: playlistId } = await db.playlist.upsert({
    where: { userId_title: { userId: listenerId, title: playlist.title } },
    update: {},
    create: {
      ...playlist,
      userId: listenerId,
      songs: {
        connect: songs.map((id) => ({ id })),
      },
    },
    select: { id: true },
  })

  return playlistId
}

async function main() {
  console.log('seeding started...')

  data.artists.forEach(async ({ songs, ...info }) => {
    const artistId = await createUser(info as User)
    console.log(`created artist: ${artistId}`)

    songs.map(async (song) => {
      const songId1 = await createSong(song as Song, artistId)
      console.log(`  relsased song: ${songId1}`)
    })
  })

  const { likes, playlists, ...info } = data.listener

  const listenerId = await createUser(info as User)
  console.log(`created listener with id: ${listenerId}`)

  likes.forEach(async (songId) => {
    await likeSong(songId, listenerId)
    console.log(`  liked song with id: ${songId}`)
  })

  playlists.forEach(async ({ songs, ...playlist }) => {
    const playlistId = await createPlaylist(
      playlist as Playlist,
      songs,
      listenerId,
    )
    console.log(`  saved it in playlist with id: ${playlistId}`)
  })

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
