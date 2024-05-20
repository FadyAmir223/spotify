import NextAuth from 'next-auth'

import { edgeConfig } from '@/lib/auth/auth.edge'
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  loginRoute,
  publicRoutes,
} from '@/lib/routes'

import { SEARCH_PARAMS } from './utils/constants'

const { auth } = NextAuth(edgeConfig)

export default auth((req) => {
  return

  const { nextUrl } = req

  const isLoggedIn = !!req.auth
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (!isLoggedIn) return
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  if (isLoggedIn || isPublicRoute) return

  let redirectTo = nextUrl.pathname
  if (nextUrl.search) redirectTo += nextUrl.search
  const encodedRedirectTo = encodeURIComponent(redirectTo)
  return Response.redirect(
    new URL(
      `${loginRoute}?${SEARCH_PARAMS.redirectTo}=${encodedRedirectTo}`,
      nextUrl,
    ),
  )
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.ico).*)'],
}
