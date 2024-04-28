import Image from 'next/image'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

// @ts-ignore
import icon from '@/../public/images/icon.png'
import { Button } from '@/components/ui/button'

export default function Library() {
  return (
    <section className='row-start-2 h-full w-[300px] overflow-y-auto rounded-lg bg-grayish-background p-3 scrollbar-hide'>
      <div className='mb-5 flex items-center justify-between px-3 text-grayish-foreground'>
        <div className='flex items-center gap-x-2'>
          <TbPlaylist className='size-5' />
          <span className='text-sm font-medium'>Your Library</span>
        </div>
        <Button
          variant='none'
          className='size-7 cursor-pointer rounded-full p-1 transition hover:bg-zinc-700 hover:text-white'
          aria-label='Create playlist'
        >
          <AiOutlinePlus className='size-5' />
        </Button>
      </div>

      <nav>
        {Array.from({ length: 9 }).map((item, idx) => (
          <Link
            key={idx} // eslint-disable-line react/no-array-index-key
            href=' '
            className='flex items-center gap-x-3 rounded-sm p-1.5 hover:bg-zinc-800'
          >
            <Image src={icon} alt='' className='size-10 rounded-sm' />
            <div>
              <p className='truncate text-sm font-medium'>my favourites</p>
              <span className='truncate text-[0.8125rem] text-grayish-foreground'>
                Playlist • Fezza
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  )
}
