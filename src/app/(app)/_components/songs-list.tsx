import { getSongs } from '@/data/song'

import PlayButton from './buttons/play-song-button'
import SongsListImage from './songs-list-image'

export default async function SongsList() {
  const songs = await getSongs()

  return songs?.map((song, index) => (
    <div
      key={song.id}
      className='group rounded-md bg-[#1E1E1E] p-3 transition hover:bg-[#242424]'
    >
      <div className='relative'>
        <div className='relative aspect-square size-full'>
          <SongsListImage
            index={index}
            imagePath={song.imagePath}
            title={song.title}
          />
        </div>
        <PlayButton index={index} songs={songs} />
      </div>

      <div className='mt-2.5 capitalize'>
        <p className='truncate text-sm font-medium text-white'>{song.title}</p>
        <p className='truncate text-sm text-grayish-foreground'>
          {song.artist.name}
        </p>
      </div>
    </div>
  ))
}
