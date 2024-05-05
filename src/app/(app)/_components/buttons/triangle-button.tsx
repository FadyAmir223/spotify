import type { ComponentPropsWithoutRef } from 'react'
import { RxTriangleRight } from 'react-icons/rx'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

/*
 TODO: onplay
   change the triangle to playing
   don't hide it
   show clicking transition
*/

export default function TriangleButton({
  className,
  onClick,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button
      size='icon'
      className={cn(
        'flex size-10 items-center rounded-full bg-primary p-0 drop-shadow-md transition hover:scale-110',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <RxTriangleRight className='size-9 text-black' />
    </Button>
  )
}
