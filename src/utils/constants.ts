const SEARCH_PARAMS = {
  redirectTo: 'redirectTo',
  error: 'error',
  token: 'token',
  query: 'q',
  cursor: 'cursor',
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

const otpLength = 6
const bcryptSalt = 10

const initVolume = 0.7
const volumeUnit = 0.1

const searchLimit = 9

export {
  bcryptSalt,
  initVolume,
  otpLength,
  PLACEHOLDER,
  PLAYLIST,
  SEARCH_PARAMS,
  searchLimit,
  volumeUnit,
}
