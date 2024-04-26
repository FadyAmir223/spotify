import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useSearchParamRedirect } from '@/hooks/useSearchParamRedirect'
import { otpLength, SEARCH_PARAMS } from '@/utils/constants'

import { validateOTP } from '../../_actions/otp'
import type { LoginFormSchemaWithRedirect } from '../../_validations/login'
import { type OtpSchema, otpSchema } from '../../_validations/otp'

type OtpFormProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  credentials: LoginFormSchemaWithRedirect
}

export default function OtpForm({
  isOpen,
  setIsOpen,
  credentials,
}: OtpFormProps) {
  const [isPending, startTransition] = useTransition()
  const redirectWithSearchParams = useSearchParamRedirect()

  const form = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: '',
    },
  })

  const onSubmit = async (formData: OtpSchema) => {
    startTransition(async () => {
      const response = await validateOTP({
        code: formData.code,
        ...credentials,
      })

      if (response?.success === false) {
        redirectWithSearchParams(SEARCH_PARAMS.error, response.error)

        setIsOpen(false)
      }

      if (response?.error)
        return form.setError('code', { message: response.error })
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='px-10'>
        <DialogHeader>
          <DialogTitle>Eneter OTP sent to {credentials.email}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={otpLength} {...field}>
                      <InputOTPGroup>
                        {Array.from({ length: otpLength }).map((_, i) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size='lg' disabled={isPending}>
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
