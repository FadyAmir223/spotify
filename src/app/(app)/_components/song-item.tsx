'use client'

import type { Playlist } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { forwardRef, type Ref } from 'react'
import { BiPlus } from 'react-icons/bi'
import { MdFormatListBulletedAdd } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useToast } from '@/components/ui/use-toast'
import type { getLikedSongs } from '@/data/user'

import { addSongToPlaylist } from '../_actions/playlist'
import { usePlaylist } from '../_contexts/playlist-context'
import { useDispatchSong } from '../_contexts/song-context'
import ArtistMedia from './artist-media'
import LikeButton from './buttons/like-button'

type SongsWithArtist = Awaited<ReturnType<typeof getLikedSongs>>

type SongItemProps = {
  index: number
  songs: SongsWithArtist
  playlistName: string
}

export default forwardRef(function SongItem(
  { index, songs, playlistName }: SongItemProps,
  ref: Ref<HTMLLIElement> | null,
) {
  const { setSongsQueue } = useDispatchSong()
  const { playlists, setAddingPlaylist, setStashSong } = usePlaylist()
  const { toast } = useToast()
  const pathname = usePathname()

  const song = songs[index]

  const handleCreatePlaylistWithSong = () => {
    setAddingPlaylist(true)
    setStashSong(song.id)
  }

  const handleAddSongToPlaylist = async (playlistId: Playlist['id']) => {
    const response = await addSongToPlaylist({ playlistId, songId: song.id })

    if (response?.error)
      toast({
        description: response.error,
        variant: 'destructive',
      })

    toast({
      description: 'song has been added',
      variant: 'success',
    })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li ref={ref} className='flex items-center gap-x-3'>
          <ArtistMedia
            As={Button}
            variant='none'
            size='none'
            className='w-full rounded-md py-2'
            artistName={song.artist.name}
            song={{ title: song.title, imagePath: song.imagePath }}
            onClick={() => setSongsQueue({ playlistName, songs, index })}
          />

          <LikeButton
            songId={song.id}
            definitelyLiked={pathname === '/likes'}
          />
        </li>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuItem className='px-2 py-1.5'>
            <MdFormatListBulletedAdd size={16} className='mr-1' />
            Add To Queue
          </ContextMenuItem>

          <ContextMenuSubTrigger className='w-40 px-2 py-1.5'>
            <BiPlus size={16} className='mr-1' />
            Add to playlist
          </ContextMenuSubTrigger>

          <ContextMenuSubContent className='w-44'>
            <ContextMenuItem>
              <Button
                variant='none'
                size='none'
                className='size-full justify-start px-2 py-1.5'
                onClick={handleCreatePlaylistWithSong}
              >
                <BiPlus size={16} className='mr-1' />
                Create playlist
              </Button>
            </ContextMenuItem>

            <ContextMenuSeparator />

            {playlists
              .filter(({ id }) => id !== pathname.split('/').at(-1))
              .map((playlist) => (
                <ContextMenuItem key={playlist.id}>
                  <Button
                    variant='none'
                    size='none'
                    className='size-full justify-start px-2 py-1.5'
                    onClick={() => handleAddSongToPlaylist(playlist.id)}
                  >
                    {playlist.title}
                  </Button>
                </ContextMenuItem>
              ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
})
