import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import { registerRoute } from '@/lib/routes'

import LoginForm from '../_components/forms/login-form'
import H1 from '../_components/h1'
import SocialLogin from '../_components/social-login'

const meta = {
  title: 'Login',
  description: 'Login to your spotify account',
  pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/login`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.pageUrl,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
  alternates: {
    canonical: meta.pageUrl,
  },
}

export default function Login() {
  return (
    <main>
      <H1>Welcome back, Login</H1>
      <LoginForm />

      <p className='mt-3 text-sm'>
        don&apos;t have an account?
        <Button asChild variant='link' size='sm' className='mx-1 px-0'>
          <Link href={registerRoute}>Register</Link>
        </Button>
      </p>

      <SocialLogin />
    </main>
  )
}
