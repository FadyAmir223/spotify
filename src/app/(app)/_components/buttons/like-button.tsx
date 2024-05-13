'use client'

import type { Song } from '@prisma/client'
import { useEffect, useOptimistic, useTransition } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ky from '@/lib/ky'

import { toggleLikeSong } from '../../_actions/toggle-like-song'
import { useLikes } from '../../_contexts/likes-context'

type LikeButtonProps = {
  songId: Song['id']
  definitelyLiked?: boolean
}

export default function LikeButton({
  songId,
  definitelyLiked,
}: LikeButtonProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const { likes, setLikes } = useLikes()

  const isLiked = likes[songId] ?? definitelyLiked

  const [optimisticIsLiked, optimisticToggleLiked] = useOptimistic(
    isLiked,
    (_, newState: boolean) => newState,
  )

  useEffect(() => {
    if (likes[songId] !== undefined) return setLikes(songId, likes[songId])
    if (definitelyLiked) return setLikes(songId, true)
    ;(async () => {
      const response = (await ky(`song/like/${songId}`, {
        next: { tags: ['likes', songId] },
      }).json()) as { liked: boolean }

      if (!response) return
      setLikes(songId, response.liked)
    })()
  }, [songId]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLikeSong = () => {
    // not disabling the button for the mouse cursor
    if (isPending) return

    startTransition(() => {
      optimisticToggleLiked(!isLiked)

      toggleLikeSong({ id: songId, isLiked })
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
      className='transition focus-within:opacity-70 hover:opacity-70 focus-visible:ring-0'
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
