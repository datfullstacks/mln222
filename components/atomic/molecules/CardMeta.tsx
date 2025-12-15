import Link from 'next/link'
import { Tag } from '../atoms/Tag'
import { cn, formatDate } from '@/lib/utils'

export interface CardMetaProps {
  title: string
  description?: string
  date?: string
  tags?: string[]
  href: string
  className?: string
}

export function CardMeta({
  title,
  description,
  date,
  tags,
  href,
  className,
}: CardMetaProps) {
  return (
    <article className={cn('card card-hover group', className)}>
      <Link href={href} className="block">
        <h3 className="heading-4 mb-2 group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="body-base text-text-2 mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          {date && (
            <time className="caption">{formatDate(date)}</time>
          )}
          
          {tags && tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag} label={tag} className="text-xs" />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
