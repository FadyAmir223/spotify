import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import { initVolume } from '@/utils/constants'

import { useDispatchSong, useValueSong } from '../../_contexts/song-context'
import type { SongEssentials } from '../../_types/song'
import LikeButton from '../buttons/like-button'
import Controls from './controls'
import Slider from './slider'

type MusicPlayerContentProps = {
  song: SongEssentials
}

export default function MusicPlayerContent({ song }: MusicPlayerContentProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const { songIndex, playbackSongs } = useValueSong()
  const { setCurrentSong } = useDispatchSong()

  const [volume, setVolume] = useState(initVolume)
  const playbackBeforeMute = useRef(volume)

  const handleSongChange = (direction: -1 | 1) => {
    const { length } = playbackSongs
    const newIndex = (songIndex + direction + length) % length

    setCurrentSong(playbackSongs[newIndex], newIndex)
  }

  const [play, { pause, sound }] = useSound(song?.songPath, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      handleSongChange(1)
    },
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

  const handleVolumeChange = (type: 'set' | 'reset', value?: number) => {
    if (type === 'set' && value !== undefined) {
      if (value === 0) playbackBeforeMute.current = volume
      setVolume(value)
    } else if (type === 'reset') setVolume(playbackBeforeMute.current)
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

      <Controls
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSongChange={handleSongChange}
      />

      <Slider volume={volume} setVolume={handleVolumeChange} />
    </>
  )
}
