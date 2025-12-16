import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { Divider } from '@/components/atomic/atoms/Divider'
import {
  TeamMemberCard,
  CoreValueCard,
  VisionMission,
  HeroBanner,
  BlockQuote,
} from '@/components/atomic/molecules'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Về Chúng Tôi - Pythagoras',
  description: 'Giới thiệu về dự án Pythagoras và đội ngũ thực hiện',
}

// Data thành viên nhóm
const teamMembers = [
  { name: 'Đào Phương Thảo', studentId: 'SS170172', initial: 'Đ' },
  { name: 'Lê Thị Kiều Tiên', studentId: 'SS180868', initial: 'L' },
  { name: 'Trần Lê Thanh Thảo', studentId: 'SS181084', initial: 'T' },
  { name: 'Đỗ Phương Linh', studentId: 'SS180018', initial: 'Đ' },
  { name: 'Nguyễn Xuân Khang', studentId: 'SS170556', initial: 'N' },
]

// Data giá trị cốt lõi
const coreValues = [
  {
    icon: '🔍',
    title: 'Tính lịch sử – cụ thể',
    description: 'Mọi phân tích đều đặt trong bối cảnh từng giai đoạn phát triển công nghiệp và điều kiện kinh tế – xã hội cụ thể.',
  },
  {
    icon: '⚡',
    title: 'Tư duy biện chứng',
    description: 'Nhìn nhận công nghệ như một quá trình phát triển có mâu thuẫn, vừa tạo cơ hội vừa phát sinh thách thức.',
  },
  {
    icon: '📚',
    title: 'Rõ ràng – có căn cứ lý luận',
    description: 'Khái niệm chính xác, lập luận mạch lạc, bám sát nội dung Triết học Mác – Lênin.',
  },
  {
    icon: '🔗',
    title: 'Gắn lý luận với thực tiễn',
    description: 'Không chỉ dừng ở phân tích học thuật mà còn liên hệ đến người lao động, doanh nghiệp và xã hội Việt Nam hiện nay.',
  },
  {
    icon: '💬',
    title: 'Đối thoại mở',
    description: 'Khuyến khích người học trao đổi, phản biện và tiếp cận vấn đề công nghệ từ nhiều góc nhìn khác nhau.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <HeroBanner
        badge="Triết học Mác – Lênin"
        title="Pythagoras"
        subtitle='Nghiên cứu và lý giải chủ đề: "Đứt gãy công nghệ và hệ quả của nó – Tác động như thế nào đến chúng ta?"'
        backgroundImage="/images/circuit-pattern.jpg"
      />

      {/* Giới thiệu Pythagoras */}
      <section className="mb-16">
        {/* <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
            Π
          </div>
          <Heading level={2} className="!mb-0"> 1</Heading>
        </div> */}

        <div className="space-y-6">
          <Paragraph>
            <strong className="text-primary-400">Pythagoras</strong> là website học thuật của nhóm sinh viên môn Triết học Mác – Lênin, được xây dựng nhằm nghiên cứu và lý giải chủ đề:
          </Paragraph>

          <BlockQuote
            quote="Đứt gãy công nghệ và hệ quả của nó – Tác động như thế nào đến chúng ta?"
            className="my-6"
          />

          <Paragraph>
            Xuất phát từ bối cảnh Cách mạng công nghiệp lần thứ tư đang diễn ra mạnh mẽ trên phạm vi toàn cầu, website tập trung phân tích những chuyển biến sâu sắc do tiến bộ khoa học – công nghệ mang lại, đồng thời làm rõ hiện tượng đứt gãy công nghệ giữa các quốc gia, khu vực, doanh nghiệp và người lao động.
          </Paragraph>

          <Paragraph>
            Thông qua việc vận dụng cơ sở lý luận về các cuộc cách mạng công nghiệp trong Triết học Mác – Lênin, Pythagoras hướng tới lý giải tác động hai mặt của tiến bộ công nghệ đối với quá trình công nghiệp hóa, hiện đại hóa ở Việt Nam, nơi sự chênh lệch về trình độ công nghệ và nguồn nhân lực vẫn còn rõ nét.
          </Paragraph>

          <Paragraph className="text-text-2">
            Website được xây dựng với mục tiêu học tập, phân tích và đối thoại học thuật, giúp người đọc tiếp cận vấn đề công nghệ không chỉ dưới góc độ kỹ thuật, mà như một hiện tượng kinh tế – xã hội gắn với con người và sự phát triển bền vững.
          </Paragraph>
        </div>
      </section>

      <Divider className="my-12" />

      {/* Tầm nhìn & Sứ mệnh */}
      <section className="mb-16">
        <VisionMission />
      </section>

      <Divider className="my-12" />

      {/* Giá trị cốt lõi */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <Heading level={2} className="mb-3">Giá trị cốt lõi</Heading>
          <Paragraph muted className="max-w-2xl mx-auto">
            Những nguyên tắc định hướng mọi hoạt động nghiên cứu và trình bày của Pythagoras
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <CoreValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      {/* Nhóm thực hiện */}
      <section className="mb-16">
        <div className="bg-surface-2 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl">👥</span>
              <Heading level={2} className="!mb-0">Nhóm thực hiện</Heading>
            </div>
            <Paragraph muted>Pythagoras Team</Paragraph>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                studentId={member.studentId}
                initial={member.initial}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
