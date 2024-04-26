import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useSearchParamRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const redirectWithSearchParams = useCallback(
    (name: string, value: string) => {
      router.push(`${pathname}?${createQueryString(name, value)}`)
    },
    [pathname, router, createQueryString],
  )

  return redirectWithSearchParams
}
