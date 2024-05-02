import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

import { useValueSong } from '../../_contexts/song-context'
import type { SongEssentials } from '../../_types/song'
import LikeButton from '../like-button'
import Controls from './controls'
import Slider from './slider'

type MusicPlayerContentProps = {
  song: SongEssentials
}

export default function MusicPlayerContent({ song }: MusicPlayerContentProps) {
  const { volume } = useValueSong()
  const [isPlaying, setIsPlaying] = useState(false)

  const [play, { pause, sound }] = useSound(song?.songPath, {
    volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
  })

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handleTogglePlay = () => {
    if (!isPlaying) play()
    else pause()
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <div className='flex items-center'>
        <Link
          href={`/artist/${song.artist.id}`}
          className='flex rounded-sm p-1 transition hover:bg-neutral-800/50'
        >
          <div className='relative mr-2 aspect-square size-11'>
            <Image
              fill
              src={song.imagePath}
              alt={`${song.title} cover`}
              className='rounded-sm'
            />
          </div>
          <div className='flex w-20 flex-col justify-center capitalize'>
            <p className='truncate text-sm font-medium text-white'>
              {song.title}
            </p>
            <p className='truncate text-sm text-grayish-foreground'>
              {song.artist.name}
            </p>
          </div>
        </Link>
        <LikeButton key={song.id} songId={song.id} />
      </div>

      <Controls isPlaying={isPlaying} handleTogglePlay={handleTogglePlay} />

      <Slider />
    </>
  )
}
