'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface TagProps {
  label: string
  href?: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function Tag({ label, href, isActive, onClick, className }: TagProps) {
  const baseStyles = cn(
    'inline-flex items-center px-3 py-1 text-sm rounded-full transition-all duration-200',
    'border border-border hover:border-primary-500',
    isActive
      ? 'bg-primary-600 text-white border-primary-600'
      : 'bg-surface-2 text-text-2 hover:text-primary-400',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        #{label}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      #{label}
    </button>
  )
}
