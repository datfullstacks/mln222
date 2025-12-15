import { cn } from '@/lib/utils'

interface FootnoteRefProps {
  id: number
  content: string
}

export function FootnoteRef({ id, content }: FootnoteRefProps) {
  return (
    <sup className="text-primary-400">
      <a
        href={`#fn-${id}`}
        id={`fnref-${id}`}
        className="hover:text-primary-500 transition-colors"
        title={content}
      >
        [{id}]
      </a>
    </sup>
  )
}

interface FootnoteListProps {
  footnotes: { id: number; content: string }[]
  className?: string
}

export function FootnoteList({ footnotes, className }: FootnoteListProps) {
  return (
    <aside
      className={cn(
        'mt-12 pt-8 border-t border-border',
        className
      )}
    >
      <h4 className="heading-4 mb-4">Chú thích</h4>
      <ol className="space-y-2 text-sm text-text-2">
        {footnotes.map((fn) => (
          <li key={fn.id} id={`fn-${fn.id}`} className="flex gap-2">
            <span className="text-primary-400">[{fn.id}]</span>
            <span>
              {fn.content}{' '}
              <a
                href={`#fnref-${fn.id}`}
                className="text-primary-400 hover:text-primary-500"
              >
                ↩
              </a>
            </span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
