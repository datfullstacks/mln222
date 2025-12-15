import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { getAllConcepts } from '@/lib/mdx'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Khái niệm',
  description: 'Từ điển thuật ngữ kinh tế-chính trị Mác-Lênin áp dụng cho phân tích công nghệ',
}

const categoryLabels: Record<string, { label: string; variant: 'primary' | 'rupture' | 'critical' | 'system' }> = {
  llsx: { label: 'Lực lượng sản xuất', variant: 'primary' },
  qhsx: { label: 'Quan hệ sản xuất', variant: 'primary' },
  mauthuan: { label: 'Mâu thuẫn', variant: 'rupture' },
  hequa: { label: 'Hệ quả', variant: 'critical' },
  dieutiet: { label: 'Điều tiết', variant: 'system' },
}

export default async function ConceptsPage() {
  const concepts = await getAllConcepts()

  // Group by category
  const grouped = concepts.reduce((acc, concept) => {
    if (!acc[concept.category]) {
      acc[concept.category] = []
    }
    acc[concept.category].push(concept)
    return acc
  }, {} as Record<string, typeof concepts>)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <Heading level={1} className="mb-4">
          Khái niệm & Thuật ngữ
        </Heading>
        <Paragraph size="lg" muted className="max-w-2xl">
          Hệ thống thuật ngữ kinh tế–chính trị Mác–Lênin được áp dụng để phân tích 
          các hiện tượng công nghệ đương đại.
        </Paragraph>
      </header>

      {concepts.length === 0 ? (
        <div className="card text-center py-12">
          <Paragraph muted>Đang cập nhật thuật ngữ...</Paragraph>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(categoryLabels).map(([key, { label, variant }]) => {
            const items = grouped[key] || []
            if (items.length === 0) return null

            return (
              <section key={key}>
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant={variant} size="md">
                    {label}
                  </Badge>
                  <span className="text-text-2 text-sm">
                    ({items.length} khái niệm)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((concept) => (
                    <Link
                      key={concept.slug}
                      href={`/concepts/${concept.slug}`}
                      className="card card-hover"
                    >
                      <h3 className="font-semibold text-text-1 mb-2">
                        {concept.title}
                      </h3>
                      <p className="text-sm text-text-2 line-clamp-3">
                        {concept.definition}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
