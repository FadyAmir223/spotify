'use server'

import { createResetPasswordToken } from '@/data/reset-password-token'
import { getUserByEmail } from '@/data/user/user.auth.edge'
import { sendEmail } from '@/lib/resend'

import ResetPassword from '../_email/reset-password'
import { resetPasswordSchema } from '../_validations/reset-password'

export async function resetPassword(formData: unknown) {
  const result = resetPasswordSchema.safeParse(formData)
  if (!result.success) return { error: 'Invalid form Data' }

  const { email } = result.data

  const user = await getUserByEmail(email)
  if (!user) return { message: 'Email has been sent' }

  const tokenResponse = await createResetPasswordToken(email)
  if (tokenResponse.error) return { error: tokenResponse.error }

  const sendEmailResponse = await sendEmail({
    to: email,
    subject: 'Reset your password',
    mail: {
      Component: ResetPassword,
      props: { token: tokenResponse.token! },
    },
  })
  if (sendEmailResponse?.error) return { error: sendEmailResponse.error }

  return { message: 'Email has been sent' }
}
