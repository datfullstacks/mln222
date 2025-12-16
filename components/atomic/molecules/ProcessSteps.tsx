import { cn } from '@/lib/utils'

interface ProcessStepProps {
  number: number
  title: string
  description: string
  isLast?: boolean
  className?: string
}

export function ProcessStep({
  number,
  title,
  description,
  isLast = false,
  className,
}: ProcessStepProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-border-1 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h4 className="font-semibold text-primary-400 mb-1">
          {title}
        </h4>
        <p className="text-text-2 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

interface ProcessStepsProps {
  steps: Omit<ProcessStepProps, 'number' | 'isLast'>[]
  className?: string
}

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div className={cn('bg-surface-1 border border-border-1 rounded-xl p-6', className)}>
      {steps.map((step, index) => (
        <ProcessStep
          key={index}
          number={index + 1}
          title={step.title}
          description={step.description}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  )
}
