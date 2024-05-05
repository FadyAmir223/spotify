import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'

import { Button } from '@/components/ui/button'

type ControlsProps = {
  isPlaying: boolean
  onTogglePlay: () => void
  onSongChange: (direction: 1 | -1) => void
}

/*
  TODO: keyboard
    space: play/pause
    right/left: change song
    up/down: volume
    m: mute
*/

export default function Controls({
  isPlaying,
  onTogglePlay,
  onSongChange,
}: ControlsProps) {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill

  return (
    <div className='flex items-center justify-end gap-x-5 sm:justify-center'>
      <Button
        variant='none'
        size='none'
        className='hidden text-neutral-400 transition hover:text-white sm:block'
        onClick={() => onSongChange(-1)}
        aria-label='Previous Song'
      >
        <IoPlaySkipBack className='size-6' />
      </Button>

      <Button
        variant='none'
        size='none'
        className='size-10 rounded-full bg-white'
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <Icon className='size-8 text-black' />
      </Button>

      <Button
        variant='none'
        size='none'
        className='text-neutral-400 transition hover:text-white'
        onClick={() => onSongChange(1)}
        aria-label='Next Song'
      >
        <IoPlaySkipForward className='size-6' />
      </Button>
    </div>
  )
}
