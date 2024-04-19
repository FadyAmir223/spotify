import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'email is required' })
    .email({ message: 'invalid email' }),
  password: z.string().min(1, { message: 'password is required' }),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
