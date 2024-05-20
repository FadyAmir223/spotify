import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import { loginRoute } from '@/lib/routes'

import RegisterForm from '../_components/forms/register-form'
import H1 from '../_components/h1'
import SocialLogin from '../_components/social-login'

const meta = {
  title: 'Register',
  description: 'Create account at spotify',
  pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/register`,
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

export default function Register() {
  return (
    <main>
      <H1>Sign up to start listening</H1>
      <RegisterForm />

      <p className='mt-3 text-sm'>
        Already have an account?
        <Button asChild variant='link' size='sm'>
          <Link href={loginRoute}>Login</Link>
        </Button>
      </p>

      <SocialLogin />
    </main>
  )
}
