import type { ComponentPropsWithoutRef } from 'react'
import { FaPause } from 'react-icons/fa6'
import { RxTriangleRight } from 'react-icons/rx'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

import { useValueSong } from '../../_contexts/song-context'

type TriangleButtonProps = {
  isMatching: boolean
} & ComponentPropsWithoutRef<typeof Button>

export default function TriangleButton({
  isMatching,
  className,
  onClick,
  ...props
}: TriangleButtonProps) {
  const { isPlaying } = useValueSong()

  return (
    <Button
      size='icon'
      className={cn(
        'flex size-10 items-center rounded-full bg-primary p-0 drop-shadow-md transition active:scale-105 focus:scale-110 hover:scale-110 text-black focus-visible:ring-zinc-600',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {isMatching && isPlaying ? (
        <FaPause className='size-5' />
      ) : (
        <RxTriangleRight className='size-9' />
      )}
    </Button>
  )
}
