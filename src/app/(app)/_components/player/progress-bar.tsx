import * as Progress from '@radix-ui/react-progress'
import type { Howl } from 'howler'
import { type MouseEvent, useEffect, useMemo, useState } from 'react'

import { formatTime } from '@/utils/time'

type ProgressBarProps = {
  isPlaying: boolean
  duration: number | null
  sound: Howl | null
}

export default function ProgressBar({
  isPlaying,
  duration,
  sound,
}: ProgressBarProps) {
  const [now, setNow] = useState(0)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isPlaying) {
      intervalId = setInterval(() => {
        setNow((prevNow) => prevNow + 1)
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isPlaying])

  const durationInSecond = Math.ceil(duration ?? 1) / 1000
  const progress = (now / durationInSecond) * 100
  const formatNow = formatTime(now)

  const formatDuration = useMemo(
    () => formatTime(durationInSecond),
    [durationInSecond],
  )

  const handleTimeChange = (e: MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const clickX = e.clientX - progressBar.getBoundingClientRect().left
    const percentage = clickX / progressBar.clientWidth
    const clickedTime = Math.ceil(percentage * durationInSecond)

    setNow(clickedTime)
    sound?.seek(clickedTime)
  }

  return (
    <div className='hidden items-center gap-x-3 sm:flex'>
      <span className='text-xs text-neutral-400'>{formatNow}</span>

      <Progress.Root
        className='relative h-[3px] w-48 cursor-pointer overflow-hidden rounded-full bg-neutral-600 md:w-[250px]'
        style={{ transform: 'translateZ(0)' }}
        value={progress}
        onClick={handleTimeChange}
      >
        <Progress.Indicator
          className='size-full rounded-full bg-white transition-transform'
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>

      <span className='text-xs text-neutral-400'>{formatDuration}</span>
    </div>
  )
}
