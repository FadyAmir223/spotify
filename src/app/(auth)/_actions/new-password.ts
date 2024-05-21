'use server'

import {
  deleteResetPasswordTokenById,
  getResetPasswordTokenByToken,
} from '@/data/reset-password-token'
import { updateUserPassword } from '@/data/user/user.auth'

import { credentialSignIn } from '../_utils/credentilaSignIn'
import { extendedNewPasswordSchema } from '../_validations/new-password'

export async function newPassword(formData: unknown) {
  const result = extendedNewPasswordSchema.safeParse(formData)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { password, token: tokenValue } = result.data

  const token = await getResetPasswordTokenByToken(tokenValue)
  if (!token) return { error: 'Invalid Token' }

  if (new Date() > new Date(token.expires)) {
    await deleteResetPasswordTokenById(token.id)
    return { error: 'Token has expired' }
  }

  await deleteResetPasswordTokenById(token.id)

  const updateResponse = await updateUserPassword(token.email, password)
  if (updateResponse?.error) return { error: updateResponse.error }

  const signInResponse = await credentialSignIn({
    email: token.email,
    password,
  })
  if (signInResponse?.error) return { error: signInResponse.error }
}
