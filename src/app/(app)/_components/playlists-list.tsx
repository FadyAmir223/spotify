import Image from 'next/image'
import Link from 'next/link'
import { PiPlaylistFill } from 'react-icons/pi'

import { getPlaylists } from '@/data/playlist'

export default async function PlaylistsList() {
  const playlists = await getPlaylists()

  return playlists?.map(({ id, title, imagePath }) => (
    <Link
      key={id}
      href={`/playlist/${id}`}
      className='flex items-center gap-x-3 rounded-sm p-1.5 transition hover:bg-neutral-800/50'
    >
      {imagePath ? (
        <div className='relative aspect-square size-10'>
          <Image
            src={imagePath}
            alt={`${title} playlist`}
            className='rounded-sm'
            sizes='2.5rem'
            fill
          />
        </div>
      ) : (
        <div className=''>
          <PiPlaylistFill />
        </div>
      )}

      <div className='grow'>
        <p className='truncate text-sm font-medium'>{title}</p>
        <span className='truncate text-[0.8125rem] text-grayish-foreground'>
          Playlist
        </span>
      </div>
    </Link>
  ))
}
