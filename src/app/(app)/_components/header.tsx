'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { BiSearch } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { loginRoute, registerRoute } from '@/lib/routes'

import { useCurrentUser } from '../_hooks/useCurrentUser'

type HeaderProps = {
  children: React.ReactNode
}

const navs = [
  { Icon: GoHomeFill, href: '/' },
  { Icon: BiSearch, href: '/search' },
]

// TODO: disable back/forward buttons

export default function Header({ children }: HeaderProps) {
  const router = useRouter()
  const user = useCurrentUser()

  return (
    <header className='relative bg-gradient-to-b from-emerald-800 p-4'>
      <div className='mb-5 flex items-center justify-between'>
        <div className='hidden items-center gap-2.5 md:flex'>
          <Button
            variant='none'
            className='size-9 rounded-full bg-black p-0.5 transition hover:opacity-75'
            onClick={() => router.back()}
          >
            <MdKeyboardArrowLeft className='size-7' />
          </Button>

          <Button
            variant='none'
            className='size-9 rounded-full bg-black p-[reset] transition hover:opacity-75'
            onClick={() => router.forward()}
          >
            <MdKeyboardArrowRight className='size-7' />
          </Button>
        </div>

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
                className='rounded-full bg-white text-black shadow'
                onClick={() => signOut({ callbackUrl: loginRoute })}
              >
                Logout
              </Button>

              {user?.image ? (
                <Image
                  src={user.image}
                  alt='Proflie picture'
                  className='rounded-full'
                  width={36}
                  height={36}
                />
              ) : (
                <div className='grid size-9 place-items-center rounded-full bg-white p-1 text-black'>
                  <FaUser />
                </div>
              )}
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
