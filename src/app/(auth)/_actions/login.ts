'use server'

import { getUserByEmail } from '@/data/user.auth'
import { createVerificationOtp } from '@/data/verification-otp'

import { credentialSignIn } from '../_utils/credentilaSignIn'
import { sendVerificationOtpEmail } from '../_utils/sendEmails'
import { loginFormSchemaWithRedirect } from '../_validations/login'

export async function login(formData: unknown) {
  const result = loginFormSchemaWithRedirect.safeParse(formData)
  if (!result.success) return { error: 'Invalid form data' }

  const { email, password, redirectTo } = result.data

  const user = await getUserByEmail(email)
  if (!user) return { error: 'Invalid credentilas' }

  if (!user.emailVerified) {
    const otpResponse = await createVerificationOtp(email)
    if (otpResponse.error) return { error: otpResponse.error }

    const emailResponse = await sendVerificationOtpEmail(
      email,
      otpResponse.otp!,
    )
    if (emailResponse?.error) return { error: emailResponse.error }

    return { success: 'Confirmation email sent' }
  }

  const signInResponse = await credentialSignIn({ email, password, redirectTo })
  if (signInResponse?.error) return { error: signInResponse.error }
}
