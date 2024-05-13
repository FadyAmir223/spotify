'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

type PendingButtonProps = {
  children: React.ReactNode
  className?: string
}

export default function PendingButton({
  children,
  className,
}: PendingButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button className={className} disabled={pending}>
      {children}
    </Button>
  )
}
