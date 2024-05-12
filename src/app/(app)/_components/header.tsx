'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { BiSearch } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { loginRoute, registerRoute } from '@/lib/routes'
import { cn } from '@/utils/cn'

import { useCurrentUser } from '../_hooks/useCurrentUser'
import NavigationButtons from './buttons/navigation-buttons'

type HeaderProps = {
  children?: React.ReactNode
}

const navs = [
  { Icon: GoHomeFill, href: '/' },
  { Icon: BiSearch, href: '/search' },
]

export default function Header({ children }: HeaderProps) {
  const user = useCurrentUser()
  const router = useRouter()

  return (
    <header
      className={cn('relative p-4', {
        'bg-gradient-to-b from-emerald-800': children,
      })}
    >
      <div className='mb-5 flex items-center justify-between'>
        <NavigationButtons />

        <div className='flex items-center gap-2.5 md:hidden'>
          {navs.map(({ href, Icon }) => (
            <Button
              key={href}
              asChild
              variant='none'
              className='size-9 rounded-full bg-white p-[reset] transition hover:opacity-75'
            >
              <Link href={href}>
                <Icon className='size-5 text-black' />
              </Link>
            </Button>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          {user ? (
            <>
              <Button
                variant='none'
                className='rounded-full bg-white text-black shadow transition-opacity hover:opacity-75 focus-visible:opacity-75 focus-visible:ring-0'
                onClick={() => signOut({ callbackUrl: loginRoute })}
              >
                Logout
              </Button>

              <Button
                variant='none'
                size='none'
                className={cn({
                  'focus-visible:ring-0 transition-opacity focus-visible:opacity-75 hover:opacity-75':
                    !user?.image,
                })}
                onClick={() => router.push('/account')}
              >
                <Avatar>
                  <AvatarImage src={user?.image ?? undefined} />
                  <AvatarFallback className='bg-white'>
                    <FaUser className='text-black' />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant='none'
                className='rounded-full bg-white text-black shadow'
              >
                <Link href={registerRoute}>Register</Link>
              </Button>

              <Button
                asChild
                variant='none'
                className='rounded-full bg-white text-black shadow'
              >
                <Link href={loginRoute}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {children}
    </header>
  )
}
