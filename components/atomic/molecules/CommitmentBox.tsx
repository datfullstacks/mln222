import { cn } from '@/lib/utils'

interface CommitmentBoxProps {
  title: string
  children: React.ReactNode
  variant?: 'warning' | 'info' | 'success'
  className?: string
}

export function CommitmentBox({
  title,
  children,
  variant = 'info',
  className,
}: CommitmentBoxProps) {
  const variants = {
    warning: 'border-l-rupture-500 bg-rupture-900/10',
    info: 'border-l-primary-500 bg-primary-900/10',
    success: 'border-l-system-500 bg-system-900/10',
  }

  const titleColors = {
    warning: 'text-rupture-400',
    info: 'text-primary-400',
    success: 'text-system-400',
  }

  return (
    <div className={cn(
      'border-l-4 rounded-r-xl p-6 bg-surface-1 border border-border-1',
      variants[variant],
      className
    )}>
      <h4 className={cn('font-semibold mb-3', titleColors[variant])}>
        {title}
      </h4>
      <div className="text-text-1 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
