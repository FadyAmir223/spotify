import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getResetPasswordTokenByToken } from '@/data/reset-password-token'
import { env } from '@/lib/env'
import { loginRoute } from '@/lib/routes'

import NewPasswordForm from '../_components/forms/new-password-form'
import H1 from '../_components/h1'

const meta = {
  title: 'New password',
  pageUrl: `${env.NEXT_PUBLIC_SITE_URL}/new-password`,
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

type NewPasswordProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

const tokenSchema = z.object({
  token: z.string().uuid(),
})

export default async function NewPassword({ searchParams }: NewPasswordProps) {
  const result = tokenSchema.safeParse(searchParams)
  if (!result.success) redirect(loginRoute)

  const tokenExists = await getResetPasswordTokenByToken(result.data.token)
  if (!tokenExists || new Date() > new Date(tokenExists.expires))
    redirect(loginRoute)

  return (
    <main>
      <H1 className='text-xl'>Eneter your new password</H1>

      <NewPasswordForm />
    </main>
  )
}
