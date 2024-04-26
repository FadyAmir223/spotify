import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email()
    .toLowerCase(),
  password: z.string().min(1, { message: 'Password is required' }),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export const loginFormSchemaWithRedirect = loginFormSchema.extend({
  redirectTo: z.string().nullable().optional(),
})

export type LoginFormSchemaWithRedirect = z.infer<
  typeof loginFormSchemaWithRedirect
>
