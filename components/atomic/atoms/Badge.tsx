import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'rupture' | 'critical' | 'system'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-surface-2 text-text-2 border-border',
    primary: 'bg-primary-600/20 text-primary-400 border-primary-600/30',
    rupture: 'bg-rupture-600/20 text-rupture-500 border-rupture-600/30',
    critical: 'bg-critical-600/20 text-critical-500 border-critical-600/30',
    system: 'bg-system-600/20 text-system-500 border-system-600/30',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-md border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
