import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { PiPlaylistFill } from 'react-icons/pi'

import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { createPlaylist } from '../../_actions/playlist'
import { usePlaylist } from '../../_contexts/playlist-context'
import type { NewPlaylistSchema } from '../../_validations/playlist'

function Form() {
  const { register, setFocus, trigger, getValues } = useForm<NewPlaylistSchema>(
    { defaultValues: { playlistName: 'my playlist' } },
  )

  const { stashSong, setStashSong, setAddingPlaylist } = usePlaylist()
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    setFocus('playlistName')

    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setAddingPlaylist(false)
        setStashSong(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAddingPlaylist(false)
        setStashSong(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreatePlaylist = async () => {
    const result = await trigger()
    if (!result) return

    const formData = getValues()

    if (formData.playlistName === '') {
      setAddingPlaylist(false)
      setStashSong(null)
      return
    }

    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur()

    try {
      const data = { playlistName: formData.playlistName, stashSong }
      const response = await createPlaylist(data)
      if (response?.error)
        toast({
          description: response.error,
          variant: 'destructive',
        })
    } catch {
      toast({
        description: "couldn't create playlist",
        variant: 'destructive',
      })
    }

    setAddingPlaylist(false)
    setStashSong(null)
  }

  return (
    <div className='flex items-center gap-x-3 rounded-sm p-1.5'>
      <div className='grid size-10 place-items-center rounded-sm bg-gray-700/70'>
        <PiPlaylistFill className='size-6' />
      </div>
      <div className='grow'>
        <form ref={formRef} action={handleCreatePlaylist}>
          <Input
            type='text'
            className='h-5 rounded-none border-0 bg-neutral-700/60 p-0 text-sm font-medium outline-none focus-visible:ring-0'
            autoComplete='off'
            {...register('playlistName')}
          />
        </form>
        <span className='text-[0.8125rem] text-grayish-foreground'>
          Playlist
        </span>
      </div>
    </div>
  )
}

export default function PlaylistForm() {
  const { isAddingPlaylist } = usePlaylist()

  // to focus every time on the same item
  return isAddingPlaylist && <Form />
}
