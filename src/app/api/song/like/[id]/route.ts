import { NextResponse } from 'next/server'

import { currentUser } from '@/app/(app)/_utils/auth'
import { songIdSchema } from '@/app/(app)/_validations/song'
import { getLikedSong } from '@/data/liked-song'

export async function GET(_: unknown, { params }: { params: { id: string } }) {
  const user = await currentUser()
  if (user?.role !== 'LISTENER')
    return NextResponse.json({ error: 'Invalid operation' })

  const result = songIdSchema.safeParse(params)
  if (!result.success)
    return NextResponse.json({ error: 'Invalid song id' }, { status: 400 })

  const liked = await getLikedSong(result.data.id, user.id!)
  return NextResponse.json({ liked: !!liked })
}
