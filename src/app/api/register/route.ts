import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type NextRequest, NextResponse } from 'next/server'

import { createUser } from '@/app/(auth)/_data/user'
import { registerFormSchema } from '@/app/(auth)/_validations/register'
import { signIn } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const data: unknown = await request.json()
  const result = registerFormSchema.safeParse(data)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return NextResponse.json({ errors }, { status: 422 })
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return NextResponse.json(
          { error: 'email already exists' },
          { status: 409 },
        )
    } else {
      return NextResponse.json(
        { error: "couldn'n create user" },
        { status: 500 },
      )
    }
  }

  await signIn('credentials', { email, password })
}
