import Link from 'next/link'
import { useEffect, useRef } from 'react'
import useSound from 'use-sound'

import { volumeUnit } from '@/utils/constants'

import { useDispatchSong, useValueSong } from '../../_contexts/song-context'
import { useVolume } from '../../_contexts/volume-context'
import type { SongEssentials } from '../../_types/song'
import ArtistMedia from '../artist-media'
import LikeButton from '../buttons/like-button'
import Controls from './controls'
import ProgressBar from './progress-bar'
import Slider from './slider'

type MusicPlayerContentProps = {
  song: SongEssentials
}

export default function MusicPlayerContent({ song }: MusicPlayerContentProps) {
  const { volume, setVolume } = useVolume()

  const { songIndex, songsQueue, isPlaying } = useValueSong()
  const { setSongsQueue, setPlaying } = useDispatchSong()

  const playButtonRef = useRef<HTMLButtonElement>(null)
  const volumeButtonRef = useRef<HTMLButtonElement>(null)

  const handleSongChange = (direction: -1 | 1) => {
    if (document.activeElement instanceof HTMLInputElement) return

    const { length } = songsQueue
    const newIndex = (songIndex + direction + length) % length

    setSongsQueue({ songs: songsQueue, index: newIndex })
  }

  // Howl only supports static assets (not dynamic ep)
  const [play, { pause, sound, duration }] = useSound(song?.songPath, {
    volume,
    onplay: () => setPlaying(true),
    onend: () => {
      setPlaying(false)
      handleSongChange(1)
    },
    onpause: () => setPlaying(false),
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
    setPlaying(!isPlaying)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
          // bug: will only play the first song as useSound can't handle dynamic urls
          playButtonRef.current?.focus()
          handleTogglePlay()
          break
        case 'ArrowLeft':
          handleSongChange(-1)
          break
        case 'ArrowRight':
          handleSongChange(1)
          break
        case 'ArrowUp':
          volumeButtonRef.current?.focus()
          setVolume(volume + volumeUnit)
          break
        case 'ArrowDown':
          volumeButtonRef.current?.focus()
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
  }, [isPlaying, sound, songsQueue, songIndex, volume])

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

      <div className='flex flex-col items-end justify-center gap-y-1.5 sm:-mt-2 sm:items-center'>
        <Controls
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onSongChange={handleSongChange}
          ref={playButtonRef}
        />
        <ProgressBar isPlaying={isPlaying} duration={duration} sound={sound} />
      </div>

      <Slider ref={volumeButtonRef} />
    </div>
  )
}
