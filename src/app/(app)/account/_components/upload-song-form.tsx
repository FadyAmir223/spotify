'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import { uploadSong } from '../_actions/upload-song'
import {
  type SongClientSchema,
  songClientSchema,
} from '../_validations/new-song.client'

export default function UploadSongForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SongClientSchema>({
    resolver: zodResolver(songClientSchema),
  })

  const { toast } = useToast()

  const onSubmit = async (formData: SongClientSchema) => {
    const form = new FormData()
    form.append('title', formData.title)
    form.append('image', formData.image)
    form.append('song', formData.song)

    try {
      const response = await uploadSong(form)

      if (response?.errors)
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as keyof SongClientSchema, {
            type: 'validate',
            message: message as string,
          })
        })

      if (response?.error)
        return toast({
          description: response.error,
          variant: 'destructive',
        })

      toast({
        description: 'song has been uploaded',
        variant: 'success',
      })
    } catch (e) {
      toast({
        description: "couldn't upload song",
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto max-w-sm space-y-3'
    >
      <div className='space-y-1'>
        <Label>Song title</Label>
        <Input type='text' autoComplete='off' {...register('title')} />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.title?.message}
        </p>
      </div>

      <div className='space-y-1'>
        <Label>Cover image</Label>
        <Input type='file' {...register('image')} />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.image?.message}
        </p>
      </div>

      <div className='space-y-1'>
        <Label>Audio</Label>
        <Input type='file' {...register('song')} />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.song?.message}
        </p>
      </div>

      <Button disabled={isSubmitting}>Upload song</Button>
    </form>
  )
}
