import { AuthError } from 'next-auth'

import { signIn } from '@/lib/auth/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes'

import type { LoginFormSchemaWithRedirect } from '../_validations/login'

export async function credentialSignIn({
  email,
  password,
  redirectTo = DEFAULT_LOGIN_REDIRECT,
}: LoginFormSchemaWithRedirect) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: redirectTo || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
}
