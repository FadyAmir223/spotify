import { FaHeart } from 'react-icons/fa'

import { cn } from '@/utils/cn'

type GradientHeartProps = {
  variant: 'sm' | 'lg'
  className?: string
}

export default function GradientHeart({
  variant,
  className,
}: GradientHeartProps) {
  return (
    <div
      className={cn(
        'grid place-items-center bg-gradient-to-br from-[#321AA7] to-[#738480]',
        {
          'size-14': variant === 'sm',
          'size-32': variant === 'lg',
        },
        className,
      )}
    >
      <FaHeart
        className={cn({
          'size-5': variant === 'sm',
          'size-10': variant === 'lg',
        })}
      />
    </div>
  )
}
