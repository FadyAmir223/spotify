import 'server-only'

import { Prisma, type User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import db from '@/lib/db'
import { bcryptSalt } from '@/utils/constants'

// isolated because of warning during build
// data access layer function imported to the edge from a file which imports bcrypt

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
