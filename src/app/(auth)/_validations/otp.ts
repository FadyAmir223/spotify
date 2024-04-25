import { z } from 'zod'

import { otpLength } from '@/utils/constants'

import { loginFormSchemaWithRedirect } from './login'

export const otpSchema = z.object({
  code: z
    .string()
    .min(otpLength, { message: 'Your code must be 6 characters' }),
})

export type OtpSchema = z.infer<typeof otpSchema>

export const extendedOtpSchema = otpSchema.merge(loginFormSchemaWithRedirect)
