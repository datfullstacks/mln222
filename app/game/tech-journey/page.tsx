import TechJourneyGame from '@/components/game/TechJourneyGame'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hành Trình Công Nghệ - Interactive Game',
  description: 'Trải nghiệm tương tác về đứt gãy công nghệ. Đi qua 4 không gian, đưa ra 4 quyết định và khám phá thế giới bạn tạo ra.',
}

export default function TechJourneyPage() {
  return <TechJourneyGame />
}
