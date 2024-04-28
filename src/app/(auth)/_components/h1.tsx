import { cn } from '@/utils/cn'

type H1Props = {
  children: React.ReactNode
  className?: string
}

export default function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn('mb-6 text-3xl font-bold', className)}>{children}</h1>
  )
}
