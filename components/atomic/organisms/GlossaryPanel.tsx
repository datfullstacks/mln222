import Link from 'next/link'
import { Badge } from '../atoms/Badge'
import { cn } from '@/lib/utils'
import type { Concept } from '@/lib/types'

interface GlossaryPanelProps {
  concepts: Concept[]
  className?: string
}

const categoryLabels: Record<string, { label: string; variant: 'primary' | 'rupture' | 'critical' | 'system' }> = {
  llsx: { label: 'LLSX', variant: 'primary' },
  qhsx: { label: 'QHSX', variant: 'primary' },
  mauthuan: { label: 'Mâu thuẫn', variant: 'rupture' },
  hequa: { label: 'Hệ quả', variant: 'critical' },
  dieutiet: { label: 'Điều tiết', variant: 'system' },
}

export function GlossaryPanel({ concepts, className }: GlossaryPanelProps) {
  if (concepts.length === 0) return null

  return (
    <aside className={cn('sticky top-24', className)}>
      <h4 className="font-semibold text-text-1 mb-4">Thuật ngữ liên quan</h4>
      <ul className="space-y-3">
        {concepts.map((concept) => {
          const cat = categoryLabels[concept.category]
          return (
            <li key={concept.slug}>
              <Link
                href={`/concepts/${concept.slug}`}
                className="block p-3 rounded-lg bg-surface-2 border border-border hover:border-primary-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-text-1 text-sm">
                    {concept.title}
                  </span>
                  <Badge variant={cat.variant} size="sm">
                    {cat.label}
                  </Badge>
                </div>
                <p className="text-xs text-text-2 line-clamp-2">
                  {concept.definition}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
