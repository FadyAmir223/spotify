import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/lib/auth/auth'

import Library from './_components/library'
import NavBar from './_components/nav-bar'
import MusicPlayer from './_components/player/music-player'
import QueryClientProvider from './_components/query-provider'
import HistoryProvider from './_contexts/history-context'
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
          <QueryClientProvider>
            <SongProvider>
              <HistoryProvider>{children}</HistoryProvider>
              <MusicPlayer />
            </SongProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </section>
      </main>
    </SessionProvider>
  )
}
