'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordRoute } from '@/lib/routes'
import { SEARCH_PARAMS } from '@/utils/constants'
import { getErrorMessage } from '@/utils/getErrorMessage.util'

import { login } from '../../_actions/login'
import { type LoginFormSchema, loginFormSchema } from '../../_validations/login'
import LoginButton from '../login-button'
import OtpForm from './otp-form'

const inputs = [
  { type: 'text', label: 'Email', name: 'email' },
  { type: 'password', label: 'Password', name: 'password' },
] as const

export default function LoginForm() {
  const [loginError, setLoginError] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(SEARCH_PARAMS.redirectTo)

  useEffect(() => {
    const errorMessage = searchParams.get('error')
    if (!errorMessage) return

    setLoginError(
      errorMessage === 'OAuthAccountNotLinked'
        ? 'Email already in use with different provider'
        : errorMessage,
    )
  }, [searchParams])

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
    setLoginError('')

    const result = await trigger()
    if (!result) return

    const formData = getValues()

    try {
      const response = await login({ ...formData, redirectTo })

      if (response?.success) setOtpSent(true)
      else if (response?.error) setLoginError(response.error)
    } catch (error) {
      setLoginError(getErrorMessage(error))
    }
  }

  return (
    <>
      <OtpForm
        isOpen={otpSent}
        setIsOpen={setOtpSent}
        credentials={{
          email: getValues('email'),
          password: getValues('password'),
          redirectTo,
        }}
      />

      <form action={handleLogin}>
        {inputs.map((input) => (
          <div key={input.name} className='mb-1 last-of-type:mb-0'>
            <Label>{input.label}</Label>
            <Input type={input.type} {...register(input.name)} />
            <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
              {errors[input.name]?.message}
            </p>
          </div>
        ))}

        <Button
          asChild
          variant='link'
          size='sm'
          className='p-0 text-[0.8125rem]'
        >
          <Link href={resetPasswordRoute}>Forgot your password?</Link>
        </Button>

        <LoginButton className='my-1'>Login</LoginButton>

        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {loginError}
        </p>
      </form>
    </>
  )
}
