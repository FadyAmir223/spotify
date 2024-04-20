import './globals.css'

import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: {
    default: 'spotify',
    template: '%s | spotify',
  },
  description: 'get access to millions of songs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-secondary'>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
