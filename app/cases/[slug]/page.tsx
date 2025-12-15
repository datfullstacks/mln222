import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCaseBySlug, getAllCases } from '@/lib/mdx'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { Tag } from '@/components/atomic/atoms/Tag'
import { Divider } from '@/components/atomic/atoms/Divider'
import { Callout } from '@/components/atomic/molecules/Callout'
import { QuoteBlock } from '@/components/atomic/molecules/QuoteBlock'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

const typeLabels: Record<string, { label: string; variant: 'primary' | 'rupture' | 'critical' | 'system' }> = {
  'chip-war': { label: 'Chiến tranh Chip', variant: 'rupture' },
  platform: { label: 'Nền tảng số', variant: 'critical' },
  sovereignty: { label: 'Chủ quyền', variant: 'system' },
  sanctions: { label: 'Trừng phạt', variant: 'rupture' },
  other: { label: 'Khác', variant: 'primary' },
}

export async function generateStaticParams() {
  const cases = await getAllCases()
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const caseItem = await getCaseBySlug(params.slug)
  
  if (!caseItem) {
    return { title: 'Không tìm thấy' }
  }

  return {
    title: caseItem.title,
    description: caseItem.description,
  }
}

const mdxComponents = {
  h2: (props: any) => <Heading level={2} {...props} className="mt-12 mb-4" />,
  h3: (props: any) => <Heading level={3} {...props} className="mt-8 mb-3" />,
  p: (props: any) => <Paragraph {...props} className="mb-4" />,
  Callout,
  QuoteBlock,
}

export default async function CasePage({ params }: PageProps) {
  const caseItem = await getCaseBySlug(params.slug)

  if (!caseItem) {
    notFound()
  }

  const type = typeLabels[caseItem.type]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={type.variant}>{type.label}</Badge>
          <time className="text-text-2 text-sm">{formatDate(caseItem.date)}</time>
        </div>
        
        <Heading level={1} className="mb-4">
          {caseItem.title}
        </Heading>
        
        <Paragraph size="lg" muted className="mb-6">
          {caseItem.description}
        </Paragraph>

        <div className="flex flex-wrap gap-2">
          {caseItem.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </header>

      <Divider variant="gradient" className="my-8" />

      {/* Content */}
      <article className="prose prose-invert max-w-none">
        <MDXRemote source={caseItem.content} components={mdxComponents} />
      </article>
    </div>
  )
}
