import { cn } from '@/lib/utils'
import { Icon, type IconName } from '../atoms/Icon'
import type { CalloutType } from '@/lib/types'
import type { ReactNode } from 'react'

interface CalloutProps {
  type: CalloutType
  title?: string
  children: ReactNode
  className?: string
}

const calloutConfig: Record<
  CalloutType,
  { icon: IconName; borderColor: string; bgColor: string; iconColor: string }
> = {
  concept: {
    icon: 'info',
    borderColor: 'border-l-primary-500',
    bgColor: 'bg-primary-600/10',
    iconColor: 'text-primary-400',
  },
  rupture: {
    icon: 'zap',
    borderColor: 'border-l-rupture-500',
    bgColor: 'bg-rupture-600/10',
    iconColor: 'text-rupture-500',
  },
  consequence: {
    icon: 'alert',
    borderColor: 'border-l-critical-500',
    bgColor: 'bg-critical-600/10',
    iconColor: 'text-critical-500',
  },
  regulation: {
    icon: 'layers',
    borderColor: 'border-l-system-500',
    bgColor: 'bg-system-600/10',
    iconColor: 'text-system-500',
  },
}

const calloutLabels: Record<CalloutType, string> = {
  concept: 'Khái niệm',
  rupture: 'Đứt gãy / Mâu thuẫn',
  consequence: 'Hệ quả xã hội',
  regulation: 'Điều tiết / Nhà nước',
}

export function Callout({ type, title, children, className }: CalloutProps) {
  const config = calloutConfig[type]

  return (
    <aside
      className={cn(
        'my-6 p-4 rounded-r-lg border-l-4',
        config.borderColor,
        config.bgColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon name={config.icon} className={cn('mt-0.5', config.iconColor)} />
        <div className="flex-1">
          <p className={cn('font-semibold mb-1', config.iconColor)}>
            {title || calloutLabels[type]}
          </p>
          <div className="text-text-2 text-sm">{children}</div>
        </div>
      </div>
    </aside>
  )
}
