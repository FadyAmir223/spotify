'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { PiPlaylistFill } from 'react-icons/pi'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import type { getPlaylists } from '@/data/user'

import { deletePlaylist } from '../../_actions/playlist'
import PlaylistForm from './playlist-form'
import PlaylistRenameForm from './playlist-rename-form'
import PlaylistSetter from './playlist-setter'

type PlaylistsListProps = {
  playlists: Awaited<ReturnType<typeof getPlaylists>>
}

export default function PlaylistsList({ playlists }: PlaylistsListProps) {
  const { toast } = useToast()
  const pathname = usePathname()
  const router = useRouter()

  const [renamingIndex, setRenamingIndex] = useState(-1)
  const [deletingIndex, setDeletingIndex] = useState(-1)

  const handlePlaylistDelete = async () => {
    try {
      const response = await deletePlaylist({
        playlistId: playlists[deletingIndex].id,
      })

      if (response?.error)
        return toast({
          description: response.error,
          variant: 'destructive',
        })
      setDeletingIndex(-1)

      if (pathname !== `/playlist/${playlists[deletingIndex].id}`) return

      const newRoute =
        playlists[deletingIndex + 1]?.id ??
        playlists[deletingIndex - 1]?.id ??
        ''
      router.push(`${newRoute ? '/playlist/' : '/'}${newRoute}`)
    } catch {
      toast({
        description: 'something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <PlaylistSetter playlists={playlists} />
      <PlaylistForm />

      {playlists.map(({ id, title, imagePath }, index) => (
        <ContextMenu key={id}>
          <ContextMenuTrigger>
            <Link
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
                <div className='grid aspect-square size-10 place-items-center rounded-sm bg-gray-700/70'>
                  <PiPlaylistFill className='size-6' />
                </div>
              )}

              <div className='grow'>
                {index === renamingIndex ? (
                  <PlaylistRenameForm
                    key={id}
                    playlist={{ id, title }}
                    setRenamingIndex={setRenamingIndex}
                  />
                ) : (
                  <p className='w-[13.25rem] truncate text-sm font-medium'>
                    {title}
                  </p>
                )}
                <span className='w-[13.25rem] truncate text-[0.8125rem] text-grayish-foreground'>
                  Playlist
                </span>
              </div>
            </Link>
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuItem>
              <Button
                variant='none'
                size='none'
                className='size-full justify-start px-2 py-1.5'
                onClick={() => setRenamingIndex(index)}
              >
                <MdEdit size={16} className='mr-1' />
                Rename playlist
              </Button>
            </ContextMenuItem>

            <ContextMenuItem>
              <Button
                variant='none'
                size='none'
                className='size-full justify-start bg-destructive px-2 py-1.5 text-destructive-foreground hover:bg-destructive/80'
                onClick={() => setDeletingIndex(index)}
              >
                <FaTrash size={16} className='mr-1' />
                Delete playlist
              </Button>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}

      <Dialog
        open={deletingIndex >= 0}
        onOpenChange={() => setDeletingIndex(-1)}
      >
        <DialogContent className='h-36 px-10'>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete{' '}
              <span className='text-primary/80'>
                {playlists[deletingIndex]?.title}
              </span>{' '}
              playlist?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='destructive'
              className='mt-auto'
              onClick={handlePlaylistDelete}
            >
              delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
