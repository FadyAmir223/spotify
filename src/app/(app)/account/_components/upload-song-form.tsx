'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { Area } from 'react-easy-crop'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import { uploadSong } from '../_actions/upload-song'
import { getImage } from '../_utils/image/get-image'
import {
  type SongClientSchema,
  songClientSchema,
} from '../_validations/new-song.client'
import ImageCropDialog from './image-crop-dialog'

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
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isOpen, setOpen] = useState(false)

  const onCropComplete = (_: unknown, croppedAreaInPixels: Area) =>
    setCroppedAreaPixels(croppedAreaInPixels)

  const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result))
      reader.readAsDataURL(file)
    })
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!(event.target.files && event.target.files.length > 0)) return

    const file = event.target.files[0]

    if (!file.type.startsWith('image/'))
      return setError('image', { message: 'Invalid image format' })

    setImageSrc((await readFile(file)) as string)
    setOpen(true)
    setError('image', { message: '' })
  }

  const onSubmit = async (formData: SongClientSchema) => {
    try {
      const image = await getImage(imageSrc, croppedAreaPixels)
      if (!image) return

      const form = new FormData()
      form.append('title', formData.title)
      form.append('song', formData.song)
      form.append('image', image)

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
        <Input type='file' {...register('image')} onChange={onFileChange} />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.image?.message}
        </p>

        {isOpen && imageSrc && (
          <ImageCropDialog
            imageSrc={imageSrc}
            setOpen={setOpen}
            onCropComplete={onCropComplete}
          />
        )}
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
