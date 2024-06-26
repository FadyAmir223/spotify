/* eslint-disable react/no-unescaped-entities */

import type { VerificationOtp } from '@prisma/client'
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

type VerifyEmailProps = {
  otp?: VerificationOtp['otp']
}

export default function VerifyEmail({ otp }: VerifyEmailProps) {
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

      <Preview>Your confirmation code is below</Preview>
      <Tailwind>
        <Body className='bg-white'>
          <Container className='mx-auto'>
            {/* <Img /> not showing localhost:3000 in preview. bug? */}
            {/* <Heading /> not rendered. bug? */}
            <Text className='mb-6 text-3xl font-bold text-black'>
              Confirm your email address
            </Text>
            <Text className='mb-6 text-lg text-black'>
              Your confirmation code is below - enter it in your open browser
              window and we'll help you get signed in.
            </Text>

            <Section className='mb-6 rounded-md bg-gray-100 p-10'>
              <Text className='text-center text-5xl text-black'>{otp}</Text>
            </Section>

            <Text className='mb-6 text-base text-black'>
              If you didn't request this email, there's nothing to worry about,
              you can safely ignore it.
            </Text>

            <Text className='text-xs text-gray-300'>
              ©Spotify {new Date().getFullYear()} - All rights reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VerifyEmail.PreviewProps = {
  otp: '000000',
} as VerifyEmailProps
