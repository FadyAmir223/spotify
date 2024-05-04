'use client'

import type { Song } from '@prisma/client'
import Image from 'next/image'

import { getScreenSize } from '@/utils/inner-width'

const cols = () => {
  const size = getScreenSize()

  if (size === 'xs') return 2
  if (size === 'sm') return 3
  if (size === 'lg') return 4
  if (size === 'xl') return 5
  return 8
}

type SongsListImageProps = {
  imagePath: Song['imagePath']
  title: Song['title']
  index: number
}

export default function SongsListImage({
  index,
  imagePath,
  title,
}: SongsListImageProps) {
  return (
    <Image
      src={imagePath}
      alt={title}
      className='rounded-md'
      sizes='
       (max-width: 639px) 50vw, 
       (max-width: 767px) 33vw, 
       (max-width: 1023px) calc((100vw - 300px) / 3), 
       (max-width: 1279px) calc((100vw - 300px) / 4), 
       calc((100vw - 300px) / 8)'
      fill
      priority={index < cols()}
    />
  )
}
