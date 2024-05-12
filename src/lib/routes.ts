const registerRoute = '/register'
const loginRoute = '/login'
const resetPasswordRoute = '/reset-password'
const newPasswordRoute = '/new-password'

const authRoutes = [
  registerRoute,
  loginRoute,
  resetPasswordRoute,
  newPasswordRoute,
]

const publicRoutes = ['/']

const DEFAULT_LOGIN_REDIRECT = '/'

export {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  loginRoute,
  newPasswordRoute,
  publicRoutes,
  registerRoute,
  resetPasswordRoute,
}
