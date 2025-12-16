import { cn } from '@/lib/utils'

interface ToolItem {
  icon: string
  name: string
  description: string
}

interface ToolsListProps {
  tools: ToolItem[]
  className?: string
}

export function ToolsList({ tools, className }: ToolsListProps) {
  return (
    <ul className={cn('space-y-3', className)}>
      {tools.map((tool, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-lg flex-shrink-0">{tool.icon}</span>
          <div>
            <span className="font-semibold text-text-1">{tool.name}:</span>{' '}
            <span className="text-text-2">{tool.description}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
