import type { Song, User } from '@prisma/client'
import Image from 'next/image'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/utils/cn'

type ArtistMediaProps<T extends ElementType> = {
  As?: T
  artistName: User['name']
  song: {
    title: Song['title']
    imagePath: Song['imagePath']
  }
  truncate?: boolean
} & ComponentPropsWithoutRef<T>

const DEFAULT_TYPE = 'div'

export default function ArtistMedia<
  T extends ElementType = typeof DEFAULT_TYPE,
>({
  As,
  artistName,
  song,
  truncate,
  className,
  ...props
}: ArtistMediaProps<T>) {
  const Component = As ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        'flex justify-start transition hover:bg-neutral-800/50 rounded-sm p-1 gap-x-3',
        className,
      )}
      {...props}
    >
      <div className='relative aspect-square size-11'>
        <Image
          src={song.imagePath}
          alt={`${song.title} cover`}
          className='rounded-sm'
          fill
          sizes='2.75rem'
        />
      </div>

      <div className='flex flex-col items-start justify-center capitalize'>
        <p
          className={cn('truncate text-sm font-medium text-white', {
            'w-20 sm:w-28': truncate,
          })}
        >
          {song.title}
        </p>
        <p
          className={cn('truncate text-[0.8125rem] text-grayish-foreground', {
            'w-20 sm:w-28': truncate,
          })}
        >
          {artistName}
        </p>
      </div>
    </Component>
  )
}
