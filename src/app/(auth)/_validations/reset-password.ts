import { z } from 'zod'

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email()
    .toLowerCase(),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
