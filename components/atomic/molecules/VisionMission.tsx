import { cn } from '@/lib/utils'
import { Heading, Paragraph } from '../atoms/Typography'

interface VisionMissionProps {
  className?: string
}

export function VisionMission({ className }: VisionMissionProps) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8', className)}>
      {/* Tầm nhìn */}
      <div className="bg-surface-1 border border-border-1 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center">
            <span className="text-lg">👁️</span>
          </div>
          <Heading level={3} className="!mb-0">Tầm nhìn</Heading>
        </div>

        <Paragraph className="mb-4">
          <strong className="text-primary-400">Pythagoras</strong> hướng tới trở thành một không gian học thuật{' '}
          <strong className="text-text-1">ngắn gọn – dễ tiếp cận – có chiều sâu</strong>, nơi người đọc có thể nhìn nhận đứt gãy công nghệ như một hệ quả tất yếu của sự phát triển lực lượng sản xuất trong thời đại 4.0, thay vì chỉ xem đó là khoảng cách thuần túy về máy móc hay kỹ thuật.
        </Paragraph>

        <Paragraph className="text-text-2">
          Website mong muốn góp phần hình thành <strong className="text-text-1">tư duy phê phán – biện chứng</strong>, giúp người học hiểu rằng tiến bộ công nghệ vừa là động lực phát triển, vừa đặt ra những thách thức xã hội cần được giải quyết một cách chủ động và bền vững.
        </Paragraph>
      </div>

      {/* Sứ mệnh */}
      <div className="bg-surface-1 border border-border-1 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rupture-600/20 flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
          <Heading level={3} className="!mb-0">Sứ mệnh</Heading>
        </div>

        <ul className="space-y-4 text-text-2">
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
            <span>Hệ thống hóa cơ sở lý luận về các cuộc cách mạng công nghiệp trong Triết học Mác – Lênin, làm rõ vai trò của khoa học – công nghệ đối với sự phát triển kinh tế – xã hội.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
            <span>Phân tích tác động hai mặt của Cách mạng công nghiệp 4.0, chỉ ra cơ hội nâng cao năng suất, chất lượng sản xuất và những hệ quả như thất nghiệp công nghệ, bất bình đẳng và đứt gãy công nghệ.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
            <span>Vận dụng lý luận vào thực tiễn Việt Nam, đặc biệt trong bối cảnh công nghiệp hóa, hiện đại hóa gắn với đổi mới sáng tạo.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-400 mt-1 flex-shrink-0">•</span>
            <span>Kết nối học thuật với đời sống, giúp người đọc hiểu công nghệ không chỉ thay đổi nền kinh tế, mà còn tác động trực tiếp đến việc làm, kỹ năng lao động và vị thế của mỗi cá nhân trong xã hội.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
