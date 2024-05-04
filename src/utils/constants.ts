const SCREEN_SIZES = {
  xs: 640,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
}

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

export {
  bcryptSalt,
  initVolume,
  otpLength,
  PLACEHOLDER,
  SCREEN_SIZES,
  SEARCH_PARAMS,
}
