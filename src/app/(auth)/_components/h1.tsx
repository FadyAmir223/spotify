import type { ReactNode } from 'react'

type H1Props = {
  children: ReactNode
}

export default function H1({ children }: H1Props) {
  return <h1 className='mb-6 text-4xl font-bold'>{children}</h1>
}
