'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes'
import { SEARCH_PARAMS } from '@/utils/constants'

export default function GoogleButton() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(SEARCH_PARAMS.redirectTo)

  return (
    <Button
      variant='outline'
      size='lg'
      className='relative w-full rounded-full'
      onClick={() =>
        signIn('google', {
          callbackUrl: redirectTo || DEFAULT_LOGIN_REDIRECT,
        })
      }
    >
      <FcGoogle className='absolute left-5 size-5' />
      LogIn with Google
    </Button>
  )
}
