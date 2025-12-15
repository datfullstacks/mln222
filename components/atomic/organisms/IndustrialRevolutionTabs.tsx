'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface Invention {
  title: string
  image: string
  imageCaption: string
  content: string
}

interface Revolution {
  id: number
  label: string
  icon: string
  shortDesc: string
  color: string
  bgGradient: string
  inventions: Invention[]
  bullets: string[]
}

const revolutionData: Revolution[] = [
  {
    id: 1,
    label: 'LẦN 1',
    icon: '🚂',
    shortDesc: 'Cơ khí hóa với máy chạy bằng thủy lực và hơi nước',
    color: 'bg-blue-600',
    bgGradient: 'from-blue-900/50',
    inventions: [
      {
        title: 'Thoi bay của John Kay – 1733',
        image: '/images/cmcnl11.png',
        imageCaption: 'Thoi bay của John Kay – 1733',
        content: 'Phát minh thoi bay của John Kay vào năm 1733 đã giúp cho những người thợ dệt không phải lao thoi bằng tay và giúp năng suất lao động đã tăng gấp đôi.',
      },
      {
        title: 'Máy kéo sợi của James Hargreaves – 1765',
        image: '/images/cmcnl12.png',
        imageCaption: 'Máy kéo sợi của James Hargreaves – 1765',
        content: 'Phát minh loại máy kéo sợi của James Hargreaves – 1765. Ông James đã chế tạo chiếc xa kéo sợi kéo được 8 cọc sợi cùng một lúc. Chiếc máy này được ông lấy tên con mình là Jenny.',
      },
      {
        title: 'Cải tiến máy kéo sợi của Richard Arkwright – 1769',
        image: '/images/cmcnl13.png',
        imageCaption: 'Cải tiến máy kéo sợi của Richard Arkwright – 1769',
        content: 'Sau đó, đến năm 1769 Richard Arkwright đã cải tiến máy kéo sợi không phải kéo bằng tay mà sử dụng sức súc vật. Về sau là sự thay đổi sử dụng sức nước.',
      },
      {
        title: 'Máy hơi nước của James Watt – 1784',
        image: '/images/cmcnl14.png',
        imageCaption: 'Máy hơi nước của James Watt – 1784',
        content: 'Năm 1784, James Watt phụ tá thí nghiệm của một trường đại học đã phát minh ra loại máy hơi nước. Đây được xem là phát minh cơ giới hóa đầu tiên của nhân loại, rất ý nghĩa trong nền công nghệ 1.0.',
      },
    ],
    bullets: [
      'Cách mạng công nghiệp lần thứ nhất khởi phát ở Anh, bắt đầu từ thế kỷ XVIII đến giữa thế kỷ XIX',
      'Diễn ra trước hết trong lĩnh vực dệt vải',
      'Nội dung cơ bản là chuyển từ lao động thủ công sang lao động sử dụng máy móc, thực hiện cơ giới hóa sản xuất bằng việc sử dụng năng lượng nước và hơi nước',
    ],
  },
  {
    id: 2,
    label: 'LẦN 2',
    icon: '🚗',
    shortDesc: 'Động cơ điện và dây chuyền lắp ráp, sản xuất hàng loạt',
    color: 'bg-blue-500',
    bgGradient: 'from-blue-800/50',
    inventions: [
      {
        title: 'Cách mạng công nghiệp lần thứ hai',
        image: '/images/cmcn2.0.jpg',
        imageCaption: 'Cách mạng công nghiệp lần thứ hai – Điện khí hóa và sản xuất hàng loạt',
        content: 'Cách mạng công nghiệp lần hai diễn ra nửa cuối thế kỷ XIX đến đầu thế kỷ XX. Nội dung thể hiện ở việc chuyển nền sản xuất cơ khí sang nền sản xuất điện – cơ khí và sang giai đoạn tự động hóa cục bộ trong sản xuất.',
      },
    ],
    bullets: [
      'Cách mạng công nghiệp lần hai diễn ra nửa cuối thế kỷ XIX đến đầu thế kỷ XX',
      'Nội dung của cách mạng công nghiệp lần thứ hai thể hiện ở việc chuyển nền sản xuất cơ khí sang nền sản xuất điện – cơ khí và sang giai đoạn tự động hóa cục bộ trong sản xuất',
    ],
  },
  {
    id: 3,
    label: 'LẦN 3',
    icon: '💻',
    shortDesc: 'Kỷ nguyên máy tính và tự động hóa',
    color: 'bg-blue-400',
    bgGradient: 'from-blue-700/50',
    inventions: [
      {
        title: 'Cách mạng công nghiệp lần thứ ba',
        image: '/images/cmcn3.0.jpg',
        imageCaption: 'Cách mạng công nghiệp lần thứ ba – Công nghệ thông tin và tự động hóa',
        content: 'Cách mạng công nghiệp lần thứ ba bắt đầu từ khoảng những năm đầu thập niên 60 của thế kỷ XX đến cuối thế kỷ XX. Đặc trưng cơ bản là sự xuất hiện công nghệ thông tin, tự động hóa sản xuất.',
      },
    ],
    bullets: [
      'Cách mạng công nghiệp lần thứ ba bắt đầu từ khoảng những năm đầu thập niên 60 của thế kỷ XX đến cuối thế kỷ XX',
      'Đặc trưng cơ bản là sự xuất hiện công nghệ thông tin, tự động hóa sản xuất',
    ],
  },
  {
    id: 4,
    label: 'LẦN 4',
    icon: '🤖',
    shortDesc: 'Các hệ thống liên kết thế giới thực và ảo',
    color: 'bg-cyan-500',
    bgGradient: 'from-cyan-600/50',
    inventions: [
      {
        title: 'Cách mạng công nghiệp lần thứ tư',
        image: '/images/cmcn4.0.jpg',
        imageCaption: 'Cách mạng công nghiệp lần thứ tư – Công nghệ đột phá',
        content: 'Được đề cập lần đầu tiên tại hội chợ triển lãm công nghệ Hannover (CHLB Đức) năm 2011 và được chính phủ Đức đưa vào "kế hoạch hành động chiến lược công nghệ cao" năm 2012. Đặc trưng là sự xuất hiện của các công nghệ mới có tính đột phá về chất như trí tuệ nhân tạo, big data, in 3D.',
      },
    ],
    bullets: [
      'Được đề cập lần đầu tiên tại hội chợ triển lãm công nghệ Hannover (CHLB Đức) năm 2011',
      'Được chính phủ Đức đưa vào "kế hoạch hành động chiến lược công nghệ cao" năm 2012',
      'Đặc trưng là sự xuất hiện của các công nghệ mới có tính đột phá về chất như trí tuệ nhân tạo, big data, in 3D',
    ],
  },
]

