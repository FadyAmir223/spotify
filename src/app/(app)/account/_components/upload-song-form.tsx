'use client'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import type { Area } from 'react-easy-crop'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import { uploadSong } from '../_actions/upload-song'
import { resizeImage } from '../_utils/resize-image'
import { type NewSongSchema, newSongSchema } from '../_validations/new-song'
import InputImage from './input-image'

export default function UploadSongForm() {
  const methods = useForm<NewSongSchema>({
    resolver: zodResolver(newSongSchema),
  })

  const { toast } = useToast()
  const [imageSrc, setImageSrc] = useState<Blob | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onSubmit = async (formData: NewSongSchema) => {
    try {
      if (!imageSrc) return

      const imageFile = new File([imageSrc], '_.')
      const image = await resizeImage(imageFile)

      const form = new FormData()
      form.append('title', formData.title)
      form.append('song', formData.song)
      form.append('image', image)

      const response = await uploadSong(form)

      if (response?.errors)
        Object.entries(response.errors).forEach(([field, message]) => {
          methods.setError(field as keyof NewSongSchema, {
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
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='mx-auto max-w-sm space-y-3'
      >
        <div className='space-y-1'>
          <Label>Song title</Label>
          <Input
            type='text'
            autoComplete='off'
            {...methods.register('title')}
          />
          <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
            {methods.formState.errors.title?.message}
          </p>
        </div>

        <InputImage
          croppedAreaPixels={croppedAreaPixels}
          setCroppedAreaPixels={setCroppedAreaPixels}
          setImageSrc={setImageSrc}
        />

        <div className='space-y-1'>
          <Label>Audio</Label>
          <Input type='file' accept='audio/*' {...methods.register('song')} />
          <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
            {methods.formState.errors.song?.message}
          </p>
        </div>

        <Button disabled={methods.formState.isSubmitting}>Upload song</Button>

        {/* misleading: view only path for files */}
        <DevTool control={methods.control} />
      </form>
    </FormProvider>
  )
}
