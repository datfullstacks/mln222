import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
  variant?: 'default' | 'rupture' | 'gradient'
}

export function Divider({ className, variant = 'default' }: DividerProps) {
  const variants = {
    default: 'border-border',
    rupture: 'border-rupture-500',
    gradient: 'border-0 h-0.5 bg-gradient-to-r from-primary-500 via-rupture-500 to-critical-500',
  }

  if (variant === 'gradient') {
    return <div className={cn('w-full', variants[variant], className)} />
  }

  return <hr className={cn('w-full border-t', variants[variant], className)} />
}
