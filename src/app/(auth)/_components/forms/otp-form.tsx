import { zodResolver } from '@hookform/resolvers/zod'
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react'
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
import { otpLength, SEARCH_PARAMS } from '@/utils/constants'

import { validateOTP } from '../../_actions/otp'
import { useSearchParamRedirect } from '../../_hooks/useSearchParamRedirect'
import type { LoginFormSchemaWithRedirect } from '../../_validations/login'
import { type OtpSchema, otpSchema } from '../../_validations/otp'

type OtpFormProps = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  credentials: LoginFormSchemaWithRedirect
}

export default function OtpForm({
  isOpen,
  setOpen,
  credentials,
}: OtpFormProps) {
  const [isPending, startTransition] = useTransition()
  const redirectWithSearchParams = useSearchParamRedirect()
  const [canSubmit, setCanSubmit] = useState(false)

  const form = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  })

  const onSubmit = async (formData: OtpSchema) => {
    startTransition(async () => {
      const response = await validateOTP({
        code: formData.code,
        ...credentials,
      })

      if (response?.success === false) {
        redirectWithSearchParams(SEARCH_PARAMS.error, response.error)

        setOpen(false)
      }

      if (response?.error)
        return form.setError('code', { message: response.error })
    })
  }

  // useEffect usually shouldn't be used like this but
  // state formData has previous state until onChangeCapture resolve
  // so can't submit inside onChangeCapture
  useEffect(() => {
    if (canSubmit) form.handleSubmit(onSubmit)()
  }, [canSubmit]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
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
                    <InputOTP
                      maxLength={otpLength}
                      {...field}
                      onChangeCapture={(e) => {
                        const inputLength = (
                          (e.target as HTMLInputElement).value as string
                        ).length
                        setCanSubmit(inputLength === otpLength)
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from(Array(otpLength).keys()).map((i) => (
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
