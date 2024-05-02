'use client'

import { RxTriangleRight } from 'react-icons/rx'

import { Button } from '@/components/ui/button'

import { useDispatchSong } from '../_contexts/song-context'
import type { SongEssentials } from '../_types/song'

type PlaySongButtonProps = {
  song: SongEssentials
  index: number
}

export default function PlaySongButton({ song, index }: PlaySongButtonProps) {
  const { setCurrentSong } = useDispatchSong()

  return (
    <Button
      size='icon'
      className='absolute bottom-2 right-2 flex size-10 translate-y-1/4 items-center rounded-full bg-primary p-0 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100'
      onClick={() => setCurrentSong(song, index)}
    >
      <RxTriangleRight className='size-9 text-black' />
    </Button>
  )
}
