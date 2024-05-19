import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { Area } from 'react-easy-crop'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils/cn'

import { readFile } from '../_utils/read-file'
import type { NewSongSchema } from '../_validations/new-song'
import ImageCropDialog from './image-crop-dialog'

type InputImageProps = {
  croppedAreaPixels: Area | null
  setCroppedAreaPixels: Dispatch<SetStateAction<Area | null>>
  setImageSrc: Dispatch<SetStateAction<Blob | null>>
}

export default function InputImage({
  croppedAreaPixels,
  setCroppedAreaPixels,
  setImageSrc,
}: InputImageProps) {
  const [isOpen, setOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    unregister,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<NewSongSchema>()

  useEffect(() => {
    register('image')
    return () => unregister('image')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onDrop = useCallback(async (files: File[]) => {
    if (files.length === 0) return
    const file = files[0]

    if (file.size <= 0) return setError('image', { message: 'Image is empty' })
    clearErrors('image')

    setImagePreview((await readFile(file)) as string)
    setValue('image', file)
    setOpen(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/*': [] },
  })

  return (
    <div className='space-y-1'>
      <Label>Cover image</Label>

      <div {...getRootProps()}>
        <Input name='image' {...getInputProps()} />

        <div
          className={cn(
            'transition h-24 w-full grid place-items-center border-4 border-dotted border-zinc-500',
            {
              'border-green-500': isDragAccept,
              'border-destructive': isDragReject,
            },
          )}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt='Preview cropped'
              width={88}
              height={88}
            />
          ) : (
            <p>
              {isDragActive && isDragAccept
                ? 'Drop the image here'
                : 'Drag an image here'}
            </p>
          )}
        </div>
      </div>

      <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
        {errors.image?.message}
      </p>

      {isOpen && imagePreview && (
        <ImageCropDialog
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          croppedAreaPixels={croppedAreaPixels}
          setCroppedAreaPixels={setCroppedAreaPixels}
          setImageSrc={setImageSrc}
          setOpen={setOpen}
        />
      )}
    </div>
  )
}
