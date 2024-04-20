'use server'

import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { signIn } from '@/lib/auth'

import { createUser } from '../../../data/user'
import { registerFormSchema } from '../_validations/register'

export async function handleRegister(formData: unknown) {
  const result = registerFormSchema.safeParse(formData)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { email, password, isArtist } = result.data

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await createUser({
      email,
      password: hashedPassword,
      role: isArtist ? 'ARTIST' : 'LISTENER',
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2002')
        return { errors: { email: 'email already exists' } }
      else return { error: "couldn'n create user" }
  }

  await signIn('credentials', { email, password })
}