export function IndustrialRevolutionTabs() {
  const [activeTab, setActiveTab] = useState(1)
  const [activeSlide, setActiveSlide] = useState(0)
  const activeRevolution = revolutionData.find((r) => r.id === activeTab)!
  const activeInvention = activeRevolution.inventions[activeSlide]

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId)
    setActiveSlide(0) // Reset slide when changing tab
  }

  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev < activeRevolution.inventions.length - 1 ? prev + 1 : 0
    )
  }

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev > 0 ? prev - 1 : activeRevolution.inventions.length - 1
    )
  }

  return (
    <div className="mb-8">
      <h3 className="heading-3 text-center mb-6 text-primary-400">
        CÁCH MẠNG CÔNG NGHIỆP
      </h3>

      {/* Tabs - 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {revolutionData.map((revolution) => (
          <button
            key={revolution.id}
            onClick={() => handleTabChange(revolution.id)}
            className={cn(
              'card text-center transition-all duration-300 cursor-pointer',
              'bg-gradient-to-b to-surface-1',
              revolution.bgGradient,
              activeTab === revolution.id
                ? 'ring-2 ring-primary-400 scale-[1.02]'
                : 'hover:scale-[1.01] opacity-80 hover:opacity-100'
            )}
          >
            <div className="text-4xl mb-3">{revolution.icon}</div>
            <div
              className={cn(
                'text-white font-bold py-2 px-4 rounded-lg mb-3',
                revolution.color
              )}
            >
              {revolution.label}
            </div>
          </button>
        ))}
      </div>

      {/* Content Panel */}
      <div className="card bg-surface-1 border border-border-1">
        {/* Title */}
        <h4 className="heading-4 text-primary-400 mb-6">
          {activeInvention.title}
        </h4>

        {/* Image placeholder with navigation */}
        <div className="relative bg-surface-2 rounded-xl p-4 md:p-6 mb-4">
          {/* Navigation arrows */}
          {activeRevolution.inventions.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-surface-1/90 hover:bg-primary-600 rounded-full flex items-center justify-center text-text-1 hover:text-white transition-colors shadow-lg"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-surface-1/90 hover:bg-primary-600 rounded-full flex items-center justify-center text-text-1 hover:text-white transition-colors shadow-lg"
                aria-label="Next"
              >
                →
              </button>
            </>
          )}
          <div className="bg-surface-2 rounded-lg p-4">
            <h5 className="font-semibold text-primary-400 mb-3">
              {activeRevolution.id === 1 ? 'Cách mạng công nghiệp lần thứ nhất' : ''}
            </h5>
            <ul className="space-y-2">
              {activeRevolution.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 text-text-1">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <div className="relative w-full aspect-[16/10] max-h-[400px] md:max-h-[500px] mb-4 mx-auto">
              <Image
                src={activeInvention.image}
                alt={activeInvention.imageCaption}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                priority
              />
            </div>
          </div>


        </div>

        {/* Main content */}
        <p className="text-text-1 mb-6 leading-relaxed">
          {activeInvention.content}
        </p>


      </div>
    </div>
  )
}
