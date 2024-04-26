'use server'

import bcrypt from 'bcryptjs'

import { createUser } from '@/data/user'
import { createVerificationOtp } from '@/data/verification-otp'
import { bcryptSalt } from '@/utils/constants'

import { sendVerificationOtpEmail } from '../_utils/sendEmails'
import { registerFormSchema } from '../_validations/register'

export async function handleRegister(formData: unknown) {
  const result = registerFormSchema.safeParse(formData)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { email, password, isArtist } = result.data

  const hashedPassword = await bcrypt.hash(password, bcryptSalt)

  const userResponse = await createUser({
    email,
    password: hashedPassword,
    role: isArtist ? 'ARTIST' : 'LISTENER',
  })
  if (userResponse?.error) return { error: userResponse.error }

  const otpResponse = await createVerificationOtp(email)
  if (otpResponse.error) return { error: otpResponse.error }

  const emailResponse = await sendVerificationOtpEmail(email, otpResponse.otp!)
  if (emailResponse?.error) return { error: emailResponse.error }

  return { success: 'Confirmation email sent' }
}
