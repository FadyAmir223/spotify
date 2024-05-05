import { NextResponse } from 'next/server'

import { currentUser } from '@/app/(app)/_utils/auth'
import { getLikedSongs } from '@/data/user'

export async function GET() {
  const user = await currentUser()
  if (user?.role !== 'LISTENER') return { error: 'Invalid operation' }

  const likedSongs = await getLikedSongs()
  return NextResponse.json({ likedSongs })
}
