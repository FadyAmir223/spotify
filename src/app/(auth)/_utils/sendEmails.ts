import type { User, VerificationOtp } from '@prisma/client'

import { sendEmail } from '@/lib/resend'

import VerifyEmail from '../_email/verify-email'

export async function sendVerificationOtpEmail(
  email: User['email'],
  otp: VerificationOtp['otp'],
) {
  const emailResponse = await sendEmail({
    to: email,
    subject: 'Confirm your email',
    mail: { Component: VerifyEmail, props: { otp } },
  })

  if (emailResponse?.error) return { error: emailResponse.error }
}
