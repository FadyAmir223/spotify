'use server'

import { getUserByEmail, verifyUserById } from '@/data/user'
import {
  deleteVerificationOtpById,
  getVefiricationOtpByOtp,
} from '@/data/verification-otp'

import { credentialSignIn } from '../_utils/credentilaSignIn'
import { extendedOtpSchema } from '../_validations/otp'

export async function validateOTP(formData: unknown) {
  const result = extendedOtpSchema.safeParse(formData)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { code, email, password, redirectTo } = result.data

  const otp = await getVefiricationOtpByOtp(code)

  if (otp?.email !== email) return { error: 'Invalid otp' }

  if (new Date() > new Date(otp.expires)) {
    await deleteVerificationOtpById(otp.id)
    return { error: 'Otp has expired' }
  }

  // happens if user sent POST to otp server action, bypassing the user creation
  // but don't tell him that email doean't exist
  const user = await getUserByEmail(otp.email)
  if (!user) {
    await deleteVerificationOtpById(otp.id)
    return { error: 'Invalid otp' }
  }

  await deleteVerificationOtpById(otp.id)

  const verifyResponse = await verifyUserById(user.id)
  if (verifyResponse?.error)
    return { error: verifyResponse.error, success: false }

  const signInResponse = await credentialSignIn({ email, password, redirectTo })
  if (signInResponse?.error)
    return { error: signInResponse.error, success: false }
}
