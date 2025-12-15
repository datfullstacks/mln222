import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getConceptBySlug, getAllConcepts, getAllChapters } from '@/lib/mdx'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { Divider } from '@/components/atomic/atoms/Divider'
import { CardMeta } from '@/components/atomic/molecules/CardMeta'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

const categoryLabels: Record<string, { label: string; variant: 'primary' | 'rupture' | 'critical' | 'system' }> = {
  llsx: { label: 'Lực lượng sản xuất', variant: 'primary' },
  qhsx: { label: 'Quan hệ sản xuất', variant: 'primary' },
  mauthuan: { label: 'Mâu thuẫn', variant: 'rupture' },
  hequa: { label: 'Hệ quả', variant: 'critical' },
  dieutiet: { label: 'Điều tiết', variant: 'system' },
}

export async function generateStaticParams() {
  const concepts = await getAllConcepts()
  return concepts.map((concept) => ({ slug: concept.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const concept = await getConceptBySlug(params.slug)
  
  if (!concept) {
    return { title: 'Không tìm thấy' }
  }

  return {
    title: concept.title,
    description: concept.definition,
  }
}

export default async function ConceptPage({ params }: PageProps) {
  const concept = await getConceptBySlug(params.slug)

  if (!concept) {
    notFound()
  }

  const cat = categoryLabels[concept.category]

  // Get related chapters
  const allChapters = await getAllChapters()
  const relatedChapters = concept.relatedChapters
    ? allChapters.filter((c) => concept.relatedChapters?.includes(c.slug))
    : []

  // Get related concepts
  const allConcepts = await getAllConcepts()
  const relatedConcepts = concept.relatedConcepts
    ? allConcepts.filter((c) => concept.relatedConcepts?.includes(c.slug))
    : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <Badge variant={cat.variant} className="mb-4">
          {cat.label}
        </Badge>
        
        <Heading level={1} className="mb-4">
          {concept.title}
        </Heading>
        
        <Paragraph size="lg" className="text-text-2 border-l-4 border-primary-500 pl-4">
          {concept.definition}
        </Paragraph>
      </header>

      <Divider className="my-8" />

      {/* Content */}
      <article className="prose prose-invert max-w-none mb-12">
        <MDXRemote source={concept.content} />
      </article>

      {/* Related Concepts */}
      {relatedConcepts.length > 0 && (
        <section className="mb-12">
          <Heading level={3} className="mb-4">
            Khái niệm liên quan
          </Heading>
          <div className="flex flex-wrap gap-3">
            {relatedConcepts.map((c) => (
              <Link
                key={c.slug}
                href={`/concepts/${c.slug}`}
                className="card card-hover py-3 px-4"
              >
                <span className="font-medium text-text-1">{c.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Chapters */}
      {relatedChapters.length > 0 && (
        <section>
          <Heading level={3} className="mb-4">
            Chương có nhắc đến
          </Heading>
          <div className="grid gap-4">
            {relatedChapters.map((chapter) => (
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
        </section>
      )}
    </div>
  )
}
