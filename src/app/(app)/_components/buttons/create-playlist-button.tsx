'use client'

import { BiPlus } from 'react-icons/bi'

import { Button } from '@/components/ui/button'

export default function CreatePlaylistButton() {
  return (
    <Button
      variant='none'
      size='none'
      className='size-9 rounded-full transition hover:bg-neutral-800/50'
      onClick={() => {}}
      aria-label='Create Playlist'
    >
      <BiPlus className='size-6 text-white/50' />
    </Button>
  )
}
