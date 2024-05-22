import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().trim().min(1).url(),
  },
  server: {
    DATABASE_URL: z.string().trim().min(1).url(),
    AUTH_URL: z.string().trim().min(1),
    AUTH_GOOGLE_ID: z.string().trim().min(1),
    AUTH_GOOGLE_SECRET: z.string().trim().min(1),
    RESEND_API_KEY: z.string().trim().min(1),
    SENDER_EMAIL: z.string().trim().min(1).email().toLowerCase(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
  },
})
