'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirectToParam } from '@/utils/constants'
import { getErrorMessage } from '@/utils/getErrorMessage.util'

import { login } from '../_actions/login'
import { type LoginFormSchema, loginFormSchema } from '../_validations/login'
import LoginButton from './login-button'

const inputs = [
  { type: 'text', label: 'Email', name: 'email' },
  { type: 'password', label: 'Password', name: 'password' },
] as const

export default function LoginForm() {
  const [loginError, setError] = useState('')

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(redirectToParam)

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  // keep progressive enhancement, but lose error messages updtae
  const handleLogin = async () => {
    setError('')

    const result = await trigger()
    if (!result) return

    const formData = getValues()

    try {
      const response = await login(formData, redirectTo)
      if (response?.error) setError(response.error)
    } catch (error) {
      setError(getErrorMessage(error))
    }
  }

  return (
    <form action={handleLogin}>
      {inputs.map((input) => (
        <div key={input.name} className='mb-1.5'>
          <Label>{input.label}</Label>
          <Input type={input.type} {...register(input.name)} />
          <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
            {errors[input.name]?.message}
          </p>
        </div>
      ))}

      <LoginButton className='mb-1 mt-2'>Login</LoginButton>

      <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
        {loginError}
      </p>
    </form>
  )
}
