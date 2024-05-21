import { getPlaylists } from '@/data/user/user'

import PlaylistsList from './playlists-list'

export default async function PlaylistGetter() {
  const playlists = await getPlaylists()

  return <PlaylistsList playlists={playlists} />
}
