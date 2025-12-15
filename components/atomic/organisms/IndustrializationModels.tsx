'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Badge } from '../atoms/Badge'

interface ModelData {
  id: string
  label: string
  icon: string
  shortDesc: string
  color: string
  bgGradient: string
  period: string
  location: string
  startingPoint: string
  mechanism: string
  capitalSource: string
  duration: string
  results: string
  limitations: string
  details: {
    title: string
    paragraphs: string[]
  }
}

const modelsData: ModelData[] = [
  {
    id: 'classical',
    label: 'Mô hình Cổ điển',
    icon: '🏭',
    shortDesc: 'Công nghiệp nhẹ, tích lũy tư bản tư nhân',
    color: 'bg-amber-600',
    bgGradient: 'from-amber-900/50',
    period: 'TK 18-19',
    location: 'Bắt đầu từ Anh',
    startingPoint: 'Công nghiệp nhẹ (dệt may)',
    mechanism: 'Thị trường (tự phát, cạnh tranh)',
    capitalSource: 'Nông nghiệp, công nghiệp nhẹ, cướp bóc thuộc địa',
    duration: 'Dài (60-80 năm)',
    results: 'Tạo nền tảng CN hiện đại, bất bình đẳng xã hội cao',
    limitations: 'Gây mâu thuẫn xã hội, phụ thuộc thuộc địa',
    details: {
      title: 'Mô hình Công nghiệp hóa Cổ điển',
      paragraphs: [
        'Mô hình này gắn liền với Cách mạng Công nghiệp lần thứ nhất, khởi nguồn từ nước Anh vào giữa thế kỷ 18.',
        'Con đường phát triển: Quá trình diễn ra một cách tự phát theo cơ chế thị trường. Nó bắt đầu từ những ngành công nghiệp nhẹ, đặc biệt là dệt may, vì đây là ngành đòi hỏi vốn ít, chu kỳ sản xuất ngắn và thu lợi nhuận nhanh. Lợi nhuận từ công nghiệp nhẹ sau đó được dùng để tích lũy vốn, từng bước đầu tư phát triển công nghiệp nặng (như cơ khí, luyện kim) để sản xuất máy móc.',
        'Nguồn vốn: Chủ yếu đến từ ba nguồn: (1) Tích lũy từ nông nghiệp và công nghiệp nhẹ trong nước; (2) Bóc lột lao động làm thuê; (3) Xâm chiếm và cướp bóc thuộc địa - đây là một đặc điểm gắn liền với lịch sử của chủ nghĩa tư bản buổi đầu.',
        'Kết quả và hệ quả: Mô hình này thành công trong việc tạo dựng nền móng công nghiệp, nhưng diễn ra trong thời gian dài (60-80 năm) và đi kèm với những mâu thuẫn xã hội gay gắt (giữa tư bản và lao động, giữa các nước đế quốc với thuộc địa), tạo tiền đề cho sự ra đời của các học thuyết xã hội, trong đó có chủ nghĩa Mác.',
      ],
    },
  },
  {
    id: 'soviet',
    label: 'Mô hình Liên Xô',
    icon: '⚙️',
    shortDesc: 'Công nghiệp nặng, kế hoạch hóa tập trung',
    color: 'bg-red-600',
    bgGradient: 'from-red-900/50',
    period: 'Từ những năm 1930',
    location: 'Liên Xô',
    startingPoint: 'Công nghiệp nặng (cơ khí, chế tạo máy)',
    mechanism: 'Kế hoạch hóa tập trung (mệnh lệnh từ nhà nước)',
    capitalSource: 'Huy động toàn bộ nguồn lực xã hội thông qua nhà nước',
    duration: 'Rất ngắn, tập trung cao độ',
    results: 'Xây dựng cơ sở vật chất-kỹ thuật quy mô lớn nhanh chóng',
    limitations: 'Kìm hãm đổi mới, thiếu linh hoạt, dẫn đến trì trệ',
    details: {
      title: 'Mô hình Công nghiệp hóa kiểu Liên Xô (cũ)',
      paragraphs: [
        'Được triển khai từ những năm 1930 dưới thời Stalin, mô hình này ra đời trong bối cảnh Liên Xô cần xây dựng nhanh chóng tiềm lực công nghiệp để đối mặt với các mối đe dọa từ bên ngoài.',
        'Con đường phát triển: Khác với mô hình cổ điển, Liên Xô ưu tiên phát triển công nghiệp nặng ngay từ đầu, đặc biệt là ngành cơ khí chế tạo máy và năng lượng, coi đó là "nền tảng" để hiện đại hóa toàn bộ nền kinh tế.',
        'Cơ chế thực hiện: Mô hình này được thực hiện thông qua cơ chế kế hoạch hóa tập trung, mệnh lệnh từ nhà nước. Nhà nước huy động mọi nguồn lực (vốn, vật tư, lao động) và phân bổ tập trung cho các ngành ưu tiên.',
        'Kết quả và hạn chế: Ưu điểm lớn nhất là cho phép tập trung nguồn lực để đạt mục tiêu trong thời gian ngắn, giúp Liên Xô nhanh chóng xây dựng được một hệ thống cơ sở vật chất - kỹ thuật công nghiệp rất lớn. Tuy nhiên, hạn chế cốt tử là thiếu tính linh hoạt, kìm hãm đổi mới sáng tạo. Khi khoa học-kỹ thuật thế giới chuyển sang giai đoạn tự động hóa và tin học hóa, hệ thống cồng kềnh này không thích ứng kịp, dẫn đến trì trệ và là một trong những nguyên nhân quan trọng dẫn đến khủng hoảng.',
      ],
    },
  },
  {
    id: 'nics',
    label: 'Mô hình NICs',
    icon: '🐉',
    shortDesc: 'Chiến lược kép, rút ngắn thời gian',
    color: 'bg-emerald-600',
    bgGradient: 'from-emerald-900/50',
    period: 'Từ giữa TK 20',
    location: 'Nhật Bản, Hàn Quốc, Singapore',
    startingPoint: 'Linh hoạt, kết hợp công nghiệp nhẹ và nặng theo chiến lược',
    mechanism: 'Định hướng thị trường với can thiệp chiến lược của nhà nước',
    capitalSource: 'Tiết kiệm nội địa, thu hút vốn & công nghệ nước ngoài, xuất khẩu',
    duration: 'Rút ngắn (20-30 năm)',
    results: 'Hiện đại hóa nhanh, gia nhập nhóm nước phát triển',
    limitations: 'Phụ thuộc vào thị trường & công nghệ bên ngoài, rủi ro cạnh tranh',
    details: {
      title: 'Mô hình của Nhật Bản và các Nước Công nghiệp mới (NICs)',
      paragraphs: [
        'Nhật Bản và các "con rồng" châu Á như Hàn Quốc, Đài Loan, Singapore đã rút kinh nghiệm từ hai mô hình đi trước để áp dụng một chiến lược công nghiệp hóa rút ngắn, hoàn thành quá trình chỉ trong 20-30 năm.',
        'Chiến lược kép: Họ kết hợp nhuần nhuyễn hai chiến lược: (1) Sản xuất thay thế nhập khẩu để bảo hộ và phát triển ngành công nghiệp non trẻ trong nước; và (2) Hướng mạnh về xuất khẩu để tận dụng lợi thế quy mô thị trường thế giới.',
        'Nguồn lực và công nghệ: Thay vì chỉ dựa vào nội lực, họ chủ động tiếp nhận và chuyển giao công nghệ từ các nước phát triển hơn, đồng thời thu hút vốn đầu tư nước ngoài. Họ xây dựng chiến lược khoa học-công nghệ "nhiều tầng", kết hợp công nghệ truyền thống với công nghệ hiện đại.',
        'Vai trò nhà nước: Nhà nước đóng vai trò định hướng chiến lược và hỗ trợ tích cực thông qua các chính sách công nghiệp, đầu tư vào giáo dục và hạ tầng, nhưng vẫn tôn trọng các quy luật thị trường.',
      ],
    },
  },
]

