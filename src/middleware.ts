import NextAuth from 'next-auth'

import { edgeConfig } from '@/lib/auth.edge'
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/lib/routes'

const { auth } = NextAuth(edgeConfig)

export default auth((req) => {
  const { nextUrl } = req

  const isLoggedIn = !!req.auth
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (!isLoggedIn) return
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (isLoggedIn || isPublicRoute) return

  let redirectTo = nextUrl.pathname
  if (nextUrl.search) redirectTo += nextUrl.search
  const encodedRedirectTo = encodeURIComponent(redirectTo)
  return Response.redirect(
    new URL(`/login?redirectTo=${encodedRedirectTo}`, nextUrl),
  )
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
