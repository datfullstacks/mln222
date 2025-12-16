import { Divider } from '@/components/atomic/atoms/Divider'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { AIToolCard, Callout, CommitmentBox, HighlightBox, ProcessSteps, ToolsList } from '@/components/atomic/molecules'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Usage - Mục tiêu sử dụng trí tuệ nhân tạo',
  description: 'Cách nhóm sử dụng AI trong việc xây dựng và vận hành website Đứt gãy Công nghệ',
}

// Data cho các công cụ AI
const aiTools = [
  {
    icon: '📓',
    name: 'NotebookLM',
    purpose: 'Trích dẫn, tổng hợp và đối chiếu nội dung lý thuyết từ giáo trình Lý luận chính trị (đặc biệt là giáo trình Triết học Mác – Lênin và Kinh tế chính trị Mác – Lênin) nhằm xây dựng nền tảng lập luận cho bài làm.',
    promptLogLinks: [
      { label: 'NotebookLM Log', href: 'https://notebooklm.google.com/notebook/854c1783-c586-4d0f-ac3b-a6f5025249a2?pli=1' },
    ],
    results: 'Các đoạn trích, ý chính và gợi ý liên kết giữa các khái niệm lý luận phục vụ cho việc lập luận và trích dẫn học thuật.',
    verification: 'Nhóm đối chiếu lại toàn bộ nội dung với giáo trình gốc (bản in hoặc bản scan) xác nhận chính xác chương, mục và số trang. Những nội dung không xác minh được hoặc không trùng khớp với nguồn chính thống được loại bỏ hoặc viết lại theo nguồn chuẩn.',
  },
  {
    icon: '💬',
    name: 'ChatGPT',
    purpose: 'Soạn nhập nội dung cho phần thuyết trình, bao gồm: dàn ý, lời dẫn, ghi chú cho người thuyết trình và gợi ý cấu trúc trình bày.',
    promptLogLinks: [
      { label: 'Prompt Log 1', href: 'https://chatgpt.com/share/e/693e93ab-4e80-8013-bacf-664606ba0ff6' },
      { label: 'Prompt Log 2', href: 'https://chatgpt.com/share/e/693e96c2-b864-800a-9f75-de322ac2a36d' },
      { label: 'Prompt Log 3', href: 'https://chatgpt.com/share/e/693e95c5-50e0-800d-8cb5-4fb0ec637604' },
    ],
    results: 'Bản nhập dàn ý thuyết trình, lời trình bày và gợi ý cách sắp xếp nội dung để đảm bảo mạch lạc, dễ theo dõi.',
    verification: 'Nhóm rà soát nội dung, chỉnh sửa văn phong theo hướng học thuật, loại bỏ hoặc điều chỉnh các nhận định chưa có nguồn, bổ sung trích dẫn từ NotebookLM và các văn bản chính thống. Các phần được chỉnh sửa lại được xác định rõ là nội dung do sinh viên biên soạn lại trước khi công bố.',
  },
  {
    icon: '🔍',
    name: 'DeepSeek',
    purpose: 'Tinh chỉnh kịch bản thuyết trình đã được soạn nhập, tập trung vào việc làm rõ mạch lập luận, tăng logic và sự liền mạch trong diễn đạt.',
    promptLogLinks: [
      { label: 'DeepSeek Log', href: 'https://chat.deepseek.com/share/loraanuxm8ekaq7rpl' },
    ],
    results: 'Gợi ý điều chỉnh cấu trúc câu, cách chuyển ý giữa các phần và cải thiện khả năng diễn đạt khi trình bày bằng lời nói.',
    verification: 'Nhóm xem xét từng gợi ý, chỉ tiếp thu các chỉnh sửa liên quan đến diễn đạt và hình thức trình bày, không tiếp nhận nội dung mang tính bổ sung lập luận hoặc kết luận học thuật mới nếu không có nguồn kiểm chứng. Nội dung cuối cùng vẫn dựa trên phân tích và trách nhiệm của nhóm.',
  },
  {
    icon: '💜',
    name: 'Lovable',
    purpose: 'Hỗ trợ dàn trang nội dung dự án lên website, bao gồm bố cục các phần, cách trình bày trực quan và khả năng hiển thị trên nhiều thiết bị.',
    results: 'Khung bố cục website và gợi ý cách trình bày nội dung.',
    verification: 'Nhóm điều chỉnh bố cục, kiểu chữ và nội dung hiển thị; đảm bảo mọi nội dung học thuật đăng tải trên website đã được kiểm chứng. Những phần do hệ thống gợi ý tự động được xem là đầu ra của công cụ và đã được biên tập lại trước khi công bố.',
  },
  {
    icon: '📌',
    name: 'Pinterest',
    purpose: 'Tham khảo ý tưởng hình minh họa và sơ đồ trình bày.',
    results: 'Danh sách ý tưởng hình ảnh và cách trực quan hóa nội dung.',
    verification: 'Nhóm chỉ sử dụng hình ảnh hợp lệ (có giấy phép, nguồn rõ ràng hoặc ảnh tự tạo); tất cả hình ảnh đầu được ghi nguồn đầy đủ.',
  },
]

