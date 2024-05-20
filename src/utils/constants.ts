import { env } from '@/lib/env'

const SEARCH_PARAMS = {
  redirectTo: 'redirectTo',
  error: 'error',
  token: 'token',
  query: 'q',
  cursor: 'cursor',
  path: 'p',
}

const PLACEHOLDER = {
  email: 'john@example.com',
  password: '********',
}

const PLAYLIST = {
  latest: 'latest',
  likes: 'likes',
  search: 'search',
}

const IMAGE = {
  MIN_LENGHT: 150,
  MAX_LENGTH: 500,
}

const otpLength = 6
const bcryptSalt = 10

const initVolume = 0.7
const volumeUnit = 0.1

const searchLimit = 9

const SITEMAP_LIMIT = 50_000

const assetEP = `${env.NEXT_PUBLIC_SITE_URL}/api/asset?${SEARCH_PARAMS.path}=`

export {
  assetEP,
  bcryptSalt,
  IMAGE,
  initVolume,
  otpLength,
  PLACEHOLDER,
  PLAYLIST,
  SEARCH_PARAMS,
  searchLimit,
  SITEMAP_LIMIT,
  volumeUnit,
}
