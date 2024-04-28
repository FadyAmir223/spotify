'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiSearch, BiSearchAlt } from 'react-icons/bi'
import { GoHome, GoHomeFill } from 'react-icons/go'

import { cn } from '@/utils/cn'

const navs = [
  { Icon: GoHome, IconFill: GoHomeFill, label: 'Home', href: '/' },
  { Icon: BiSearch, IconFill: BiSearchAlt, label: 'Search', href: '/search' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className='  rounded-lg bg-grayish-background px-6 py-3'>
      {navs.map(({ Icon, label, href, IconFill }) => {
        const isCurrentPage = pathname === href

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              'py-1 mb-4 flex items-center gap-x-4 last-of-type:mb-0',
              {
                'text-grayish-foreground': !isCurrentPage,
              },
            )}
          >
            {isCurrentPage ? (
              <IconFill className='size-6' />
            ) : (
              <Icon className='size-6' />
            )}
            <span className={cn({ 'font-medium': isCurrentPage })}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