// Data cho quy trình kiểm chứng
const verificationSteps = [
  {
    title: 'Đánh dấu nội dung AI',
    description: 'Đánh dấu mọi nội dung do công cụ trí tuệ nhân tạo đề xuất (nhận định, số liệu, trích dẫn).',
  },
  {
    title: 'Đối chiếu nguồn chính thống',
    description: 'Đối chiếu với nguồn chính thống: giáo trình Lý luận chính trị, nghị quyết và văn bản chính thức (ghi rõ chương, trang, số hiệu nếu có).',
  },
  {
    title: 'Kết luận kiểm chứng',
    description: 'Kết luận kiểm chứng: Hợp lệ / Chưa đủ căn cứ / Sai.',
  },
  {
    title: 'Chỉnh sửa và chịu trách nhiệm',
    description: 'Chỉ giữ lại nội dung đã xác minh; nhóm chịu trách nhiệm về bản cuối cùng.',
  },
]

// Data cho ứng dụng sáng tạo
const creativeTools = [
  { icon: '📓', name: 'NotebookLM', description: 'Hỗ trợ trích dẫn và đối chiếu nhanh giáo trình Lý luận chính trị.' },
  { icon: '💬', name: 'ChatGPT', description: 'Hỗ trợ soạn nhập dàn ý và lời thuyết trình.' },
  { icon: '🔍', name: 'DeepSeek', description: 'Hỗ trợ tinh chỉnh kịch bản thuyết trình.' },
  { icon: '💜', name: 'Lovable', description: 'Hỗ trợ dàn trang website trực quan, dễ đọc.' },
]

export default function AIUsagePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-4xl mb-4">
          <span>🤖</span>
        </div>
        <Heading level={1} className="mb-4">
          AI Usage
        </Heading>
        <Paragraph size="lg" muted className="max-w-2xl mx-auto">
          Mục tiêu sử dụng trí tuệ nhân tạo
        </Paragraph>
      </header>

      {/* Intro Callout */}
      <Callout type="concept" className="mb-12">
        <p className="mb-3">
          Nhóm sử dụng trí tuệ nhân tạo với vai trò <strong className="text-primary-400">hỗ trợ</strong> trong quá trình thực hiện bài làm, bao gồm: trích dẫn tài liệu, tra cứu nội dung lý thuyết, soạn nhập nội dung thuyết trình và hỗ trợ dàn trang website.
        </p>
        <p className="mb-3">
          Trí tuệ nhân tạo <strong className="text-rupture-400">không được sử dụng</strong> để thay thế toàn bộ hoạt động nghiên cứu, phân tích và viết nội dung học thuật.
        </p>
        <p>
          Nhóm chịu trách nhiệm hoàn toàn đối với nội dung cuối cùng được công bố.
        </p>
      </Callout>

      {/* Các công cụ AI đã sử dụng */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">⚙️</span>
          <Heading level={2}>Các công cụ trí tuệ nhân tạo đã sử dụng</Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, index) => (
            <AIToolCard
              key={index}
              icon={tool.icon}
              name={tool.name}
              purpose={tool.purpose}
              promptLogLinks={tool.promptLogLinks}
              results={tool.results}
              verification={tool.verification}
            />
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      {/* Quy trình kiểm chứng thông tin */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">✓</span>
          <Heading level={2}>Quy trình kiểm chứng thông tin</Heading>
        </div>

        <Paragraph className="text-text-2 mb-6">
          Nhóm áp dụng quy trình kiểm chứng gồm 4 bước:
        </Paragraph>

        <ProcessSteps steps={verificationSteps} />
      </section>

      <Divider className="my-12" />

      {/* Ứng dụng sáng tạo */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">💡</span>
          <Heading level={2}>Ứng dụng sáng tạo</Heading>
        </div>

        <HighlightBox variant="gradient" className="mb-6">
          <Paragraph className="mb-4">
            Trí tuệ nhân tạo được sử dụng nhằm hỗ trợ quy trình học tập và trình bày, bao gồm:
          </Paragraph>
          <ToolsList tools={creativeTools} />
        </HighlightBox>

        <CommitmentBox variant="warning" title="">
          <p className="text-text-2 italic">
            Trí tuệ nhân tạo không thay thế việc tự nghiên cứu, tự phân tích và tự chịu trách nhiệm học thuật của nhóm.
          </p>
        </CommitmentBox>
      </section>

      <Divider className="my-12" />

      {/* Cam kết liêm chính học thuật */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">⭕</span>
          <Heading level={2}>Cam kết liêm chính học thuật</Heading>
        </div>

        <CommitmentBox variant="info" title="Cam kết liêm chính học thuật">
          <p className="mb-4">
            Nhóm cam kết <strong className="text-rupture-400">không sử dụng trí tuệ nhân tạo để làm thay toàn bộ bài tập</strong>. Mọi nội dung học thuật và kết luận đăng tải đều đã được kiểm chứng bằng giáo trình Lý luận chính trị, nghị quyết và văn bản chính thống.
          </p>
          <p>
            Nhóm chịu trách nhiệm hoàn toàn về tính chính xác, minh bạch và liêm chính học thuật của sản phẩm cuối cùng.
          </p>
        </CommitmentBox>
      </section>
    </div>
  )
}
