import { cn } from '@/lib/utils'
import type { ReactNode, ElementType } from 'react'

// Heading
interface HeadingProps {
  level?: 1 | 2 | 3 | 4
  children: ReactNode
  className?: string
  id?: string
}

export function Heading({ level = 1, children, className, id }: HeadingProps) {
  const Tag = `h${level}` as ElementType

  const styles = {
    1: 'heading-1',
    2: 'heading-2',
    3: 'heading-3',
    4: 'heading-4',
  }

  return (
    <Tag id={id} className={cn(styles[level], 'text-text-1', className)}>
      {children}
    </Tag>
  )
}

// Paragraph
interface ParagraphProps {
  children: ReactNode
  size?: 'sm' | 'base' | 'lg'
  className?: string
  muted?: boolean
}

export function Paragraph({
  children,
  size = 'base',
  className,
  muted,
}: ParagraphProps) {
  const sizes = {
    sm: 'body-small',
    base: 'body-base',
    lg: 'body-large',
  }

  return (
    <p
      className={cn(
        sizes[size],
        muted ? 'text-text-2' : 'text-text-1',
        className
      )}
    >
      {children}
    </p>
  )
}

// Quote
interface QuoteProps {
  children: ReactNode
  className?: string
}

export function Quote({ children, className }: QuoteProps) {
  return (
    <blockquote
      className={cn(
        'pl-4 border-l-4 border-rupture-500 italic text-text-2',
        className
      )}
    >
      {children}
    </blockquote>
  )
}

// Footnote marker
interface FootnoteProps {
  id: number
  className?: string
}

export function Footnote({ id, className }: FootnoteProps) {
  return (
    <sup
      className={cn(
        'text-primary-400 cursor-pointer hover:text-primary-500 ml-0.5',
        className
      )}
    >
      <a href={`#fn-${id}`} id={`fnref-${id}`}>
        [{id}]
      </a>
    </sup>
  )
}
