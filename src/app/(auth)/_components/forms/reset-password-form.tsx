'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { PLACEHOLDER } from '@/utils/constants'

import { resetPassword } from '../../_actions/reset-password'
import type { ResetPasswordSchema } from '../../_validations/reset-password'
import { resetPasswordSchema } from '../../_validations/reset-password'

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const {
    register,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const submit = async () => {
    const result = await trigger()
    if (!result) return

    const formData = getValues()

    startTransition(() => {
      resetPassword(formData)
        .then((response) => {
          if (response?.error)
            return setError('email', { message: response.error })
          toast({ variant: 'success', description: response.message })
        })
        .catch(() => {
          toast({
            description: 'something went wrong',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <form action={submit}>
      <Label>Email</Label>
      <Input
        type='text'
        placeholder={PLACEHOLDER.email}
        {...register('email')}
      />

      <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
        {errors.email?.message}
      </p>

      <Button className='mt-2 w-full py-5 text-base' disabled={isPending}>
        Send reset email
      </Button>
    </form>
  )
}
