'use client'

import type { Song } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { useEffect, useOptimistic, useTransition } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ky from '@/lib/ky'

import { toggleLikeSong } from '../../_actions/toggle-like-song'
import { useLikes } from '../../_contexts/likes-context'
import { likedSchema } from '../../_validations/liked'

type LikeButtonProps = {
  songId: Song['id']
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const { likes, setLikes } = useLikes()

  const isLiked = likes[songId] ?? false

  const [optimisticIsLiked, optimisticToggleLiked] = useOptimistic(
    isLiked,
    (_, newState: boolean) => newState,
  )

  useEffect(() => {
    if (likes[songId] !== undefined) return setLikes(songId, likes[songId])
    ;(async () => {
      const response = await ky(`song/like/${songId}`, {
        next: { tags: ['likes', songId] },
      }).json()

      if (!response) return
      const parsedLiked = likedSchema.parse(response)
      setLikes(songId, parsedLiked.liked)
    })()
  }, [songId]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLikeSong = () => {
    // not disabling the button for the mouse cursor
    if (isPending) return

    startTransition(() => {
      optimisticToggleLiked(!isLiked)

      toggleLikeSong({ id: songId, isLiked, pathname })
        .then((res) => {
          if (res?.error)
            return toast({
              description: res.error,
              variant: 'destructive',
            })

          setLikes(songId, !isLiked)
        })
        .catch(() => {
          toast({
            description: 'Something went wrong',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <Button
      variant='none'
      size='none'
      className='transition hover:opacity-70'
      onClick={handleLikeSong}
    >
      {optimisticIsLiked ? (
        <FaHeart className='size-[1.125rem] text-primary' />
      ) : (
        <FaRegHeart className='size-4' />
      )}
    </Button>
  )
}
