import { auth } from '@/lib/auth/auth'

export async function currentUser() {
  const session = await auth()
  return session?.user
}
