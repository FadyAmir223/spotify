import 'server-only'

import type { User } from '@prisma/client'

import db from '@/lib/db'

export async function createUser(
  user: Pick<User, 'email' | 'password' | 'role'>,
) {
  await db.user.create({ data: user })
}

export async function getUserByEmail(email: User['email']) {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch {
    return null
  }
}
