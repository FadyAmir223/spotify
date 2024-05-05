import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import { initVolume } from '@/utils/constants'

import { useDispatchSong, useValueSong } from '../../_contexts/song-context'
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

  const { songIndex, songsQueue } = useValueSong()
  const { setSongsQueue } = useDispatchSong()

  const [volume, setVolume] = useState(initVolume)
  const playbackBeforeMute = useRef(volume)

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

      <Slider volume={volume} setVolume={handleVolumeChange} />
    </>
  )
}
