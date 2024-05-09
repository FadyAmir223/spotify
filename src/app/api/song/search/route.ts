import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { currentUser } from '@/app/(app)/_utils/auth'
import { getSongsByQuery } from '@/data/song'
import { SEARCH_PARAMS } from '@/utils/constants'

const querySchema = z
  .object({
    query: z.string().trim().min(1).max(99).nullable(),
    cursor: z.string().nullable(),
  })
  .transform((data) => ({ ...data, query: data.query ?? '' }))

export async function GET(request: NextRequest) {
  const user = await currentUser()
  if (user?.role !== 'LISTENER')
    return NextResponse.json({ error: 'Invalid operation' }, { status: 404 })

  const { searchParams } = request.nextUrl

  const result = querySchema.safeParse({
    query: searchParams.get(SEARCH_PARAMS.query),
    cursor: searchParams.get(SEARCH_PARAMS.cursor),
  })

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )
    return NextResponse.json({ errors }, { status: 400 })
  }

  const { query, cursor } = result.data
  const { songs, nextCursor } = await getSongsByQuery(query, cursor)
  return NextResponse.json({ songs, nextCursor })
}
