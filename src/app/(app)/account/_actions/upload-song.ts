'use server'

import { existsSync } from 'fs'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'

import { createSong } from '@/data/song'

import { currentUser } from '../../_utils/auth'
import { songServerSchema } from '../_validations/new-song.server'

export async function uploadSong(formData: unknown) {
  const user = await currentUser()
  if (user?.role !== 'ARTIST') return { error: 'Invalid operation' }

  if (!(formData instanceof FormData)) return { error: 'Invalid form data' }

  const FormDataEntries = Object.fromEntries(formData)
  const result = songServerSchema.safeParse(FormDataEntries)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { title, image, song } = result.data

  const writePath = `/app/uploads/artists/${user.name}/${title}`

  if (!existsSync(writePath))
    await fs.mkdir(`${writePath}`, { recursive: true })

  const newSongName = song.name.split('.').at(-1) || 'mp3'
  const songPath = `${writePath}/${crypto.randomUUID()}.${newSongName}`
  await fs.writeFile(`${songPath}`, Buffer.from(await song.arrayBuffer()))

  const newImageName = image.name.split('.').at(-1) || 'jpg'
  const imgPath = `${writePath}/${crypto.randomUUID()}.${newImageName}`
  await fs.writeFile(`${imgPath}`, Buffer.from(await image.arrayBuffer()))

  const creationResponse = await createSong({
    title,
    imagePath: imgPath,
    songPath,
    artistId: user.id!,
  })
  if (creationResponse?.error) return { error: creationResponse.error }

  revalidatePath('/(app)', 'page')
}
