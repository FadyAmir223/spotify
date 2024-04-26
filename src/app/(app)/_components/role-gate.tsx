'use client'

import type { Role } from '@prisma/client'

import { useCurrentUser } from '../_hooks/useCurrentUser'

type RoleGateProps = {
  allowedRole: Role
  children: React.ReactNode
}

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const user = useCurrentUser()

  return user?.role === allowedRole ? children : <div>Forbidden</div>
}
