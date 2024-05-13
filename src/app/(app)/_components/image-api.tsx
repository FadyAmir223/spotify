'use client'

import Image from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'

import { assetEP } from '@/utils/constants'

type ImageApiProps = ComponentPropsWithoutRef<typeof Image>

export default function ImageApi({ src, alt, ...props }: ImageApiProps) {
  return (
    <Image
      src={src}
      loader={
        ({ src: _src }) => `${assetEP}${_src}`
        // w=${width}&q=${quality || 75}
      }
      alt={alt}
      {...props}
    />
  )
}
