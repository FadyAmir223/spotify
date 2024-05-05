import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

import { volumeUnit } from '@/utils/constants'

import { useDispatchSong, useValueSong } from '../../_contexts/song-context'
import { useVolume } from '../../_contexts/volume-context'
import type { SongEssentials } from '../../_types/song'
import ArtistMedia from '../artist-media'
import LikeButton from '../buttons/like-button'
import Controls from './controls'
import Slider from './slider'

type MusicPlayerContentProps = {
  song: SongEssentials
}

export default function MusicPlayerContent({ song }: MusicPlayerContentProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { volume, setVolume } = useVolume()

  const { songIndex, songsQueue } = useValueSong()
  const { setSongsQueue } = useDispatchSong()

  const handleSongChange = (direction: -1 | 1) => {
    const { length } = songsQueue
    const newIndex = (songIndex + direction + length) % length

    setSongsQueue({ songs: songsQueue, index: newIndex })
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
    return () => sound?.unload()
  }, [sound])

  const handleTogglePlay = () => {
    if (!isPlaying) play()
    else pause()
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
          // bug: will only play the first song as useSound can't handle dynamic urls
          handleTogglePlay()
          break
        case 'ArrowLeft':
          handleSongChange(-1)
          break
        case 'ArrowRight':
          handleSongChange(1)
          break
        case 'ArrowUp':
          setVolume(volume + volumeUnit)
          break
        case 'ArrowDown':
          setVolume(volume - volumeUnit)
          break
        case 'm':
          setVolume()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, play, pause, sound, songsQueue, songIndex, volume])

  return (
    <div className='absolute bottom-0 left-0 grid h-20 w-full grid-cols-2 bg-black px-4 py-2 sm:grid-cols-3'>
      <div className='flex items-center gap-x-3'>
        <ArtistMedia
          As={Link}
          href={`/artist/${song.artist.id}`}
          truncate
          artistName={song.artist.name}
          song={{ title: song.title, imagePath: song.imagePath }}
        />
        <LikeButton songId={song.id} />
      </div>

      <Controls
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSongChange={handleSongChange}
      />

      <Slider volume={volume} setVolume={setVolume} />
    </div>
  )
}
