import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface HighlightBoxProps {
  icon?: string
  title?: string
  children: ReactNode
  variant?: 'default' | 'primary' | 'gradient'
  className?: string
}

export function HighlightBox({
  icon,
  title,
  children,
  variant = 'default',
  className,
}: HighlightBoxProps) {
  const variants = {
    default: 'bg-surface-1 border-border-1',
    primary: 'bg-gradient-to-r from-primary-600/10 to-rupture-600/10 border-primary-500/30',
    gradient: 'bg-gradient-to-r from-surface-1 to-surface-2 border-border-1',
  }

  return (
    <div className={cn(
      'border rounded-xl p-6 md:p-8',
      variants[variant],
      className
    )}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className={cn(
            'flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center',
            variant === 'primary' ? 'bg-primary-600/30' : 'bg-primary-600/20'
          )}>
            <span className="text-xl md:text-2xl">{icon}</span>
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h4 className="heading-4 text-primary-400 mb-3">{title}</h4>
          )}
          <div className="text-text-1 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
