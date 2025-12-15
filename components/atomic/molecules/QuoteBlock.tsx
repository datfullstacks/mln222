import { cn } from '@/lib/utils'
import { Quote } from '../atoms/Typography'

export interface QuoteBlockProps {
  quote: string
  source?: string
  author?: string
  className?: string
}

export function QuoteBlock({
  quote,
  source,
  author,
  className,
}: QuoteBlockProps) {
  return (
    <figure className={cn('my-8', className)}>
      <Quote className="text-lg">
        &ldquo;{quote}&rdquo;
      </Quote>
      {(author || source) && (
        <figcaption className="mt-3 text-sm text-text-2">
          {author && <span className="font-medium">— {author}</span>}
          {author && source && ', '}
          {source && <cite className="italic">{source}</cite>}
        </figcaption>
      )}
    </figure>
  )
}
