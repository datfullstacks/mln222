import { cn } from '@/lib/utils'
import { Badge } from '../atoms/Badge'

interface AIToolCardProps {
  icon: string
  name: string
  purpose: string
  promptLogLinks?: { label: string; href: string }[]
  results?: string
  verification?: string
  className?: string
}

export function AIToolCard({
  icon,
  name,
  purpose,
  promptLogLinks,
  results,
  verification,
  className,
}: AIToolCardProps) {
  return (
    <div className={cn(
      'bg-surface-1 border border-border-1 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300',
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h4 className="heading-4 text-text-1">{name}</h4>
      </div>

      {/* Purpose */}
      <div className="mb-4">
        <p className="text-xs text-primary-400 font-medium uppercase tracking-wide mb-1">
          Mục đích sử dụng
        </p>
        <p className="text-text-2 text-sm leading-relaxed">
          {purpose}
        </p>
      </div>

      {/* Prompt Log Links */}
      {promptLogLinks && promptLogLinks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-primary-400 font-medium uppercase tracking-wide mb-2">
            Link prompt/log
          </p>
          <div className="flex flex-wrap gap-2">
            {promptLogLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-accent-400 hover:text-accent-300 underline underline-offset-2 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mb-4">
          <p className="text-xs text-primary-400 font-medium uppercase tracking-wide mb-1">
            Kết quả
          </p>
          <p className="text-text-2 text-sm leading-relaxed">
            {results}
          </p>
        </div>
      )}

      {/* Verification */}
      {verification && (
        <div className="pt-4 border-t border-border-1">
          <Badge variant="rupture" className="mb-2">
            Chỉnh sửa và kiểm chứng của sinh viên
          </Badge>
          <p className="text-text-3 text-xs leading-relaxed">
            {verification}
          </p>
        </div>
      )}
    </div>
  )
}
