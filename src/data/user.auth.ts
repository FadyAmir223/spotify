import 'server-only'

import { Prisma, type User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import db from '@/lib/db'
import { bcryptSalt } from '@/utils/constants'

export async function createUser(
  user: Pick<User, 'email' | 'password' | 'role'>,
) {
  try {
    await db.user.create({ data: user, select: { id: true } })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2002') return { error: 'Email already exists' }
      else return { error: "Couldn'n create user" }
  }
}

export async function getUserByEmail(email: User['email']) {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch {
    return null
  }
}

export async function getUserById(id: User['id']) {
  try {
    return await db.user.findUnique({ where: { id } })
  } catch {
    return null
  }
}

export async function verifyUser(email: User['email']) {
  try {
    await db.user.update({
      where: { email },
      data: { emailVerified: new Date() },
      select: { id: true },
    })
  } catch (error) {
    // don't tell that email doesn't exist
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2025') return { error: 'Invalid OTP' }
    return { error: "Couldn't verify user" }
  }
}

export async function updateUserPassword(
  email: User['email'],
  password: User['password'],
) {
  try {
    const hashedPassword = await bcrypt.hash(password!, bcryptSalt)

    await db.user.update({
      where: { email },
      data: { password: hashedPassword, emailVerified: new Date() },
      select: { id: true },
    })
  } catch (error) {
    // don't tell that email doesn't exist
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2025') return { error: 'Invalid Token' }
      else return { error: "Couldn't update password" }
  }
}
