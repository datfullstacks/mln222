import { cn } from '@/lib/utils'

interface FeaturePillarProps {
  icon: string
  title: string
  description: string
  colorScheme?: 'primary' | 'accent' | 'system'
  className?: string
}

export function FeaturePillar({
  icon,
  title,
  description,
  colorScheme = 'primary',
  className,
}: FeaturePillarProps) {
  const colorSchemes = {
    primary: 'bg-primary-600/20 text-primary-400',
    accent: 'bg-rupture-600/20 text-rupture-500',
    system: 'bg-system-600/20 text-system-500',
  }

  const hoverColors = {
    primary: 'group-hover:text-primary-400',
    accent: 'group-hover:text-rupture-500',
    system: 'group-hover:text-system-500',
  }

  return (
    <div className={cn(
      'group bg-surface-2 hover:bg-surface-1 border border-border-1 hover:border-primary-500/50 rounded-lg p-4 transition-all duration-300',
      className
    )}>
      <div className="flex items-center gap-3 mb-2">
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center',
          colorSchemes[colorScheme]
        )}>
          <span className="text-lg">{icon}</span>
        </div>
        <h5 className={cn(
          'font-semibold text-text-1 transition-colors',
          hoverColors[colorScheme]
        )}>
          {title}
        </h5>
      </div>
      <p className="text-text-3 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
