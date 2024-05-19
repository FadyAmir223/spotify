import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/lib/auth/auth'

import Library from './_components/library'
import NavBar from './_components/nav-bar'
import MusicPlayer from './_components/player/music-player'
import QueryClientProvider from './_components/query-provider'
import HistoryProvider from './_contexts/history-context'
import LikesProvider from './_contexts/likes-context'
import PlaylistProvider from './_contexts/playlist-context'
import SongProvider from './_contexts/song-context'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <div className='bg-black'>
      <div
        id='app'
        className='mx-auto flex h-screen max-w-screen-2xl gap-x-2 p-2'
      >
        <SessionProvider session={session}>
          <PlaylistProvider>
            <aside className='hidden h-full flex-col gap-y-2 md:flex'>
              <NavBar />
              <Library />
            </aside>

            <section className='w-full overflow-hidden overflow-y-auto rounded-lg bg-grayish-background scrollbar-hide'>
              <SongProvider>
                <QueryClientProvider>
                  <LikesProvider>
                    <HistoryProvider>{children}</HistoryProvider>
                    <MusicPlayer />
                  </LikesProvider>
                  <ReactQueryDevtools />
                </QueryClientProvider>
              </SongProvider>
            </section>
          </PlaylistProvider>
        </SessionProvider>
      </div>
    </div>
  )
}
