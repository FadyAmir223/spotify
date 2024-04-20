'use client'

import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

type AuthButtonProps = {
  children: ReactNode
  className?: string
}

export default function AuthButton({ children, className }: AuthButtonProps) {
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
