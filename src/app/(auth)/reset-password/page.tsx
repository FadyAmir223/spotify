import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import { loginRoute } from '@/lib/routes'

import ResetPasswordForm from '../_components/forms/reset-password-form'
import H1 from '../_components/h1'

const meta = {
  title: 'Reset password',
  pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/reset-password`,
}

export const metadata: Metadata = {
  title: meta.title,
  openGraph: {
    title: meta.title,
    url: meta.pageUrl,
  },
  twitter: {
    title: meta.title,
  },
  alternates: {
    canonical: meta.pageUrl,
  },
}

export default function ResetPassword() {
  return (
    <main>
      <H1>Forgot your password?</H1>

      <ResetPasswordForm />

      <Button asChild variant='link' size='sm' className='mt-2'>
        <Link href={loginRoute}>Back to login</Link>
      </Button>
    </main>
  )
}
