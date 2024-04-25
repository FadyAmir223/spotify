import { createElement, type FC } from 'react'
import { Resend } from 'resend'

import { env } from '@/lib/env'
import { getErrorMessage } from '@/utils/getErrorMessage.util'

const resend = new Resend(env.RESEND_API_KEY)

type SendEmail<T> = {
  to: string
  subject: string
  reply_to?: string
  mail: {
    Component: FC<T>
    props: T
  }
}

export async function sendEmail<T extends {}>({
  to,
  subject,
  reply_to,
  mail: { Component, props },
}: SendEmail<T>) {
  try {
    await resend.emails.send({
      from: `Spotify <${env.SENDER_EMAIL}>`,
      to,
      subject,
      reply_to,
      react: createElement(Component, props),
    })
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}
