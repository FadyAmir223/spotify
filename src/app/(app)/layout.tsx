import { SessionProvider } from 'next-auth/react'

import { auth } from '@/lib/auth/auth'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return <SessionProvider session={session}>{children}</SessionProvider>
}
