import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({ 
  children, 
  subtitle, 
  centered = false,
  className 
}: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-8', className)}>
      <h2 className="heading-2 text-gradient mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-text-2 text-lg leading-relaxed',
          centered && 'max-w-3xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
