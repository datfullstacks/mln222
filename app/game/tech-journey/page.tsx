import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hành Trình Công Nghệ - Interactive Game',
  description: 'Trải nghiệm tương tác về đứt gãy công nghệ. Đi qua 4 không gian, đưa ra 4 quyết định và khám phá thế giới bạn tạo ra.',
}

// Tạm ẩn game - redirect về trang chủ
export default function TechJourneyPage() {
  redirect('/')
}

/* ===== TẠM ẨN =====
import TechJourneyGame from '@/components/game/TechJourneyGame'

export default function TechJourneyPage() {
  return <TechJourneyGame />
}
===== KẾT THÚC ===== */
