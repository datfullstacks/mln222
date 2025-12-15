import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { ChapterList } from '@/components/atomic/organisms/ChapterList'
import { getAllChapters } from '@/lib/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chương',
  description: 'Danh sách các chương phân tích đứt gãy công nghệ từ góc nhìn Mác-Lênin',
}

export default async function ChaptersPage() {
  const chapters = await getAllChapters()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <Heading level={1} className="mb-4">
          Các chương
        </Heading>
        <Paragraph size="lg" muted className="max-w-2xl">
          Phân tích có hệ thống về mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất 
          trong kỷ nguyên công nghệ số.
        </Paragraph>
      </header>

      <ChapterList chapters={chapters} />
    </div>
  )
}