// Tooltip component - hiển thị bên dưới để tránh bị che bởi overflow
function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <span className="group relative inline-flex items-center cursor-help">
      {children}
      <span className="text-primary-400 ml-1 text-xs">ⓘ</span>
      <span className="absolute top-full left-0 mt-2 px-3 py-2 bg-bg-primary border border-border-1 rounded-lg text-sm text-text-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 z-[9999] shadow-xl pointer-events-none">
        {content}
      </span>
    </span>
  )
}

export function IndustrializationModels() {
  const [activeModel, setActiveModel] = useState('classical')
  const [showDetails, setShowDetails] = useState(false)
  const model = modelsData.find((m) => m.id === activeModel)!

  return (
    <div className="mb-8">
      <h3 className="heading-3 text-center mb-4 text-primary-400">
        CÁC MÔ HÌNH CÔNG NGHIỆP HÓA TIÊU BIỂU
      </h3>
      <p className="text-center text-text-2 mb-6 max-w-3xl mx-auto">
        Công nghiệp hóa là quá trình chuyển đổi nền sản xuất xã hội từ dựa trên lao động thủ công 
        sang một nền sản xuất chủ yếu dựa trên lao động bằng máy móc, nhằm tạo ra năng suất lao động xã hội cao.
      </p>

      {/* Model Tabs - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {modelsData.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActiveModel(m.id)
              setShowDetails(false)
            }}
            className={cn(
              'card text-center transition-all duration-300 cursor-pointer',
              'bg-gradient-to-b to-surface-1',
              m.bgGradient,
              activeModel === m.id
                ? 'ring-2 ring-primary-400 scale-[1.02]'
                : 'hover:scale-[1.01] opacity-80 hover:opacity-100'
            )}
          >
            <div className="text-4xl mb-3">{m.icon}</div>
            <div
              className={cn(
                'text-white font-bold py-2 px-4 rounded-lg mb-2',
                m.color
              )}
            >
              {m.label}
            </div>
            <p className="text-text-2 text-sm">{m.shortDesc}</p>
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="card bg-surface-1 border border-border-1">
        <div className="flex items-center justify-between mb-4">
          <h4 className="heading-4 text-primary-400">
            {model.details.title}
          </h4>
          <Badge variant="primary">{model.period} • {model.location}</Badge>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-2 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <Tooltip content="Ngành công nghiệp khởi đầu của quá trình công nghiệp hóa">
                <span className="font-semibold text-text-1">Điểm xuất phát</span>
              </Tooltip>
            </div>
            <p className="text-text-2 text-sm">{model.startingPoint}</p>
          </div>

          <div className="bg-surface-2 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <Tooltip content="Cơ chế vận hành và điều phối nền kinh tế">
                <span className="font-semibold text-text-1">Cơ chế chủ đạo</span>
              </Tooltip>
            </div>
            <p className="text-text-2 text-sm">{model.mechanism}</p>
          </div>

          <div className="bg-surface-2 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💰</span>
              <Tooltip content="Nguồn gốc vốn để đầu tư phát triển công nghiệp">
                <span className="font-semibold text-text-1">Nguồn vốn tích lũy</span>
              </Tooltip>
            </div>
            <p className="text-text-2 text-sm">{model.capitalSource}</p>
          </div>

          <div className="bg-surface-2 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⏱️</span>
              <Tooltip content="Thời gian hoàn thành quá trình công nghiệp hóa">
                <span className="font-semibold text-text-1">Thời gian</span>
              </Tooltip>
            </div>
            <p className="text-text-2 text-sm">{model.duration}</p>
          </div>
        </div>

        {/* Results & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="font-semibold text-emerald-400">Kết quả nổi bật</span>
            </div>
            <p className="text-text-2 text-sm">{model.results}</p>
          </div>

          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚠️</span>
              <span className="font-semibold text-red-400">Hạn chế chính</span>
            </div>
            <p className="text-text-2 text-sm">{model.limitations}</p>
          </div>
        </div>

        {/* Expand Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-3 bg-surface-2 hover:bg-surface-3 rounded-lg text-text-1 font-medium transition-colors flex items-center justify-center gap-2"
        >
          {showDetails ? 'Thu gọn' : 'Xem chi tiết'}
          <span className={cn('transition-transform', showDetails && 'rotate-180')}>▼</span>
        </button>

        {/* Detailed Content */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-border-1 space-y-4">
            {model.details.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-text-1 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Vietnam Context Box */}
      {/* <div className="mt-6 card bg-gradient-to-r from-primary-900/30 to-accent-900/30 border border-primary-600/30">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🇻🇳</span>
          <div>
            <h5 className="font-semibold text-primary-400 mb-2">Liên hệ Việt Nam</h5>
            <p className="text-text-2 text-sm leading-relaxed">
              Trước 1986, Việt Nam chủ yếu vận dụng mô hình kiểu Liên Xô. Từ khi Đổi mới, 
              Việt Nam đã chuyển sang một mô hình hỗn hợp, tiếp thu có chọn lọc kinh nghiệm từ 
              cả mô hình Liên Xô (ưu tiên phát triển một số ngành công nghiệp nặng then chốt) 
              lẫn mô hình NICs (đẩy mạnh xuất khẩu, thu hút đầu tư nước ngoài, phát triển 
              công nghiệp nhẹ và chế biến), phù hợp với điều kiện và yêu cầu phát triển mới.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  )
}
