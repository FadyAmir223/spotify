import Image from 'next/image'
import { RxTriangleRight } from 'react-icons/rx'

// @ts-ignore
import cover from '@/../public/images/cover.jpeg'
import { Button } from '@/components/ui/button'

export default function Song() {
  return (
    <div className='group rounded-sm bg-[#1E1E1E] p-3 transition hover:bg-[#242424]'>
      <div className='relative'>
        <Image src={cover} className='aspect-square rounded-md' alt='' />
        <Button
          size='icon'
          className='absolute bottom-2 right-2 flex size-10 translate-y-1/4 items-center rounded-full bg-primary p-1 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100'
        >
          <RxTriangleRight className='size-7 text-black' />
        </Button>
      </div>

      <div className='mt-2.5'>
        <p className='truncate text-sm font-medium text-white'>SongName</p>
        <span className='truncate text-sm text-grayish-foreground'>
          by Fezza
        </span>
      </div>
    </div>
  )
}
