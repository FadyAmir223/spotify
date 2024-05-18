import type { Area } from 'react-easy-crop'

import getCroppedImg from './crop-image'
import { resizeImage } from './resize-image'

export async function getImage(
  imageSrc: string | null,
  croppedAreaPixels: Area | null,
) {
  if (!imageSrc || !croppedAreaPixels) return

  const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
  if (!croppedImageBlob) return

  const imageFile = new File([croppedImageBlob], '_.')
  const resizedImage = await resizeImage(imageFile)
  return resizedImage
}
