import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getChapterBySlug, getAllChapters, extractTOC, getAllConcepts } from '@/lib/mdx'
import { ReadingLayout } from '@/components/templates/ReadingLayout'
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

export async function generateStaticParams() {
  const chapters = await getAllChapters()
  return chapters.map((chapter) => ({ slug: chapter.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const chapter = await getChapterBySlug(params.slug)
  
  if (!chapter) {
    return { title: 'Không tìm thấy' }
  }

  return {
    title: chapter.title,
    description: chapter.description,
  }
}

// MDX Components
const mdxComponents = {
  h2: (props: any) => <Heading level={2} {...props} className="mt-12 mb-4" />,
  h3: (props: any) => <Heading level={3} {...props} className="mt-8 mb-3" />,
  h4: (props: any) => <Heading level={4} {...props} className="mt-6 mb-2" />,
  p: (props: any) => <Paragraph {...props} className="mb-4" />,
  Callout,
  QuoteBlock,
  Badge,
}

export default async function ChapterPage({ params }: PageProps) {
  const chapter = await getChapterBySlug(params.slug)

  if (!chapter) {
    notFound()
  }

  const toc = extractTOC(chapter.content)
  
  // Get related concepts
  const allConcepts = await getAllConcepts()
  const relatedConcepts = chapter.concepts
    ? allConcepts.filter((c) => chapter.concepts?.includes(c.slug))
    : []

  return (
    <div className="py-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="primary">Chương</Badge>
          <time className="text-text-2 text-sm">{formatDate(chapter.date)}</time>
        </div>
        
        <Heading level={1} className="mb-4">
          {chapter.title}
        </Heading>
        
        <Paragraph size="lg" muted className="mb-6">
          {chapter.description}
        </Paragraph>

        <div className="flex flex-wrap gap-2">
          {chapter.tags.map((tag) => (
            <Tag key={tag} label={tag} href={`/chapters?tag=${tag}`} />
          ))}
        </div>
      </header>

      <Divider variant="gradient" className="max-w-md mx-auto mb-8" />

      {/* Content */}
      <ReadingLayout toc={toc} concepts={relatedConcepts}>
        <MDXRemote source={chapter.content} components={mdxComponents} />
      </ReadingLayout>
    </div>
  )
}
