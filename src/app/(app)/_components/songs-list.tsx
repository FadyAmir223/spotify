import Image from 'next/image'

import { getSongs } from '@/data/song'

import PlayButton from './buttons/play-song-button'

export default async function SongsList() {
  const songs = await getSongs()

  return songs?.map((song, index) => (
    <div
      key={song.id}
      className='group rounded-md bg-[#1E1E1E] p-3 transition hover:bg-[#242424]'
    >
      <div className='relative'>
        <div className='relative aspect-square size-full'>
          <Image
            src={song.imagePath}
            alt={song.title}
            className='rounded-md'
            fill
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
