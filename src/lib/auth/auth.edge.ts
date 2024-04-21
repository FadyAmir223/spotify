/* eslint-disable no-param-reassign */

import type { NextAuthConfig } from 'next-auth'

export const edgeConfig = {
  providers: [],
  pages: {
    signIn: '/register',
  },
  session: {
    maxAge: 60 * 60 * 24 * 15,
    updateAge: 60 * 60 * 24 * 2,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.role = token.role

      return session
    },
  },
} satisfies NextAuthConfig
