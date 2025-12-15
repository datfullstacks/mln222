import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { Divider } from '@/components/atomic/atoms/Divider'
import { Icon } from '@/components/atomic/atoms/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Giới thiệu về dự án Đứt gãy Công nghệ và đội ngũ phát triển',
}

const teamMembers = [
  {
    name: 'Nguyễn Văn A',
    role: 'Project Lead',
    description: 'Nghiên cứu sinh kinh tế chính trị, chuyên về phân tích công nghệ và phát triển.',
    avatar: '👨‍💼',
  },
  {
    name: 'Trần Thị B',
    role: 'Content Writer',
    description: 'Chuyên gia nội dung, biên tập và nghiên cứu tài liệu Mác-Lênin.',
    avatar: '👩‍💻',
  },
  {
    name: 'Lê Văn C',
    role: 'Developer',
    description: 'Full-stack developer, phụ trách phát triển website và các công cụ tương tác.',
    avatar: '👨‍💻',
  },
  {
    name: 'Phạm Thị D',
    role: 'Designer',
    description: 'UX/UI Designer, thiết kế trải nghiệm người dùng và infographic.',
    avatar: '👩‍🎨',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-500/20 mb-6">
          <Icon name="users" size="sm" className="text-primary-400" />
          <span className="text-primary-400 text-sm font-medium">About Us</span>
        </div>
        <Heading level={1} className="mb-4">
          Về chúng tôi
        </Heading>
        <Paragraph size="lg" muted className="max-w-2xl mx-auto">
          Dự án nghiên cứu và truyền thông về đứt gãy công nghệ từ góc nhìn 
          kinh tế–chính trị Mác–Lênin.
        </Paragraph>
      </header>

      {/* Mission Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
            <Icon name="target" size="sm" className="text-primary-400" />
          </div>
          <Heading level={2} className="!mb-0">Sứ mệnh</Heading>
        </div>
        
        <div className="bg-surface-1 border border-border-1 rounded-xl p-6 mb-6">
          <Paragraph className="text-text-1">
            Trong thời đại công nghệ phát triển chóng mặt, chúng tôi tin rằng cần có 
            một góc nhìn phê phán — không chỉ ca ngợi đổi mới, mà còn phân tích 
            mâu thuẫn, bất bình đẳng, và quyền lực đằng sau công nghệ.
          </Paragraph>
        </div>

        <Paragraph className="mb-4">
          <strong className="text-text-1">Đứt gãy Công nghệ</strong> là dự án phi lợi nhuận nhằm:
        </Paragraph>
        <ul className="space-y-3 text-text-2">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1">•</span>
            <span>Phân tích các hiện tượng công nghệ đương đại qua lăng kính Mác-Lênin</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1">•</span>
            <span>Giải thích khái niệm kinh tế-chính trị một cách dễ hiểu</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1">•</span>
            <span>Kết nối lý luận với thực tiễn (chip war, Big Tech, AI...)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1">•</span>
            <span>Tạo tài nguyên học tập tương tác (game, infographic)</span>
          </li>
        </ul>
      </section>

      <Divider className="my-10" />

      {/* Team Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-system-500/20 flex items-center justify-center">
            <Icon name="users" size="sm" className="text-system-500" />
          </div>
          <Heading level={2} className="!mb-0">Đội ngũ</Heading>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-surface-1 border border-border-1 rounded-xl p-5 hover:border-primary-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{member.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-1">{member.name}</h3>
                  <span className="text-sm text-primary-400">{member.role}</span>
                  <p className="text-sm text-text-2 mt-2">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider className="my-10" />

      {/* Values Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-rupture-500/20 flex items-center justify-center">
            <Icon name="star" size="sm" className="text-rupture-500" />
          </div>
          <Heading level={2} className="!mb-0">Giá trị cốt lõi</Heading>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-surface-1 border border-border-1 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center mb-3">
              <Icon name="book-open" size="sm" className="text-primary-400" />
            </div>
            <h3 className="font-semibold text-text-1 mb-2">Khoa học</h3>
            <p className="text-sm text-text-2">
              Dựa trên nghiên cứu, trích nguồn rõ ràng, sẵn sàng cập nhật khi có thông tin mới.
            </p>
          </div>
          
          <div className="bg-surface-1 border border-border-1 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-critical-500/20 flex items-center justify-center mb-3">
              <Icon name="zap" size="sm" className="text-critical-500" />
            </div>
            <h3 className="font-semibold text-text-1 mb-2">Phê phán</h3>
            <p className="text-sm text-text-2">
              Không giáo điều. Áp dụng sáng tạo lý luận vào thực tiễn đương đại.
            </p>
          </div>
          
          <div className="bg-surface-1 border border-border-1 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-system-500/20 flex items-center justify-center mb-3">
              <Icon name="eye" size="sm" className="text-system-500" />
            </div>
            <h3 className="font-semibold text-text-1 mb-2">Minh bạch</h3>
            <p className="text-sm text-text-2">
              Công khai cách sử dụng AI, phương pháp làm việc, và các hạn chế.
            </p>
          </div>
        </div>
      </section>

      <Divider className="my-10" />

      {/* Contact Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
            <Icon name="mail" size="sm" className="text-primary-400" />
          </div>
          <Heading level={2} className="!mb-0">Liên hệ</Heading>
        </div>
        
        <Paragraph className="mb-6 text-text-2">
          Chúng tôi hoan nghênh mọi đóng góp, phê bình, và hợp tác:
        </Paragraph>

        <div className="bg-surface-1 border border-border-1 rounded-xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center">
                <Icon name="mail" size="sm" className="text-primary-400" />
              </div>
              <div>
                <span className="text-text-2 text-sm block">Email</span>
                <span className="text-primary-400">contact@dutgay.vn</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center">
                <Icon name="external-link" size="sm" className="text-primary-400" />
              </div>
              <div>
                <span className="text-text-2 text-sm block">GitHub</span>
                <span className="text-primary-400">github.com/datfullstacks/mln222</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License */}
      <section className="bg-surface-2 border border-border-1 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-rupture-500/20 flex items-center justify-center flex-shrink-0">
            <Icon name="file-text" size="sm" className="text-rupture-500" />
          </div>
          <div>
            <h3 className="font-semibold text-text-1 mb-2">Giấy phép</h3>
            <p className="text-sm text-text-2 mb-2">
              Nội dung trên website được phát hành theo giấy phép{' '}
              <strong className="text-rupture-400">CC BY-NC-SA 4.0</strong>{' '}
              (Attribution-NonCommercial-ShareAlike).
            </p>
            <p className="text-sm text-text-3">
              Bạn được tự do chia sẻ, remix với điều kiện ghi nguồn, phi thương mại, 
              và giữ nguyên giấy phép. Code nguồn theo giấy phép MIT.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
