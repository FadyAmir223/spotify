/* eslint-disable react/no-unescaped-entities */

import type { resetPasswordToken } from '@prisma/client'
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components'

import { env } from '@/lib/env'
import { newPasswordRoute } from '@/lib/routes'
import { SEARCH_PARAMS } from '@/utils/constants'

type ResetPasswordProps = {
  token?: resetPasswordToken['token']
}

export default function ResetPassword({ token }: ResetPasswordProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>
        Someone recently requested a password change for your account
      </Preview>
      <Tailwind>
        <Body className='bg-white'>
          <Container className='mx-auto'>
            <Text className='mb-6 text-lg text-black'>
              Someone recently requested a password change for your account. If
              this was you, you can set a new password here:
            </Text>

            <Button
              href={`${env.NEXT_PUBLIC_SITE_URL + newPasswordRoute}?${
                SEARCH_PARAMS.token
              }=${token}`}
              className='w-52 rounded bg-[#1DB954] px-4 py-2.5 text-center text-lg text-[#fafafa]'
            >
              Reset password
            </Button>

            <Text className='mb-6 text-base text-black'>
              If you don't want to change your password or didn't request this,
              just ignore and delete this message.
            </Text>

            <Text className='mb-6 text-base text-black'>
              To keep your account secure, please don't forward this email to
              anyone.
            </Text>

            <Text className='text-xs text-gray-300'>
              ©{new Date().getFullYear()} Spotify - All rights reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ResetPassword.PreviewProps = {
  token: '2526eddc-7a7b-4cf1-954f-0376c39e94f4',
} as ResetPasswordProps
