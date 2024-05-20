import './globals.css'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/toaster'

const meta = {
  title: 'Spotify',
  description: 'get access to millions of songs',
  image: '/meta-image.webp',
}

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | spotify',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    locale: 'en-US',
    siteName: meta.title,
    type: 'website',
    images: [{ url: meta.image }],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-secondary text-white'>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
