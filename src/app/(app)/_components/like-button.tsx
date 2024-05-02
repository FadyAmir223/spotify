'use client'

import type { Song } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useOptimistic, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ky from '@/lib/ky'

import { toggleLikeSong } from '../_actions/like-song'
import { keys } from '../_lib/keys'
import { composeUri } from '../_utils/compose-uri'
import type { LikedSchema } from '../_validations/liked'
import { likedSchema } from '../_validations/liked'

type LikeButtonProps = {
  songId: Song['id']
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const { toast } = useToast()

  const [isLiked, setIsLiked] = useState(false)
  const [optimisticIsLiked, optimisticToggleLiked] = useOptimistic(
    isLiked,
    (_, newState: boolean) => newState,
  )

  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: keys.song(songId),
    queryFn: async ({ queryKey }) => (await ky(composeUri(queryKey))).json(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 3,
  })

  useEffect(() => {
    if (!data) return
    const validatedLiked = likedSchema.parse(data)
    if (validatedLiked.liked) setIsLiked(true)
  }, [data])

  const handleLikeSong = async () => {
    try {
      optimisticToggleLiked(!isLiked)
      const res = await toggleLikeSong({ id: songId, isLiked })

      if (res?.error)
        return toast({
          description: res.error,
          variant: 'destructive',
        })

      queryClient.setQueryData<LikedSchema>(keys.song(songId), {
        liked: !isLiked,
      })
      setIsLiked(!isLiked)
    } catch {
      toast({
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <form action={handleLikeSong}>
      <Button
        variant='none'
        size='icon'
        className='transition hover:opacity-85'
      >
        {optimisticIsLiked ? (
          <FaHeart className='size-[1.125rem] text-primary' />
        ) : (
          <FaRegHeart className='size-4' />
        )}
      </Button>
    </form>
  )
}
