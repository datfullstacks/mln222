import { ChapterTOC } from '../atomic/organisms/ChapterTOC'
import { GlossaryPanel } from '../atomic/organisms/GlossaryPanel'
import type { TOCItem, Concept } from '@/lib/types'
import type { ReactNode } from 'react'

interface ReadingLayoutProps {
  children: ReactNode
  toc?: TOCItem[]
  concepts?: Concept[]
}

export function ReadingLayout({ children, toc = [], concepts = [] }: ReadingLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TOC Sidebar */}
        {toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-2">
            <ChapterTOC items={toc} />
          </aside>
        )}

        {/* Main Content */}
        <article
          className={`prose prose-invert max-w-none ${
            toc.length > 0 && concepts.length > 0
              ? 'lg:col-span-7'
              : toc.length > 0 || concepts.length > 0
              ? 'lg:col-span-9'
              : 'lg:col-span-12'
          }`}
        >
          {children}
        </article>

        {/* Glossary Sidebar */}
        {concepts.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3">
            <GlossaryPanel concepts={concepts} />
          </aside>
        )}
      </div>
    </div>
  )
}
