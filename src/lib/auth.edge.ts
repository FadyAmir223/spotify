import type { NextAuthConfig } from 'next-auth'

export const edgeConfig = {
  pages: {
    signIn: '/register',
  },
  providers: [],
} satisfies NextAuthConfig
