'use client'

import { BiPlus } from 'react-icons/bi'

import { Button } from '@/components/ui/button'

import { usePlaylist } from '../../_contexts/playlist-context'

export default function CreatePlaylistButton() {
  const { setAddingPlaylist } = usePlaylist()

  return (
    <Button
      variant='none'
      size='none'
      className='size-9 rounded-full transition hover:bg-neutral-800/50'
      onClick={() => setAddingPlaylist(true)}
      aria-label='Create Playlist'
    >
      <BiPlus className='size-6 text-white/50' />
    </Button>
  )
}
