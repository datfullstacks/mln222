'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Badge } from '../atoms/Badge'

interface ImpactItem {
  positive: string[]
  negative: string[]
}

interface SubjectData {
  id: string
  label: string
  icon: string
  shortDesc: string
  color: string
  bgGradient: string
  impacts: ImpactItem
}

const subjectsData: SubjectData[] = [
  {
    id: 'nation',
    label: 'Quốc gia',
    icon: '🌍',
    shortDesc: 'Năng lực cạnh tranh & thể chế',
    color: 'bg-blue-600',
    bgGradient: 'from-blue-900/50',
    impacts: {
      positive: [
        '<strong class="text-emerald-400">Thúc đẩy lực lượng sản xuất:</strong> năng suất lao động tăng, cơ cấu kinh tế chuyển dịch theo hướng hiện đại.',
        '<strong class="text-emerald-400">Tăng năng lực cạnh tranh & hội nhập:</strong> tham gia chuỗi giá trị tốt hơn nếu làm chủ công nghệ.',
        '<strong class="text-emerald-400">Đổi mới quản trị phát triển:</strong> hình thành chính phủ điện tử, quản trị dựa trên dữ liệu.',
      ],
      negative: [
        '<strong class="text-red-400">Đứt gãy công nghệ giữa các quốc gia:</strong> nước đi sau dễ tụt lại vì công nghệ thay đổi "nhảy vọt".',
        '<strong class="text-red-400">Phụ thuộc công nghệ:</strong> nếu chủ yếu nhập máy móc/giải pháp mà không làm chủ lõi → lệ thuộc.',
        '<strong class="text-red-400">Áp lực điều chỉnh thể chế:</strong> luật, chính sách, quản trị không theo kịp công nghệ → tạo "điểm nghẽn" phát triển.',
      ],
    },
  },
  {
    id: 'enterprise',
    label: 'Doanh nghiệp',
    icon: '🏢',
    shortDesc: 'Năng suất & mô hình kinh doanh',
    color: 'bg-purple-600',
    bgGradient: 'from-purple-900/50',
    impacts: {
      positive: [
        '<strong class="text-emerald-400">Tăng năng suất, giảm chi phí</strong> nhờ tự động hóa, số hóa, quản trị thông minh.',
        '<strong class="text-emerald-400">Tạo mô hình kinh doanh mới:</strong> thương mại điện tử, nền tảng số, sản xuất thông minh.',
        '<strong class="text-emerald-400">Nâng chất lượng sản phẩm</strong> và chuẩn hóa theo thị trường quốc tế.',
      ],
      negative: [
        '<strong class="text-red-400">Khoảng cách lớn–nhỏ nới rộng:</strong> doanh nghiệp lớn có vốn – dữ liệu – nhân lực dễ chuyển đổi; SME dễ bị loại khỏi thị trường.',
        '<strong class="text-red-400">Rủi ro mất việc</strong> trong doanh nghiệp truyền thống do thay máy móc/AI.',
        '<strong class="text-red-400">Rủi ro an ninh dữ liệu/công nghệ</strong> (đặc biệt khi phụ thuộc nhà cung cấp nền tảng).',
      ],
    },
  },
  {
    id: 'region',
    label: 'Khu vực',
    icon: '🏙️',
    shortDesc: 'Đô thị – Nông thôn',
    color: 'bg-teal-600',
    bgGradient: 'from-teal-900/50',
    impacts: {
      positive: [
        '<strong class="text-emerald-400">Mở rộng tiếp cận dịch vụ:</strong> giáo dục online, y tế từ xa, thương mại điện tử, thanh toán số.',
        '<strong class="text-emerald-400">Tạo cơ hội phát triển "vượt bậc"</strong> nếu có hạ tầng số và kỹ năng.',
      ],
      negative: [
        '<strong class="text-red-400">Khoảng cách số:</strong> nơi thiếu hạ tầng internet, thiết bị, kỹ năng → bị bỏ lại phía sau.',
        '<strong class="text-red-400">Dịch chuyển lao động:</strong> vùng chậm đổi mới dễ mất cơ hội việc làm, tăng chênh lệch thu nhập.',
      ],
    },
  },
  {
    id: 'worker',
    label: 'Người lao động',
    icon: '👷',
    shortDesc: 'Việc làm & kỹ năng',
    color: 'bg-orange-600',
    bgGradient: 'from-orange-900/50',
    impacts: {
      positive: [
        '<strong class="text-emerald-400">Tạo nghề mới và việc làm mới</strong> (CNTT, dữ liệu, tự động hóa, vận hành hệ thống thông minh…).',
        '<strong class="text-emerald-400">Tăng cơ hội nâng kỹ năng</strong> – tăng thu nhập cho lao động có trình độ.',
        '<strong class="text-emerald-400">Môi trường làm việc an toàn hơn</strong> ở một số ngành (robot thay việc nặng/độc hại).',
      ],
      negative: [
        '<strong class="text-red-400">Phân hóa lao động:</strong> lao động giản đơn dễ bị thay thế; lao động kỹ năng cao hưởng lợi nhiều hơn.',
        '<strong class="text-red-400">Áp lực học lại liên tục</strong> (reskill/upskill); ai không theo kịp dễ thất nghiệp hoặc làm việc bấp bênh.',
        '<strong class="text-red-400">Nguy cơ "mắc kẹt"</strong> trong công việc giá rẻ nếu chỉ làm khâu gia công, không lên được khâu giá trị cao.',
      ],
    },
  },
]

