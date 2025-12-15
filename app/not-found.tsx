import Link from 'next/link'
import { Heading, Paragraph } from '@/components/atomic/atoms/Typography'
import { Button } from '@/components/atomic/atoms/Button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <Heading level={1} className="text-gradient mb-4">
          404
        </Heading>
        <Heading level={2} className="mb-4">
          Không tìm thấy trang
        </Heading>
        <Paragraph muted className="mb-8 max-w-md mx-auto">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </Paragraph>
        <Link href="/">
          <Button variant="primary" size="lg">
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  )
}
