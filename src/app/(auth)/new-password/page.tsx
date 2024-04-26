import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getResetPasswordTokenByToken } from '@/data/reset-password-token'
import { loginRoute } from '@/lib/routes'

import NewPasswordForm from '../_components/forms/new-password-form'
import H1 from '../_components/h1'

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
