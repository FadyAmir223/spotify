import Image from 'next/image'
import Link from 'next/link'

import pageNotFound from '@/../public/images/page-not-found.svg'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='grid h-screen place-items-center bg-grayish-background'>
      <div className='flex flex-col items-center'>
        <Image src={pageNotFound} alt='not-found' width={150} priority />
        <h3 className='mb-5 mt-12 text-4xl font-bold'>Page not found</h3>

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
