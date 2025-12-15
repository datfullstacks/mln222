import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { Divider } from '@/components/atomic/atoms/Divider'
import { Callout } from '@/components/atomic/molecules/Callout'
import { QuoteBlock } from '@/components/atomic/molecules/QuoteBlock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Usage',
  description: 'Cách chúng tôi sử dụng AI trong việc xây dựng và vận hành website Đứt gãy Công nghệ',
}

export default function AIUsagePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <Badge variant="primary" className="mb-4">
          Transparency
        </Badge>
        <Heading level={1} className="mb-4">
          AI Usage Policy
        </Heading>
        <Paragraph size="lg" muted>
          Minh bạch về cách chúng tôi sử dụng trí tuệ nhân tạo trong việc 
          xây dựng và vận hành website này.
        </Paragraph>
      </header>

      <article className="prose prose-invert max-w-none">
        <Callout type="concept" title="Cam kết minh bạch">
          Trong thời đại AI, chúng tôi tin rằng việc công khai cách sử dụng AI 
          là trách nhiệm đạo đức. Người đọc có quyền biết nội dung nào được hỗ trợ bởi AI.
        </Callout>

        <Heading level={2} className="mt-12 mb-4">
          1. AI trong phát triển website
        </Heading>

        <Heading level={3} className="mt-8 mb-3">
          Code Generation
        </Heading>
        <Paragraph className="mb-4">
          Website này được xây dựng với sự hỗ trợ của AI coding assistants:
        </Paragraph>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-text-1">
          <li><strong>GitHub Copilot:</strong> Hỗ trợ viết code, gợi ý patterns</li>
          <li><strong>Claude (Anthropic):</strong> Tư vấn kiến trúc, review code</li>
          <li><strong>ChatGPT:</strong> Debug, giải thích concepts</li>
        </ul>

        <Callout type="regulation" title="Human oversight">
          Mọi code được AI generate đều được con người review, test, và chỉnh sửa 
          trước khi deploy. AI là công cụ hỗ trợ, không phải người quyết định.
        </Callout>

        <Heading level={2} className="mt-12 mb-4">
          2. AI trong nội dung
        </Heading>

        <Heading level={3} className="mt-8 mb-3">
          Research & Drafting
        </Heading>
        <Paragraph className="mb-4">
          AI được sử dụng để:
        </Paragraph>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-text-1">
          <li>Tổng hợp thông tin từ nhiều nguồn</li>
          <li>Dịch thuật tài liệu nước ngoài</li>
          <li>Đề xuất cấu trúc bài viết</li>
          <li>Kiểm tra lỗi chính tả, ngữ pháp</li>
        </ul>

        <Callout type="rupture" title="Giới hạn">
          AI <strong>KHÔNG</strong> được sử dụng để:
          <ul className="list-disc pl-6 mt-2">
            <li>Tạo ra quan điểm, phân tích mà không có sự kiểm chứng của con người</li>
            <li>Trích dẫn nguồn mà AI "bịa ra" (hallucination)</li>
            <li>Thay thế hoàn toàn việc nghiên cứu học thuật</li>
          </ul>
        </Callout>

        <Heading level={3} className="mt-8 mb-3">
          Quy trình kiểm soát chất lượng
        </Heading>
        <Paragraph className="mb-4">
          Mọi nội dung đều trải qua quy trình:
        </Paragraph>
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-text-1">
          <li><strong>Draft:</strong> AI hỗ trợ tạo bản nháp</li>
          <li><strong>Fact-check:</strong> Con người xác minh thông tin</li>
          <li><strong>Edit:</strong> Biên tập, thêm quan điểm phân tích</li>
          <li><strong>Review:</strong> Đánh giá tổng thể trước xuất bản</li>
        </ol>

        <Heading level={2} className="mt-12 mb-4">
          3. Đánh dấu nội dung AI
        </Heading>
        <Paragraph className="mb-4">
          Chúng tôi sử dụng các badge để đánh dấu:
        </Paragraph>

        <div className="flex flex-wrap gap-3 mb-6">
          <Badge variant="primary">Human Written</Badge>
          <Badge variant="system">AI Assisted</Badge>
          <Badge variant="rupture">AI Generated (Reviewed)</Badge>
        </div>

        <Heading level={2} className="mt-12 mb-4">
          4. Quan điểm về AI
        </Heading>

        <QuoteBlock
          quote="AI là lực lượng sản xuất mới. Câu hỏi không phải là có dùng AI hay không, mà là ai sở hữu và kiểm soát AI — và vì lợi ích của ai."
          author="Đứt gãy Công nghệ"
        />

        <Callout type="consequence" title="Mâu thuẫn AI">
          Chính chúng tôi — khi sử dụng AI để phân tích về mâu thuẫn công nghệ — 
          cũng là một phần của hệ thống mâu thuẫn đó. Việc minh bạch này là nỗ lực 
          đối mặt với nghịch lý ấy.
        </Callout>

        <Divider className="my-12" />

        <Heading level={2} className="mb-4">
          5. Cập nhật chính sách
        </Heading>
        <Paragraph muted>
          Chính sách này được cập nhật lần cuối vào: <strong>Tháng 12, 2024</strong>
        </Paragraph>
        <Paragraph muted className="mt-2">
          Chúng tôi sẽ cập nhật chính sách khi có thay đổi về cách sử dụng AI.
        </Paragraph>
      </article>
    </div>
  )
}
