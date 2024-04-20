'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/lib/auth'

import { loginFormSchema } from '../_validations/login'

export async function login(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) return { error: 'invalid form data' }

  const formDataEntries = Object.fromEntries(formData)
  const result = loginFormSchema.safeParse(formDataEntries)
  if (!result.success) return { error: 'invalid form data' }

  try {
    await signIn('credentials', result.data)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'invalid credentials' }
        default:
          return { error: "couldn't login" }
      }
    }

    throw error
  }
}
