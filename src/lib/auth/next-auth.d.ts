import type { User as PrismUser } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    role: PrismUser['role']
  }

  interface Session {
    user: User
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role: PrismUser['role']
  }
}
