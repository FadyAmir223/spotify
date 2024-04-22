'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/lib/auth/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes'

import { loginFormSchema } from '../_validations/login'

export async function login(formData: unknown, redirectTo?: string | null) {
  const result = loginFormSchema.safeParse(formData)
  if (!result.success) return { error: 'invalid form data' }

  try {
    await signIn('credentials', {
      ...result.data,
      redirectTo: redirectTo || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'invalid credentials' }
        default:
          return { error: 'something went wrong' }
      }
    }

    throw error
  }
}
