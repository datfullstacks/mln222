import { CardMeta } from '../molecules/CardMeta'
import type { Chapter } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ChapterListProps {
  chapters: Chapter[]
  className?: string
}

export function ChapterList({ chapters, className }: ChapterListProps) {
  if (chapters.length === 0) {
    return (
      <div className="text-center py-12 text-text-2">
        Chưa có chương nào được xuất bản.
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {chapters.map((chapter) => (
        <CardMeta
          key={chapter.slug}
          title={chapter.title}
          description={chapter.description}
          date={chapter.date}
          tags={chapter.tags}
          href={`/chapters/${chapter.slug}`}
        />
      ))}
    </div>
  )
}
