import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { env } from '@/lib/env'

import Header from '../_components/header'
import RoleGate from './_components/role-gate'
import SwitchToArtistButton from './_components/switch-to-artist-button'

// hydration error for prisma: FileList (browser) vs File (node)
const UploadSongForm = dynamic(() => import('./_components/upload-song-form'), {
  ssr: false,
})

const meta = {
  title: 'Account',
  description: 'Manage your songs',
  pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/account`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.pageUrl,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
  alternates: {
    canonical: meta.pageUrl,
  },
}

export default function Artist() {
  return (
    <main>
      <Header />

      <div className='p-4'>
        <h1 className='mb-5 text-2xl font-bold'>Account settings</h1>

        <RoleGate
          allowedRole='ARTIST'
          fallback={
            <div>
              <p className='mb-3 font-semibold text-red-500'>
                You don&apos;t have access to upload a song
              </p>

              <SwitchToArtistButton />
            </div>
          }
        >
          <UploadSongForm />
        </RoleGate>
      </div>
    </main>
  )
}
