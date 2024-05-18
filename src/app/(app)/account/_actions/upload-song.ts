'use server'

import { existsSync } from 'fs'
import fs from 'fs/promises'
import imageSize from 'image-size'
import { revalidatePath } from 'next/cache'

import { createSong } from '@/data/song'
import { IMAGE } from '@/utils/constants'

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

  if (image.type !== 'image/webp') return { error: 'Invalid image extension' }

  const imageBuffer = await image.arrayBuffer()
  const uint8Array = new Uint8Array(imageBuffer)
  const { width, height } = imageSize(uint8Array)

  if (
    !(
      width !== undefined &&
      width === height &&
      width >= IMAGE.MIN_LENGHT &&
      width <= IMAGE.MAX_LENGTH
    )
  )
    return { error: 'Invalid image dimentions' }

  const writePath = `/app/uploads/artists/${user.name}/${title}`

  if (!existsSync(writePath))
    await fs.mkdir(`${writePath}`, { recursive: true })

  const newSongName = song.name.split('.').at(-1) || 'mp3'
  const songPath = `${writePath}/${crypto.randomUUID()}.${newSongName}`

  const newImageName = image.name.split('.').at(-1) || 'webp'
  const imagePath = `${writePath}/${crypto.randomUUID()}.${newImageName}`

  const creationResponse = await createSong({
    title,
    imagePath,
    songPath,
    artistId: user.id!,
  })
  if (creationResponse?.error) return { error: creationResponse.error }

  // only save after ensuring its a unique title per artist
  await fs.writeFile(songPath, Buffer.from(await song.arrayBuffer()))
  await fs.writeFile(imagePath, Buffer.from(imageBuffer))

  revalidatePath('/(app)')
}
