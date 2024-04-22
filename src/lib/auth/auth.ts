import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { loginFormSchema } from '@/app/(auth)/_validations/login'
import { getUserByEmail } from '@/data/user'
import { edgeConfig } from '@/lib/auth/auth.edge'
import db from '@/lib/db'
import { env } from '@/lib/env'
import { loginRoute } from '@/lib/routes'

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...edgeConfig,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const result = loginFormSchema.safeParse(credentials)
        if (!result.success) return null

        const { email, password } = result.data

        const user = await getUserByEmail(email)
        if (!user || !user.password) return null

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null

        return user
      },
    }),
  ],
  pages: {
    signIn: loginRoute,
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: 'jwt' },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
})
