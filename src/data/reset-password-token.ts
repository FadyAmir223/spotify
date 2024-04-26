import 'server-only'

import type { resetPasswordToken } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

import db from '@/lib/db'

export async function getResetPasswordTokenByToken(
  token: resetPasswordToken['token'],
) {
  try {
    return await db.resetPasswordToken.findUnique({ where: { token } })
  } catch {
    return null
  }
}

export async function getResetPasswordTokenByEmail(
  email: resetPasswordToken['email'],
) {
  try {
    return await db.resetPasswordToken.findFirst({ where: { email } })
  } catch {
    return null
  }
}

export async function deleteResetPasswordTokenById(
  id: resetPasswordToken['id'],
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
  email: resetPasswordToken['email'],
) {
  const newToken = uuidv4()
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
