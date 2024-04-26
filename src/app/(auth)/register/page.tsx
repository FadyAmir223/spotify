import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { loginRoute } from '@/lib/routes'

import RegisterForm from '../_components/forms/register-form'
import H1 from '../_components/h1'
import SocialLogin from '../_components/social-login'

export const metadata: Metadata = {
  title: 'register',
  description: 'create account at spotify',
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
