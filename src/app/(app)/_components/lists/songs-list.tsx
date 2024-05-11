import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { getSongs } from '@/data/song'

import PlaySongButton from '../buttons/play-song-button'

export default async function SongsList() {
  const songs = await getSongs()

  return songs?.map((song, index) => (
    <Card
      key={song.id}
      className='group rounded-md bg-[#1E1E1E] p-3 transition hover:bg-[#242424]'
    >
      <CardContent className='relative'>
        <div className='relative aspect-square size-full'>
          <Image
            src={song.imagePath}
            alt={song.title}
            className='rounded-md'
            sizes='
              (max-width: 639px) 50vw, 
              (max-width: 767px) 33vw, 
              (max-width: 1023px) calc((100vw - 300px) / 3), 
              (max-width: 1279px) calc((100vw - 300px) / 4), 
              calc((100vw - 300px) / 8)'
            fill
            priority={index < 4}
          />
        </div>
        <PlaySongButton index={index} songs={songs} />
      </CardContent>

      <CardContent className='mt-2.5 capitalize'>
        <CardTitle className='truncate text-sm font-medium text-white'>
          {song.title}
        </CardTitle>
        <CardDescription className='truncate text-sm text-grayish-foreground'>
          {song.artist.name}
        </CardDescription>
      </CardContent>
    </Card>
  ))
}
