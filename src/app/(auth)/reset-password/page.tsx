import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { loginRoute } from '@/lib/routes'

import ResetPasswordForm from '../_components/forms/reset-password-form'
import H1 from '../_components/h1'

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
