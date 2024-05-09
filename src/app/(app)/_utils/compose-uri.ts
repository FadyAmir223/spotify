import type { QueryKey } from '@tanstack/react-query'

const composeQueryies = (queryObjec: object) => {
  return Object.entries(queryObjec)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([param, value]) => `${param}=${value}`)
    .join('&')
}

export const composeUri = (queryKey: QueryKey, extraQueries = {}): string => {
  return queryKey
    .map((key) =>
      typeof key === 'object'
        ? `?${composeQueryies({ ...key, ...extraQueries })}`
        : `${key}/`,
    )
    .join('')
}
