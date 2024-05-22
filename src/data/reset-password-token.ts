import 'server-only'

import type { ResetPasswordToken } from '@prisma/client'

import db from '@/lib/db'

export async function getResetPasswordTokenByToken(
  token: ResetPasswordToken['token'],
) {
  // await sleep()

  try {
    return await db.resetPasswordToken.findUnique({ where: { token } })
  } catch {
    return null
  }
}

export async function getResetPasswordTokenByEmail(
  email: ResetPasswordToken['email'],
) {
  // await sleep()

  try {
    return await db.resetPasswordToken.findFirst({ where: { email } })
  } catch {
    return null
  }
}

export async function deleteResetPasswordTokenById(
  id: ResetPasswordToken['id'],
) {
  try {
    await db.resetPasswordToken.delete({
      where: { id },
      select: { id: true },
    })
  } catch {
    return null
  }
}

export async function createResetPasswordToken(
  email: ResetPasswordToken['email'],
) {
  const newToken = crypto.randomUUID()
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000)

  try {
    const existingToken = await getResetPasswordTokenByEmail(email)
    if (existingToken) await deleteResetPasswordTokenById(existingToken.id)

    const { token } = await db.resetPasswordToken.create({
      data: { token: newToken, email, expires },
      select: { token: true },
    })
    return { token }
  } catch (error) {
    return { error: "Couldn't generate token" }
  }
}
