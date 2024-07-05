import Resizer from 'react-image-file-resizer'

import { IMAGE } from '@/utils/constants'

export function resizeImage(file: Blob): Promise<File> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file, // file
      IMAGE.MAX_LENGTH, // maxWidth
      IMAGE.MAX_LENGTH, // maxHeight
      'webp', // compressFormat
      80, // quality
      0, // rotation
      (uri) => resolve(uri as File), // responseUriFunc
      'file', // outputType
      IMAGE.MIN_LENGTH, // minWidth
      IMAGE.MIN_LENGTH, // minHeight
    )
  })
}
