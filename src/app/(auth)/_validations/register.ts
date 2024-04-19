import { z } from 'zod'

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'email is required' })
      .email({ message: 'invalid email' }),
    password: z
      .string()
      .min(1, { message: 'password is required' })
      // .min(8, 'password must be more than 8 characters')
      .refine((value) => Buffer.from(value).length <= 72, {
        message: 'too long password',
      }),
    confirmPassword: z.string(),
    isArtist: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>

export const responseRegisterSchema = z
  .object({
    error: z.string().optional(),
    errors: z
      .object({
        username: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      const hasError = Boolean(data.error)
      const hasErrors = Boolean(data.errors)
      return (hasError && !hasErrors) || (!hasError && hasErrors)
    },
    {
      message: 'invalid response',
    },
  )

export type ResponseRegisterSchema = z.infer<typeof responseRegisterSchema>