export function TechDisruptionExplainer() {
  const [activeSubject, setActiveSubject] = useState('nation')
  const subject = subjectsData.find((s) => s.id === activeSubject)!

  return (
    <div className="mb-8">
      {/* Header */}
      <h3 className="heading-3 text-center mb-4 text-accent-400">
        ĐỨT GÃY CÔNG NGHỆ LÀ GÌ?
      </h3>

      {/* Definition Box */}
      <div className="card bg-gradient-to-r from-accent-900/30 to-primary-900/30 border border-accent-600/30 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">⚡</span>
          <div>
            <p className="text-text-1 leading-relaxed mb-4">
              <strong className="text-accent-400">Đứt gãy công nghệ</strong> là tình trạng{' '}
              <em>chênh lệch và/hoặc gián đoạn</em> khả năng tiếp cận – ứng dụng – làm chủ công nghệ 
              giữa các chủ thể (quốc gia, doanh nghiệp, khu vực đô thị–nông thôn, và nhóm lao động), 
              do tốc độ phát triển công nghệ (đặc biệt CMCN 4.0) diễn ra rất nhanh, khiến một bộ phận không theo kịp.
            </p>
            <div className="bg-surface-2 rounded-lg p-4 border-l-4 border-l-primary-500">
              <p className="text-text-2 text-sm">
                <span className="text-primary-400 font-semibold">Góc nhìn Mác–Lênin:</span> Đây là biểu hiện của 
                mâu thuẫn giữa trình độ phát triển của <strong className="text-text-1">lực lượng sản xuất</strong> (khoa học–công nghệ, 
                máy móc, dữ liệu…) với khả năng/điều kiện tiếp nhận của <strong className="text-text-1">quan hệ sản xuất</strong>, 
                thể chế, nguồn lực và con người.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-sided Impact Section */}
      <h4 className="heading-4 text-center mb-6 text-text-1">
        Tác động hai mặt của tiến bộ công nghệ (CMCN 4.0)
      </h4>

      {/* Subject Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {subjectsData.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSubject(s.id)}
            className={cn(
              'card text-center transition-all duration-300 cursor-pointer py-4',
              'bg-gradient-to-b to-surface-1',
              s.bgGradient,
              activeSubject === s.id
                ? 'ring-2 ring-accent-400 scale-[1.02]'
                : 'hover:scale-[1.01] opacity-80 hover:opacity-100'
            )}
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div
              className={cn(
                'text-white font-bold py-1.5 px-3 rounded-lg mb-1 text-sm',
                s.color
              )}
            >
              {s.label}
            </div>
            <p className="text-text-3 text-xs">{s.shortDesc}</p>
          </button>
        ))}
      </div>

      {/* Impact Content */}
      <div className="card bg-surface-1 border border-border-1">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{subject.icon}</span>
          <div>
            <h5 className="heading-4 text-text-1">{subject.label}</h5>
            <p className="text-text-3 text-sm">{subject.shortDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Positive Impacts */}
          <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✅</span>
              <Badge variant="primary">Mặt tích cực</Badge>
            </div>
            <ul className="space-y-3">
              {subject.impacts.positive.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-emerald-400 mt-0.5">+</span>
                  <span className="text-text-2" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Negative Impacts */}
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⚠️</span>
              <Badge variant="rupture">Mặt tiêu cực</Badge>
            </div>
            <ul className="space-y-3">
              {subject.impacts.negative.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-red-400 mt-0.5">−</span>
                  <span className="text-text-2" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Insight */}
      <div className="mt-6 card bg-surface-2 border border-border-1">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h5 className="font-semibold text-primary-400 mb-2">Nhận định tổng hợp</h5>
            <p className="text-text-2 text-sm leading-relaxed">
              Tiến bộ công nghệ mang lại cơ hội lớn nhưng cũng tạo ra <strong className="text-text-1">sự phân hóa</strong> sâu sắc. 
              Những chủ thể có khả năng <em>tiếp cận, học hỏi và làm chủ công nghệ</em> sẽ hưởng lợi nhiều; 
              ngược lại, những chủ thể thiếu nguồn lực, kỹ năng hoặc thể chế phù hợp sẽ ngày càng bị bỏ lại phía sau. 
              Đây chính là bản chất của <strong className="text-accent-400">"đứt gãy công nghệ"</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-6 card bg-gradient-to-r from-primary-900/40 via-accent-900/30 to-primary-900/40 border-2 border-primary-500/50">
        <div className="text-center mb-6">
          <Badge variant="primary" className="mb-3">KẾT LUẬN</Badge>
          <h4 className="heading-4 text-primary-400">Hướng đi cho công nghiệp hóa thời đại mới</h4>
        </div>

        <div className="space-y-4">
          {/* Point 1 */}
          <div className="flex items-start gap-4 bg-surface-1/50 rounded-lg p-4">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold shrink-0">
              1
            </div>
            <div>
              <p className="text-text-1 leading-relaxed">
                <strong className="text-primary-400">Tiến bộ công nghệ (CMCN)</strong> thúc đẩy{' '}
                <strong>lực lượng sản xuất</strong> mạnh mẽ → là <em>động lực công nghiệp hóa</em>.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex items-start gap-4 bg-surface-1/50 rounded-lg p-4">
            <div className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center text-white font-bold shrink-0">
              2
            </div>
            <div>
              <p className="text-text-1 leading-relaxed">
                Nhưng nó cũng làm <strong className="text-accent-400">phát sinh mâu thuẫn và đứt gãy</strong> nếu{' '}
                <em>quan hệ sản xuất, thể chế quản trị và chất lượng nguồn nhân lực</em> không kịp điều chỉnh.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-2">
            <span className="text-3xl text-primary-400">⇓</span>
          </div>

          {/* Final Conclusion */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-primary-900/30 border border-emerald-500/50 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-text-1 leading-relaxed text-lg">
                  <strong className="text-emerald-400">Vì vậy</strong>, công nghiệp hóa hiện nay phải gắn với:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-3 text-text-1">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Đổi mới sáng tạo</strong> — làm chủ công nghệ lõi</span>
                  </li>
                  <li className="flex items-center gap-3 text-text-1">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Nâng kỹ năng lao động</strong> — reskill/upskill liên tục</span>
                  </li>
                  <li className="flex items-center gap-3 text-text-1">
                    <span className="text-emerald-400">✓</span>
                    <span><strong>Phát triển bền vững & bao trùm</strong> — không ai bị bỏ lại</span>
                  </li>
                </ul>
                <p className="mt-4 text-accent-400 font-semibold text-center">
                  → Để thu hẹp đứt gãy công nghệ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
