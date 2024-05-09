import { getLikedSongs } from '@/data/user'
import { PLAYLIST } from '@/utils/constants'

import SongItem from '../song-item'

export default async function LikesList() {
  const likedSongs = await getLikedSongs()

  if (likedSongs.length === 0)
    return (
      <p className='mt-3 text-center text-sm text-neutral-400'>
        you didn&apos;t like any song yet
      </p>
    )

  return likedSongs.map((song, index) => (
    <SongItem
      key={song.id}
      index={index}
      songs={likedSongs}
      playlistName={PLAYLIST.likes}
    />
  ))
}
