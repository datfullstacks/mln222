'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TOCItem } from '@/lib/types'

interface ChapterTOCProps {
  items: TOCItem[]
  className?: string
}

export function ChapterTOC({ items, className }: ChapterTOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className={cn('sticky top-24', className)}>
      <h4 className="font-semibold text-text-1 mb-4">Mục lục</h4>
      <ul className="space-y-2 text-sm border-l border-border">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 transition-colors duration-200',
                activeId === item.id
                  ? 'text-primary-400 border-l-2 border-primary-400 -ml-px pl-3'
                  : 'text-text-2 hover:text-text-1'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
