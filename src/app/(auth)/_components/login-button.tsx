'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

type LoginButtonProps = {
  children: React.ReactNode
  className?: string
}

export default function LoginButton({ children, className }: LoginButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={cn('w-full py-5 text-base', className)}
      disabled={pending}
    >
      {children}
    </Button>
  )
}
