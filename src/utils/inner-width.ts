import { SCREEN_SIZES } from './constants'

export function getScreenSize() {
  if (typeof window === 'undefined') return '2xl'

  const width = window.innerWidth

  if (width < SCREEN_SIZES.xs) return 'xs'
  if (width < SCREEN_SIZES.sm) return 'sm'
  if (width < SCREEN_SIZES.md) return 'md'
  if (width < SCREEN_SIZES.lg) return 'lg'
  if (width < SCREEN_SIZES.xl) return 'xl'
  return '2xl'
}
