import type { MouseEvent } from 'react'
import { RxTriangleRight } from 'react-icons/rx'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

type TriangleButtonProps = {
  className?: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function TriangleButton({
  className,
  onClick,
}: TriangleButtonProps) {
  return (
    <Button
      size='icon'
      className={cn(
        'flex size-10 items-center rounded-full bg-primary p-0 drop-shadow-md transition hover:scale-110',
        className,
      )}
      onClick={onClick}
    >
      <RxTriangleRight className='size-9 text-black' />
    </Button>
  )
}
