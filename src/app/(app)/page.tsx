import { auth } from '@/lib/auth/auth'

export default async function Home() {
  const session = await auth()
  return <main>{JSON.stringify(session)}</main>
}
