import bcrypt from 'bcryptjs'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { loginFormSchema } from '@/app/(auth)/_validations/login'
import { getUserByEmail } from '@/data/user'
import { edgeConfig } from '@/lib/auth.edge'

export const config = {
  ...edgeConfig,
  providers: [
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
} satisfies NextAuthConfig

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config)
