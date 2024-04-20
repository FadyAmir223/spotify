'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { getErrorMessage } from '@/utils/getErrorMessage.util'

import { handleRegister } from '../_actions/register'
import {
  type RegisterFormSchema,
  registerFormSchema,
} from '../_validations/register'
import AuthButton from './auth-button'

const inputs = [
  { type: 'text', label: 'Email', name: 'email' },
  { type: 'password', label: 'Password', name: 'password' },
  { type: 'password', label: 'Confirm Password', name: 'confirmPassword' },
] as const

export default function RegisterForm() {
  const { toast } = useToast()

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isArtist: false,
    },
  })

  const register = async () => {
    const result = await form.trigger()
    if (!result) return

    const formData = form.getValues()

    try {
      const response = await handleRegister(formData)
      if (!response) return

      if (response.errors)
        return Object.entries(response.errors).forEach(([field, message]) => {
          form.setError(field as keyof RegisterFormSchema, {
            type: 'validate',
            message,
          })
        })

      if (response.error)
        toast({
          variant: 'destructive',
          description: response.error,
        })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <Form {...form}>
      <form action={register}>
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

        <AuthButton>Create Account</AuthButton>
      </form>
    </Form>
  )
}
