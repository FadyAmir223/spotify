import * as RadixSlider from '@radix-ui/react-slider'
import { forwardRef } from 'react'
import { IoVolumeMedium, IoVolumeOff } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { initVolume, volumeUnit } from '@/utils/constants'

import { useVolume } from '../../_contexts/volume-context'

export default forwardRef(function Slider(
  _,
  ref: React.Ref<HTMLButtonElement> | null,
) {
  const { volume, setVolume } = useVolume()
  const isMuted = volume <= 0

  const Icon = isMuted ? IoVolumeOff : IoVolumeMedium

  return (
    <div className='ml-auto hidden w-36 items-center gap-x-2 sm:flex'>
      <Button
        ref={ref}
        variant='none'
        size='none'
        onClick={() => setVolume()}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className='focus-within:text-white/50'
      >
        <Icon className={cn('size-6', { '-ml-[3.3px]': isMuted })} />
      </Button>

      <RadixSlider.Root
        className='relative flex h-5 w-[200px] cursor-pointer touch-none select-none items-center'
        defaultValue={[initVolume]}
        value={[volume]}
        onValueChange={(newValue) => setVolume(newValue[0])}
        max={1}
        step={volumeUnit}
      >
        <RadixSlider.Track className='relative h-[3px] grow rounded-full bg-neutral-600'>
          <RadixSlider.Range className='absolute h-full rounded-full bg-white' />
        </RadixSlider.Track>
      </RadixSlider.Root>
    </div>
  )
})
