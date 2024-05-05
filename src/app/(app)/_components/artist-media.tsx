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
        'flex justify-start transition hover:bg-neutral-800/50 rounded-sm p-1',
        className,
      )}
      {...props}
    >
      <div className='relative mr-2 aspect-square size-11'>
        <Image
          src={song.imagePath}
          alt={`${song.title} cover`}
          className='rounded-sm'
          fill
          sizes='2.75rem'
        />
      </div>
      <div
        className={cn('flex flex-col justify-center capitalize', {
          'w-20': truncate,
        })}
      >
        <p className='truncate text-sm font-medium text-white'>{song.title}</p>
        <p className='truncate text-[0.8125rem] text-grayish-foreground'>
          {artistName}
        </p>
      </div>
    </Component>
  )
}
