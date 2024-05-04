'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiSearch, BiSearchAlt } from 'react-icons/bi'
import { GoHome, GoHomeFill } from 'react-icons/go'

import { cn } from '@/utils/cn'

const navs = [
  { icon: GoHome, iconFill: GoHomeFill, label: 'Home', href: '/' },
  { icon: BiSearch, iconFill: BiSearchAlt, label: 'Search', href: '/search' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className='rounded-lg bg-grayish-background p-3'>
      {navs.map(({ icon, iconFill, label, href }) => {
        const isCurrentPage = pathname === href
        const Icon = isCurrentPage ? iconFill : icon

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex items-center gap-x-4 hover:bg-neutral-800/50 rounded-sm py-3 px-1.5 transition',
              {
                'text-grayish-foreground': !isCurrentPage,
              },
            )}
          >
            <Icon className='size-6' />
            <span className={cn({ 'font-medium': isCurrentPage })}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
