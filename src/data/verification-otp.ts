import 'server-only'

import type { VerificationOtp } from '@prisma/client'
import crypto from 'crypto'

import db from '@/lib/db'

export async function getVefiricationOtpByOtp(otp: VerificationOtp['otp']) {
  try {
    return await db.verificationOtp.findUnique({ where: { otp } })
  } catch {
    return null
  }
}

export async function getVefiricationOtpByEmail(
  email: VerificationOtp['email'],
) {
  try {
    return await db.verificationOtp.findFirst({ where: { email } })
  } catch {
    return null
  }
}

export async function deleteVerificationOtpById(id: VerificationOtp['id']) {
  try {
    await db.verificationOtp.delete({ where: { id }, select: { id: true } })
  } catch {
    return null
  }
}

export async function createVerificationOtp(email: VerificationOtp['email']) {
  const newOtp = crypto.randomInt(100_000, 100_0000).toString()
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000)

  try {
    const existingOtp = await getVefiricationOtpByEmail(email)
    if (existingOtp) await deleteVerificationOtpById(existingOtp.id)

    const { otp } = await db.verificationOtp.create({
      data: { otp: newOtp, email, expires },
      select: { otp: true },
    })
    return { otp }
  } catch (error) {
    return { error: "Couldn't generate otp" }
  }
}
