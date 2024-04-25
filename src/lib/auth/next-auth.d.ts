import type { User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    role: PrismaUser['role']
    emailVerified: PrismaUser['emailVerified']
  }

  interface Session {
    user: User & {
      role: PrismaUser['role']
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: PrismaUser['role']
  }
}
