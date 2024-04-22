/* eslint-disable no-param-reassign */

import type { User } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

export const edgeConfig = {
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role

      return token
    },
    session: async ({ session, token }) => {
      if (token.sub) session.user.id = token.sub
      if (token.role) session.user.role = token.role as User['role']

      return session
    },
  },
} satisfies NextAuthConfig
