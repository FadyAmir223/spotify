const registerRoute = '/register'
const loginRoute = '/login'

const authRoutes = [registerRoute, loginRoute]
const publicRoutes = ['/', '/artist']

const DEFAULT_LOGIN_REDIRECT = '/'

export {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  loginRoute,
  publicRoutes,
  registerRoute,
}
