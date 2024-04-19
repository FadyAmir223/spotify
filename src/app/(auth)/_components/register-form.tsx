'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import ky from '@/lib/ky'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes'

import {
  type RegisterFormSchema,
  registerFormSchema,
  responseRegisterSchema,
} from '../_validations/register'

const inputs = [
  { type: 'text', label: 'Email', name: 'email' },
  { type: 'password', label: 'Password', name: 'password' },
  { type: 'password', label: 'Confirm Password', name: 'confirmPassword' },
] as const

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isArtist: false,
    },
  })

  const onSubmit = async (formData: RegisterFormSchema) => {
    try {
      const response = await ky.post('register', { json: formData })
      if (response.ok) router.push(DEFAULT_LOGIN_REDIRECT)
    } catch (error) {
      if (error instanceof HTTPError && error.response) {
        const data = await error.response.json()
        const result = responseRegisterSchema.safeParse(data)

        if (!result.success)
          return toast({
            variant: 'destructive',
            description: 'invalid response',
          })

        if (result.data.errors)
          return Object.entries(result.data.errors).forEach(
            ([field, message]) => {
              form.setError(field as keyof RegisterFormSchema, {
                type: 'validate',
                message,
              })
            },
          )

        if (error.response.status === 409)
          return form.setError('email', { message: result.data.error })

        toast({
          variant: 'destructive',
          description: result.data.error,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem className='mb-1'>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input type={input.type} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name='isArtist'
          render={({ field }) => (
            <FormItem className='mb-3 flex space-x-3 space-y-0.5'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>I&apos;m an artists</FormLabel>
            </FormItem>
          )}
        />

        <Button
          className='w-full py-5 text-base'
          disabled={form.formState.isSubmitting}
        >
          Create Account
        </Button>
      </form>
    </Form>
  )
}
