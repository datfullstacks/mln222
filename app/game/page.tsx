import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Badge } from '@/components/atomic/atoms/Badge'
import { Button } from '@/components/atomic/atoms/Button'
import { Callout } from '@/components/atomic/molecules/Callout'
import { Icon } from '@/components/atomic/atoms/Icon'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Game',
  description: 'Trải nghiệm game tương tác về đứt gãy công nghệ và kinh tế-chính trị',
}

const games = [
  {
    id: 'tech-journey',
    title: 'Hành Trình Công Nghệ',
    description: 'Đi qua 4 không gian, đưa ra 4 quyết định. Mỗi lựa chọn sẽ định hình thế giới của bạn. Trải nghiệm 3D tương tác về đứt gãy công nghệ.',
    badge: '3D Interactive',
    badgeVariant: 'primary' as const,
    status: 'available',
    href: '/game/tech-journey',
    icon: '🚀',
  },
  {
    id: 'chip-crisis',
    title: 'Chip Crisis Simulator',
    description: 'Đóng vai nhà hoạch định chính sách trong cuộc khủng hoảng chip toàn cầu. Bạn sẽ quyết định như thế nào?',
    badge: 'Strategy',
    badgeVariant: 'rupture' as const,
    status: 'coming-soon',
    href: '#',
    icon: '🎯',
  },
  {
    id: 'platform-tycoon',
    title: 'Platform Tycoon',
    description: 'Xây dựng đế chế nền tảng số của riêng bạn. Liệu bạn có trở thành kẻ độc quyền?',
    badge: 'Simulation',
    badgeVariant: 'critical' as const,
    status: 'coming-soon',
    href: '#',
    icon: '🏢',
  },
  {
    id: 'tech-war-quiz',
    title: 'Tech War Quiz',
    description: 'Kiểm tra kiến thức về cuộc chiến công nghệ Mỹ-Trung và các sự kiện lịch sử.',
    badge: 'Quiz',
    badgeVariant: 'system' as const,
    status: 'coming-soon',
    href: '#',
    icon: '❓',
  },
]

export default function GamePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12 text-center">
        <Badge variant="rupture" className="mb-4">
          Interactive Learning
        </Badge>
        <Heading level={1} className="mb-4">
          Game & Trải nghiệm
        </Heading>
        <Paragraph size="lg" muted className="max-w-2xl mx-auto">
          Học qua chơi — khám phá các khái niệm kinh tế-chính trị và đứt gãy công nghệ 
          thông qua các game tương tác.
        </Paragraph>
      </header>

      <Callout type="concept" title="Gamification trong giáo dục">
        Game hóa giúp người học tiếp thu kiến thức phức tạp một cách tự nhiên. 
        Thông qua simulation và role-play, bạn sẽ hiểu sâu hơn về các mâu thuẫn 
        trong nền kinh tế công nghệ.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {games.map((game) => (
          <div
            key={game.id}
            className="card card-hover group relative overflow-hidden"
          >
            {/* Coming soon overlay - only for coming-soon games */}
            {game.status === 'coming-soon' && (
              <div className="absolute inset-0 bg-bg-0/60 backdrop-blur-sm flex items-center justify-center z-10">
                <Badge variant="default" className="text-lg px-4 py-2">
                  🚧 Coming Soon
                </Badge>
              </div>
            )}

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <Badge variant={game.badgeVariant}>{game.badge}</Badge>
                <span className="text-3xl">{game.icon}</span>
              </div>

              <h3 className="heading-4 mb-2 group-hover:text-primary-400 transition-colors">
                {game.title}
              </h3>

              <Paragraph muted className="mb-6">
                {game.description}
              </Paragraph>

              {game.status === 'available' ? (
                <Link href={game.href}>
                  <Button variant="primary" className="w-full">
                    🎮 Chơi ngay
                  </Button>
                </Link>
              ) : (
                <Button variant="secondary" disabled className="w-full">
                  Chơi ngay
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <section className="mt-16 card bg-surface-2 border-primary-600/30 text-center">
        <Heading level={3} className="mb-4">
          Muốn đóng góp ý tưởng game?
        </Heading>
        <Paragraph muted className="mb-6 max-w-xl mx-auto">
          Chúng tôi đang phát triển các game tương tác. Nếu bạn có ý tưởng hoặc muốn 
          tham gia phát triển, hãy liên hệ với chúng tôi!
        </Paragraph>
        <Link href="/about#contact">
          <Button variant="primary">
            Liên hệ ngay
          </Button>
        </Link>
      </section>
    </div>
  )
}
