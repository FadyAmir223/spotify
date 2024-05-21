import { NextResponse } from 'next/server'

import { currentUser } from '@/app/(app)/_utils/auth'
import { getLikedSongs } from '@/data/user/user'

export async function GET() {
  const user = await currentUser()
  if (!user?.role) return NextResponse.json({ error: 'You must login first' })

  const songs = await getLikedSongs()
  return NextResponse.json({ songs })
}
