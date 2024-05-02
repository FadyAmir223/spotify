'use client'

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

type QueryClientProviderProps = {
  children: React.ReactNode
}

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryProvider client={queryClient}>{children}</QueryProvider>
}
