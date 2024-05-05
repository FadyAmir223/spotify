import { getLikedSongs } from '@/data/user'

import LikesItem from '../likes-item'

export default async function LikesList() {
  const likedSongs = await getLikedSongs()

  return likedSongs.map((song, index) => (
    <LikesItem key={song.id} index={index} songs={likedSongs} />
  ))
}
