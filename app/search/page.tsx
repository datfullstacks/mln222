'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { SearchBar } from '@/components/atomic/molecules/SearchBar'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // TODO: Implement search logic
      // For now, just simulate loading
      setTimeout(() => {
        setResults([])
        setIsLoading(false)
      }, 500)
    }
  }, [query])

  return (
    <>
      {query && (
        <div>
          <Paragraph muted className="mb-6">
            Kết quả tìm kiếm cho: <strong className="text-text-1">&quot;{query}&quot;</strong>
          </Paragraph>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
              <Paragraph muted>Đang tìm kiếm...</Paragraph>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {/* Render results */}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Paragraph muted>
                Không tìm thấy kết quả nào. Thử tìm với từ khóa khác?
              </Paragraph>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="card text-center py-12">
          <Paragraph muted>
            Nhập từ khóa để tìm kiếm chương, khái niệm, hoặc tình huống.
          </Paragraph>
        </div>
      )}
    </>
  )
}

function SearchFallback() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
      <Paragraph muted>Đang tải...</Paragraph>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <Heading level={1} className="mb-4">
          Tìm kiếm
        </Heading>
        <SearchBar className="max-w-xl" />
      </header>

      <Suspense fallback={<SearchFallback />}>
        <SearchContent />
      </Suspense>
    </div>
  )
}
