import { z } from 'zod'

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'email is required' })
      .email({ message: 'invalid email' })
      .max(100, { message: 'email is too long' }),
    password: z
      .string()
      .min(1, { message: 'password is required' })
      // .min(8, 'password must be more than 8 characters')
      .refine((value) => Buffer.from(value).length <= 72, {
        message: 'password is too long',
      }),
    confirmPassword: z.string(),
    isArtist: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
