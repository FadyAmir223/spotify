import type { QueryKey } from '@tanstack/react-query'

// loop is faster than .map()
export function composeUri(queryKey: QueryKey) {
  let uri = ''

  for (let idx = 0; idx < queryKey.length; idx += 1) {
    const key = queryKey[idx]

    uri +=
      typeof key !== 'object'
        ? `${idx ? '/' : ''}${key}`
        : `?${new URLSearchParams(key as Record<string, string>).toString()}`
  }

  return uri
}
