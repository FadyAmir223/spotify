import 'server-only'

import { Prisma, type User } from '@prisma/client'

import db from '@/lib/db'

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

export async function verifyUserById(id: User['id']) {
  try {
    await db.user.update({
      where: { id },
      data: { emailVerified: new Date() },
    })
  } catch {
    return { error: "couldn't verify user" }
  }
}
