import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'

import { Button } from '@/components/ui/button'

import { useDispatchSong, useValueSong } from '../../_contexts/song-context'

type ControlsProps = {
  isPlaying: boolean
  handleTogglePlay: () => void
}

export default function Controls({
  isPlaying,
  handleTogglePlay,
}: ControlsProps) {
  const { songIndex, songs } = useValueSong()
  const { setCurrentSong } = useDispatchSong()

  const handleSongChange = (direction: -1 | 1) => {
    const { length } = songs
    const newIndex = (songIndex + direction + length) % length

    setCurrentSong(songs[newIndex], newIndex)
  }

  const Icon = isPlaying ? BsPauseFill : BsPlayFill

  return (
    <div className='ml-auto flex items-center gap-x-5 sm:justify-center'>
      <Button
        variant='none'
        size='none'
        className='hidden text-neutral-400 transition hover:text-white sm:block'
        onClick={() => handleSongChange(-1)}
        aria-label='Previous Song'
      >
        <IoPlaySkipBack className='size-6' />
      </Button>

      <Button
        variant='none'
        size='none'
        className='size-10 rounded-full bg-white'
        onClick={handleTogglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <Icon className='size-8 text-black' />
      </Button>

      <Button
        variant='none'
        size='none'
        className='hidden text-neutral-400 transition hover:text-white sm:block'
        onClick={() => handleSongChange(1)}
        aria-label='Next Song'
      >
        <IoPlaySkipForward className='size-6' />
      </Button>
    </div>
  )
}
