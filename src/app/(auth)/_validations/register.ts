import { z } from 'zod'

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email is required' })
      .email()
      .max(100, { message: 'Email is too long' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      // .min(8, 'Password must be more than 8 characters')
      .refine((value) => Buffer.from(value).length <= 72, {
        message: 'Password is too long',
      }),
    confirmPassword: z.string(),
    isArtist: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
