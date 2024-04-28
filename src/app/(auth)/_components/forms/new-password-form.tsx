'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PLACEHOLDER, SEARCH_PARAMS } from '@/utils/constants'

import { newPassword } from '../../_actions/new-password'
import {
  type NewPasswordSchema,
  newPasswordSchema,
} from '../../_validations/new-password'

const inputs = [
  {
    label: 'Password',
    name: 'password',
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
  },
] as const

export default function NewPasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState('')

  const searchParams = useSearchParams()
  const token = searchParams.get(SEARCH_PARAMS.token)!

  const {
    register,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  })

  const submit = async () => {
    setServerError('')

    const result = await trigger()
    if (!result) return

    const formData = getValues()

    startTransition(async () => {
      const response = await newPassword({ ...formData, token })

      if (response?.errors)
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as keyof NewPasswordSchema, {
            type: 'validate',
            message: message as string,
          })
        })
      else if (response?.error) setServerError(response.error)
    })
  }

  return (
    <form action={submit}>
      {inputs.map((input) => (
        <div key={input.name}>
          <Label>{input.label}</Label>
          <Input
            type='password'
            placeholder={PLACEHOLDER.password}
            autoComplete='new-password'
            {...register(input.name)}
          />

          <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
            {errors[input.name]?.message}
          </p>
        </div>
      ))}

      <Button className='mt-2 w-full py-5 text-base' disabled={isPending}>
        Reset password
      </Button>

      <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
        {serverError}
      </p>
    </form>
  )
}
