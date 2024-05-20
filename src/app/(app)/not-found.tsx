import Image from 'next/image'
import Link from 'next/link'

import playlistNotFound from '@/../public/images/playlist-not-found.svg'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='grid h-full place-items-center'>
      <div className='flex flex-col items-center'>
        <Image src={playlistNotFound} alt='not-found' width={120} priority />
        <h3 className='mb-3 mt-12 text-4xl font-bold'>Playlist not found</h3>
        <p className='mb-5 text-sm text-white/70'>
          Something went wrong, please try again later
        </p>

        <Button
          asChild
          variant='none'
          className='rounded-full bg-white text-black shadow transition hover:bg-neutral-300'
        >
          <Link href='/'>Home</Link>
        </Button>
      </div>
    </main>
  )
}
