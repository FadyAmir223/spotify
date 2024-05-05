const SEARCH_PARAMS = {
  redirectTo: 'redirectTo',
  error: 'error',
  token: 'token',
}

const PLACEHOLDER = {
  email: 'john@example.com',
  password: '********',
}

const otpLength = 6
const bcryptSalt = 10

const initVolume = 0.75

export { bcryptSalt, initVolume, otpLength, PLACEHOLDER, SEARCH_PARAMS }
