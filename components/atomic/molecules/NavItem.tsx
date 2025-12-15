'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface NavItemProps {
  label: string
  href: string
  className?: string
}

export function NavItem({ label, href, className }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
        isActive ? 'text-primary-400' : 'text-text-2 hover:text-text-1',
        className
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />
      )}
    </Link>
  )
}
