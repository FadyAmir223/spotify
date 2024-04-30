'use client'

import type { Song } from '@prisma/client'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

import { toggleLikeSong } from '../_actions/like-song'

type LikeButtonProps = {
  songId: Song['id']
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const liked = false

  const handleLikeSong = async () => {
    await toggleLikeSong(songId)
  }

  return (
    <Button variant='none' size='icon' onClick={handleLikeSong} className=''>
      {liked ? (
        <FaHeart className='size-[1.125rem] text-primary' />
      ) : (
        <FaRegHeart className='size-4 transition hover:opacity-80' />
      )}
    </Button>
  )
}
