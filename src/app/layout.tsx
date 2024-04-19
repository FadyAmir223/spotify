import './globals.css'

import type { Metadata } from 'next'

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
        {children}
        <Toaster />
      </body>
    </html>
  )
}
