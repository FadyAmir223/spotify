import { z } from 'zod'

const baseSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    // .min(8, 'Password must be more than 8 characters')
    .refine((value) => Buffer.from(value).length <= 72, {
      message: 'Password is too long',
    }),
  confirmPassword: z.string(),
})

function refineSchema<T extends z.infer<typeof baseSchema>>(
  schema: z.ZodSchema<T>,
): z.ZodSchema<T> {
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
}

export const newPasswordSchema = refineSchema(baseSchema)

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>

export const extendedNewPasswordSchema = refineSchema(
  baseSchema.extend({
    token: z.string().uuid(),
  }),
)
