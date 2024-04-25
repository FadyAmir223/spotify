'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import { getErrorMessage } from '@/utils/getErrorMessage.util'

import { handleRegister } from '../_actions/register'
import {
  type RegisterFormSchema,
  registerFormSchema,
} from '../_validations/register'
import OtpForm from './otp-form'

const inputs = [
  {
    type: 'text',
    label: 'Email',
    name: 'email',
    placeholder: 'john@example.com',
    autoComplete: 'off',
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    placeholder: '********',
    autoComplete: 'new-password',
  },
  {
    type: 'password',
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: '********',
    autoComplete: 'new-password',
  },
] as const

export default function RegisterForm() {
  const { toast } = useToast()
  const [otpSent, setOtpSent] = useState(false)

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isArtist: false,
    },
  })

  // lose progressive enhancement, but keep error messages updtae
  const onSubmit = async (formData: RegisterFormSchema) => {
    try {
      const response = await handleRegister(formData)

      if (response.success) return setOtpSent(true)

      if (response.errors)
        return Object.entries(response.errors).forEach(([field, message]) => {
          form.setError(field as keyof RegisterFormSchema, {
            type: 'validate',
            message: message as string,
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
    <>
      <OtpForm
        isOpen={otpSent}
        setIsOpen={setOtpSent}
        credentials={{
          email: form.getValues('email'),
          password: form.getValues('password'),
        }}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {inputs.map(({ name, label, ...props }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className='mb-1'>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input {...props} {...field} />
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
    </>
  )
}
