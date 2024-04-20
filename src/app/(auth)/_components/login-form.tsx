'use client'

import { useFormState } from 'react-dom'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { login } from '../_actions/login'
import AuthButton from './auth-button'

const inputs = [
  { type: 'email', label: 'Email', name: 'email' },
  { type: 'password', label: 'Password', name: 'password' },
] as const

export default function LoginForm() {
  const [loginError, dispatchLogin] = useFormState(login, undefined)

  return (
    <form action={dispatchLogin}>
      {inputs.map((input) => (
        <div key={input.name} className='mb-1.5'>
          <Label>{input.label}</Label>
          <Input type={input.type} name={input.name} required />
        </div>
      ))}

      <AuthButton className='mb-1 mt-2'>Login</AuthButton>

      <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
        {loginError?.error}
      </p>
    </form>
  )
}
