/* eslint-disable no-param-reassign */

import type { User } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

import { getUserById } from '@/data/user/user.auth.edge'

export const edgeConfig = {
  providers: [],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'credentials' && !user.emailVerified)
        return false

      return true
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) token.role = user.role

      if (trigger === 'update') {
        const userFromDb = await getUserById(token.sub!)
        token.role = userFromDb?.role
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token.sub) session.user.id = token.sub
      if (token.role) session.user.role = token.role as User['role']

      return session
    },
  },
} satisfies NextAuthConfig
