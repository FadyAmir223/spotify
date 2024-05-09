'use client'

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { RiseLoader } from 'react-spinners'
import { useDebounceValue } from 'usehooks-ts'

import { Input } from '@/components/ui/input'
import ky from '@/lib/ky'
import { cn } from '@/utils/cn'
import { PLAYLIST, SEARCH_PARAMS } from '@/utils/constants'

import { keys } from '../_lib/keys'
import { composeUri } from '../_utils/compose-uri'
import {
  type SongsSchema,
  type SongsSchemaWithCursor,
  songsSchemaWithCursor,
} from '../_validations/songs'
import SongItem from './song-item'

export default function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const savedQuery = searchParams.get(SEARCH_PARAMS.query)

  const [query, setQuery] = useState(savedQuery ?? '')
  const [debouncedQuery] = useDebounceValue(query, 400)

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (debouncedQuery) current.set(SEARCH_PARAMS.query, debouncedQuery)
    else current.delete(SEARCH_PARAMS.query)

    const search = current.toString()
    const queries = search ? `?${search}` : ''

    router.push(`${pathname}${queries}`)
  }, [debouncedQuery]) // eslint-disable-line react-hooks/exhaustive-deps

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    SongsSchemaWithCursor,
    unknown,
    SongsSchema
  >({
    queryKey: keys.search(debouncedQuery),
    queryFn: async ({ queryKey, pageParam }) => {
      if (!debouncedQuery) return { songs: [] }

      const res = await ky(composeUri(queryKey, { cursor: pageParam })).json()
      // try using tRPC or zodios instead of parsing on the client
      return songsSchemaWithCursor.parse(res)
    },
    select: ({ pages }) => ({ songs: pages.flatMap((page) => page.songs) }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: 1000 * 30,
    retry: 2,
  })

  const { ref, inView } = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView && hasNextPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <Input
        ref={inputRef}
        type='text'
        className='mb-3 border-transparent bg-[#38383890] placeholder:font-medium placeholder:text-neutral-400/80 focus:border-input'
        placeholder='What do you want to listen to?'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul
        className={cn('transition-opacity', {
          'opacity-50': isFetching && !(inView && hasNextPage),
        })}
      >
        {data?.songs.map((song, index) => (
          <SongItem
            ref={index === data.songs.length - 1 ? ref : null}
            key={song.id}
            index={index}
            songs={data.songs}
            playlistName={PLAYLIST.search}
          />
        ))}
      </ul>

      {debouncedQuery && isFetching && (
        <RiseLoader
          className='mb-3 mt-5 text-center'
          size={10}
          color='#1db954'
        />
      )}
    </>
  )
}
