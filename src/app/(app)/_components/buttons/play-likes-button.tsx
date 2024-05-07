'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type MouseEvent, useTransition } from 'react'

import { useToast } from '@/components/ui/use-toast'
import ky from '@/lib/ky'
import { cn } from '@/utils/cn'

import { useLikes } from '../../_contexts/likes-context'
import { useDispatchSong, useValueSong } from '../../_contexts/song-context'
import { keys } from '../../_lib/keys'
import { composeUri } from '../../_utils/compose-uri'
import { likedSongsSchema } from '../../_validations/liked-songs'
import TriangleButton from './triangle-button'

export default function PlayFavoritesButton() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  const { currPlaylistName } = useValueSong()
  const { setSongsQueue } = useDispatchSong()
  const { setLikes } = useLikes()

  const handlePlayLikes = async (e: MouseEvent<HTMLButtonElement>) => {
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

          setLikes(likedSongs.map(({ id }) => id))
          setSongsQueue({ playlistName: 'likes', songs: likedSongs, index: 0 })
        })
        .catch(() =>
          toast({
            description: "couldn't start the playlist",
          }),
        )
    })
  }

  const isLikesPlaylist = currPlaylistName === 'likes'

  return (
    <TriangleButton
      className={cn('ml-auto mr-4 size-10 group-hover:opacity-100', {
        'opacity-0': !isLikesPlaylist,
      })}
      onClick={handlePlayLikes}
      isMatching={isLikesPlaylist}
    />
  )
}
