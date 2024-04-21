import './globals.css'

import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  title: {
    default: 'spotify',
    template: '%s | spotify',
  },
  description: 'get access to millions of songs',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang='en'>
      <body className='min-h-screen bg-secondary'>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
