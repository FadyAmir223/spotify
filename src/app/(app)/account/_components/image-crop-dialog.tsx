import * as Slider from '@radix-ui/react-slider'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import type { Area, Point } from 'react-easy-crop'
import Cropper from 'react-easy-crop'

import { Button } from '@/components/ui/button'

type ImageCropDialogProps = {
  imageSrc: string
  setOpen: Dispatch<SetStateAction<boolean>>
  onCropComplete: (_: unknown, croppedAreaPixels: Area) => void
}

export default function ImageCropDialog({
  imageSrc,
  setOpen,
  onCropComplete,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)

  return (
    <div>
      <div className='fixed inset-0 bg-black' />
      <div className='fixed inset-x-0 bottom-20 top-0'>
        <Cropper
          image={imageSrc}
          crop={crop}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          zoom={zoom}
          onZoomChange={setZoom}
          aspect={1}
          showGrid={false}
        />

        <div className='fixed bottom-0 h-20 w-full'>
          <div className='mt-1.5 flex items-center justify-center'>
            <Slider.Root
              className='relative flex h-5 w-1/2 cursor-pointer touch-none select-none items-center md:w-1/3'
              defaultValue={[1.5]}
              min={1}
              max={3}
              step={0.1}
              value={[zoom]}
              onValueChange={(newValue) => setZoom(newValue[0])}
            >
              <Slider.Track className='relative h-[3px] grow rounded-full bg-neutral-600'>
                <Slider.Range className='absolute h-full rounded-full bg-white' />
              </Slider.Track>
              <Slider.Thumb
                className='block size-4 rounded-[99px] bg-white transition hover:bg-white/85 focus:outline-none'
                aria-label='Zoom'
              />
            </Slider.Root>
          </div>

          <div className='mt-0.5 text-center'>
            <Button onClick={() => setOpen(false)}>Crop</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
