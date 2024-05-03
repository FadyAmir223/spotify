import * as RadixSlider from '@radix-ui/react-slider'
import { IoVolumeMedium, IoVolumeOff } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { initVolume } from '@/utils/constants'

type SliderProps = {
  volume: number
  setVolume: {
    (type: 'set', value: number): void
    (type: 'reset'): void
  }
}

export default function Slider({ volume, setVolume }: SliderProps) {
  const isMuted = volume === 0

  const handleToggle = () => {
    if (isMuted) setVolume('reset')
    else setVolume('set', 0)
  }

  const Icon = isMuted ? IoVolumeOff : IoVolumeMedium

  return (
    <div className='ml-auto hidden w-36 items-center gap-x-2 sm:flex'>
      <Button
        variant='none'
        size='none'
        onClick={handleToggle}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <Icon className='size-6' />
      </Button>

      <RadixSlider.Root
        className='relative flex h-5 w-[200px] cursor-pointer touch-none select-none items-center'
        defaultValue={[initVolume]}
        value={[volume]}
        onValueChange={(newValue) => setVolume('set', newValue[0])}
        max={1}
        step={0.1}
      >
        <RadixSlider.Track className='relative h-[3px] grow rounded-full bg-neutral-600'>
          <RadixSlider.Range className='absolute h-full rounded-full bg-white' />
        </RadixSlider.Track>
      </RadixSlider.Root>
    </div>
  )
}
