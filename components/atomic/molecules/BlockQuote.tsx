import { cn } from '@/lib/utils'

interface BlockQuoteProps {
  quote: string
  attribution?: string
  className?: string
}

export function BlockQuote({
  quote,
  attribution,
  className,
}: BlockQuoteProps) {
  return (
    <div className={cn(
      'bg-gradient-to-r from-surface-1 to-surface-2 border border-border-1 rounded-xl p-6 md:p-8',
      className
    )}>
      <blockquote className="border-l-4 border-primary-500 pl-4 md:pl-6">
        <p className="text-text-1 text-lg md:text-xl italic leading-relaxed mb-3">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <footer className="text-text-3 text-sm">
            – {attribution}
          </footer>
        )}
      </blockquote>
    </div>
  )
}
