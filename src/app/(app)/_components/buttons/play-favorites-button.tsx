'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type MouseEvent, useTransition } from 'react'

import { useToast } from '@/components/ui/use-toast'
import ky from '@/lib/ky'

import { useDispatchSong } from '../../_contexts/song-context'
import { keys } from '../../_lib/keys'
import { composeUri } from '../../_utils/compose-uri'
import { likedSongsSchema } from '../../_validations/liked-songs'
import TriangleButton from './triangle-button'

export default function PlayFavoritesButton() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const { setSongsQueue } = useDispatchSong()

  const handleSongChange = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isPending) return

    startTransition(() => {
      queryClient
        .ensureQueryData({
          queryKey: keys.like,
          queryFn: async () => ky(composeUri(keys.like)).json(),
        })
        .then((data) => {
          const result = likedSongsSchema.safeParse(data)
          if (!result.success)
            return toast({
              description: "couldn't start the playlist",
            })

          const { likedSongs } = result.data

          setSongsQueue({ playlistName: 'likes', songs: likedSongs, index: 0 })
        })
        .catch(() =>
          toast({
            description: "couldn't start the playlist",
          }),
        )
    })
  }

  return (
    <TriangleButton
      className='ml-auto mr-4 size-10 opacity-0 group-hover:opacity-100'
      onClick={handleSongChange}
    />
  )
}
