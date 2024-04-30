import { SessionProvider } from 'next-auth/react'

import { auth } from '@/lib/auth/auth'

import Library from './_components/library'
import MusicPlayer from './_components/music-player'
import NavBar from './_components/nav-bar'
import SongProvider from './_contexts/song-context'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <main className='flex h-screen gap-x-2 bg-black p-2'>
        <div className='hidden h-full flex-col gap-y-2 md:flex'>
          <NavBar />
          <Library />
        </div>

        <section className='size-full overflow-hidden overflow-y-auto rounded-lg bg-grayish-background scrollbar-hide'>
          <SongProvider>
            {children}
            <MusicPlayer />
          </SongProvider>
        </section>
      </main>
    </SessionProvider>
  )
}
