import { cn } from '@/lib/utils'

interface CoreValueCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export function CoreValueCard({
  icon,
  title,
  description,
  className,
}: CoreValueCardProps) {
  return (
    <div className={cn(
      'bg-surface-1 border border-border-1 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 group',
      className
    )}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border-1 flex items-center justify-center mb-4 group-hover:border-primary-500/30 transition-colors">
        <span className="text-xl text-text-2 group-hover:text-primary-400 transition-colors">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-text-1 mb-2 group-hover:text-primary-400 transition-colors">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-text-2 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
