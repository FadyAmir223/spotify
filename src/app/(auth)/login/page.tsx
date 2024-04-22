import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { registerRoute } from '@/lib/routes'

import H1 from '../_components/h1'
import LoginForm from '../_components/login-form'
import SocialLogin from '../_components/social-login'

export const metadata: Metadata = {
  title: 'login',
  description: 'login to spotify',
}

export default function Login() {
  return (
    <main>
      <H1>Welcome back, Login</H1>
      <LoginForm />

      <p className='mt-3 text-sm'>
        don&apos;t have an account?
        <Button asChild variant='link' size='sm'>
          <Link href={registerRoute}>Register</Link>
        </Button>
      </p>

      <SocialLogin />
    </main>
  )
}
