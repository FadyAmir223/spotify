import type { User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    role: PrismaUser['role']
    emailVerified: PrismaUser['emailVerified']
  }

  interface Session {
    user: User
  }
}
