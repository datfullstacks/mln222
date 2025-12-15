import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { getAllCases } from '@/lib/mdx'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tình huống',
  description: 'Các tình huống nghiên cứu về đứt gãy công nghệ trong thực tiễn',
}

const typeLabels: Record<string, { label: string; variant: 'primary' | 'rupture' | 'critical' | 'system' }> = {
  'chip-war': { label: 'Chiến tranh Chip', variant: 'rupture' },
  platform: { label: 'Nền tảng số', variant: 'critical' },
  sovereignty: { label: 'Chủ quyền', variant: 'system' },
  sanctions: { label: 'Trừng phạt', variant: 'rupture' },
  other: { label: 'Khác', variant: 'primary' },
}

export default async function CasesPage() {
  const cases = await getAllCases()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <Heading level={1} className="mb-4">
          Tình huống nghiên cứu
        </Heading>
        <Paragraph size="lg" muted className="max-w-2xl">
          Phân tích các tình huống thực tiễn về đứt gãy công nghệ: từ cuộc chiến chip,
          độc quyền nền tảng, đến chủ quyền dữ liệu và trừng phạt công nghệ.
        </Paragraph>
      </header>

      {cases.length === 0 ? (
        <div className="card text-center py-12">
          <Paragraph muted>Đang cập nhật tình huống nghiên cứu...</Paragraph>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => {
            const type = typeLabels[caseItem.type]
            return (
              <Link
                key={caseItem.slug}
                href={`/cases/${caseItem.slug}`}
                className="card card-hover group"
              >
                <Badge variant={type.variant} className="mb-3">
                  {type.label}
                </Badge>
                <h3 className="heading-4 mb-2 group-hover:text-primary-400 transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-text-2 text-sm line-clamp-3">
                  {caseItem.description}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
