import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { renamePlaylist } from '../../_actions/playlist'
import type { PlaylistEssentials } from '../../_types/playlist'
import type { PlaylistNameSchema } from '../../_validations/playlist'

type PlaylistRenameFormProps = {
  playlist: Omit<PlaylistEssentials, 'imagePath'>
  setRenamingIndex: (value: number) => void
}

export default function PlaylistRenameForm({
  playlist,
  setRenamingIndex,
}: PlaylistRenameFormProps) {
  const { register, trigger, getValues } = useForm<PlaylistNameSchema>({
    defaultValues: { playlistName: playlist.title },
  })

  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node))
        setRenamingIndex(-1)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setRenamingIndex(-1)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRenamePlaylist = async () => {
    const result = await trigger()
    if (!result) return

    const formData = getValues()

    if (formData.playlistName === '') return setRenamingIndex(-1)

    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur()

    try {
      const data = {
        playlistName: formData.playlistName,
        playlistId: playlist.id,
      }
      const response = await renamePlaylist(data)
      if (response?.error)
        toast({
          description: response.error,
          variant: 'destructive',
        })
    } catch {
      toast({
        description: "couldn't rename playlist",
        variant: 'destructive',
      })
    }

    setRenamingIndex(-1)
  }

  return (
    <form ref={formRef} action={handleRenamePlaylist}>
      <Input
        type='text'
        className='h-5 rounded-none border-0 bg-neutral-700/60 p-0 text-sm font-medium outline-none focus-visible:ring-0'
        autoComplete='off'
        {...register('playlistName')}
        onClick={(e) => e.preventDefault()}
      />
    </form>
  )
}
