import { SectionTitle } from '../atoms/SectionTitle'
import { Paragraph } from '../atoms/Typography'
import { BlockQuote, FeaturePillar, HighlightBox, ImageFigure } from '../molecules'

interface StrategicPillar {
  icon: string
  title: string
  description: string
  colorScheme: 'primary' | 'accent' | 'system'
}

const strategicPillars: StrategicPillar[] = [
  {
    icon: '⚙️',
    title: 'Công nghệ',
    description: 'Nâng cao năng lực công nghệ quốc gia',
    colorScheme: 'primary',
  },
  {
    icon: '👥',
    title: 'Con người',
    description: 'Phát triển nguồn nhân lực chất lượng cao',
    colorScheme: 'accent',
  },
  {
    icon: '📋',
    title: 'Thể chế',
    description: 'Hoàn thiện khung pháp lý và chính sách',
    colorScheme: 'system',
  },
  {
    icon: '🏗️',
    title: 'Hạ tầng',
    description: 'Đầu tư hạ tầng số và kỹ thuật',
    colorScheme: 'primary',
  },
  {
    icon: '💰',
    title: 'Tài chính',
    description: 'Huy động nguồn lực tài chính đa dạng',
    colorScheme: 'accent',
  },
  {
    icon: '🌿',
    title: 'Môi trường',
    description: 'Phát triển xanh và bền vững',
    colorScheme: 'system',
  },
]

export function VietnamTechArticles() {
  return (
    <article className="mb-12 mt-16">
      {/* Header */}
      <SectionTitle
        centered
        subtitle="Trong bối cảnh đứt gãy công nghệ toàn cầu và Cách mạng công nghiệp 4.0, quá trình công nghiệp hóa ở Việt Nam đang chịu tác động mạnh mẽ."
      >
        Đứt gãy công nghệ và Cách mạng công nghiệp tại Việt Nam
      </SectionTitle>

      {/* Quote */}
      <BlockQuote
        quote="Trong khi thế giới đang tiến vào cuộc CMCN lần thứ tư thì Việt Nam vẫn đang ở giai đoạn tương ứng với trình độ cuộc CMCN lần thứ hai"
        attribution="Nhận định của các chuyên gia về nền kinh tế còn thâm dụng lao động giản đơn, công nghệ đa phần nhập khẩu, và chủ yếu tham gia các khâu gia công, lắp ráp có giá trị gia tăng thấp."
        className="mb-10"
      />

      {/* Two Column Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <ImageFigure
          src="/images/cmcn4-vietnam.jpg"
          alt="Ứng dụng CMCN 4.0 trong công nghiệp chế tạo"
          caption="Ứng dụng các thành tựu của cuộc Cách mạng công nghiệp lần thứ tư trong lĩnh vực công nghiệp chế tạo"
          fallbackIcon="🤖"
          fallbackText="CMCN 4.0"
        />
        <ImageFigure
          src="/images/assembly-vietnam.jpg"
          alt="Công nghiệp lắp ráp sản xuất tại Việt Nam"
          caption="Công nghiệp lắp ráp sản xuất tại Việt Nam"
          fallbackIcon="🏭"
          fallbackText="Công nghiệp sản xuất"
        />
      </div>

      {/* Content */}
      <div className="space-y-6 mb-10">
        <Paragraph>
          Khi tự động hóa và robot phát triển nhanh, lợi thế lao động giá rẻ dần suy giảm, khiến nhiều ngành
          sản xuất truyền thống đối mặt nguy cơ mất cạnh tranh. Nếu chậm chuyển đổi, Việt Nam có nguy
          cơ tụt hậu xa hơn, gia tăng phụ thuộc vào công nghệ nhập khẩu.
        </Paragraph>
        <Paragraph>
          Đồng thời, đứt gãy công nghệ làm gia tăng sự phân hóa giữa các ngành, khu vực và nhóm lao
          động. Tuy nhiên, đây cũng là cơ hội để Việt Nam đi tắt đón đầu, phát triển kinh tế số, công nghiệp
          xanh và các ngành dựa trên tri thức.
        </Paragraph>
      </div>

      {/* Sustainable Development */}
      <HighlightBox
        icon="🌱"
        title="Con đường phát triển bền vững"
        variant="gradient"
        className="mb-10"
      >
        <Paragraph>
          Gắn công nghiệp hóa với đổi mới sáng tạo, chuyển đổi số và phát triển bền vững là con đường
          tất yếu để Việt Nam nâng cao năng lực cạnh tranh, tận dụng cơ hội từ công nghệ và phát triển
          lâu dài trong kỷ nguyên số.
        </Paragraph>
      </HighlightBox>

      {/* Conclusion Section */}
      <div className="bg-surface-1 border border-border-1 rounded-xl p-6 md:p-8">
        <h3 className="heading-3 text-text-1 mb-6">Kết luận</h3>

        {/* Key Message */}
        <HighlightBox
          icon="💡"
          title="Đứt gãy công nghệ vừa là rủi ro vừa là cơ hội"
          variant="primary"
          className="mb-8"
        >
          <p className="text-text-2 text-sm leading-relaxed">
            Để biến rủi ro thành động lực, yêu cầu khách quan là phải thực hiện một chiến lược tích hợp, đồng thời
            đảm bảo chuyển đổi là công bằng và thân thiện với môi trường.
          </p>
        </HighlightBox>

        {/* 6 Strategic Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {strategicPillars.map((pillar, index) => (
            <FeaturePillar
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              colorScheme={pillar.colorScheme}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
