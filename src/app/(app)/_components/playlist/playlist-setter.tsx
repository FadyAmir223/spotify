import { useEffect } from 'react'

import type { getPlaylists } from '@/data/user'

import { usePlaylist } from '../../_contexts/playlist-context'

type PlaylistSetterProps = {
  playlists: Awaited<ReturnType<typeof getPlaylists>>
}

export default function PlaylistSetter({ playlists }: PlaylistSetterProps) {
  const { setPlaylists } = usePlaylist()

  useEffect(() => {
    setPlaylists(playlists)
  }, [playlists]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
