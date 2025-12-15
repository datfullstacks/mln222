'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Badge } from '../atoms/Badge'

interface Article {
  id: string
  title: string
  author: string
  date: string
  readTime: string
  excerpt: string
  quote?: {
    text: string
    source: string
  }
  content: {
    type: 'text' | 'image' | 'heading'
    value: string
    caption?: string
  }[]
  conclusion?: string
}

const articlesData: Article[] = [
  {
    id: 'vietnam-tech-gap',
    title: 'Thực trạng đứt gãy công nghệ tại Việt Nam',
    author: 'Ban Biên tập',
    date: '15 Tháng 12, 2024',
    readTime: '5 phút đọc',
    excerpt: 'Trong bối cảnh đứt gãy công nghệ toàn cầu và Cách mạng công nghiệp 4.0, quá trình công nghiệp hóa ở Việt Nam đang chịu tác động mạnh mẽ.',
    quote: {
      text: 'Trong khi thế giới đang tiến vào cuộc CMCN lần thứ tư thì Việt Nam vẫn đang ở giai đoạn tương ứng với trình độ cuộc CMCN lần thứ hai',
      source: 'Các chuyên gia kinh tế',
    },
    content: [
      {
        type: 'text',
        value: 'Nền kinh tế Việt Nam hiện còn thâm dụng lao động giản đơn, công nghệ đa phần nhập khẩu, và chủ yếu tham gia các khâu gia công, lắp ráp có giá trị gia tăng thấp. Đây là thực trạng đang đặt ra nhiều thách thức cho quá trình phát triển bền vững của đất nước.',
      },
      {
        type: 'image',
        value: '/images/cmcn4-vietnam.jpg',
        caption: 'Ảnh 1: Ứng dụng các thành tựu của cuộc Cách mạng công nghiệp lần thứ tư trong lĩnh vực công nghiệp chế tạo',
      },
      {
        type: 'heading',
        value: 'Thách thức từ tự động hóa',
      },
      {
        type: 'text',
        value: 'Khi tự động hóa và robot phát triển nhanh, lợi thế lao động giá rẻ dần suy giảm, khiến nhiều ngành sản xuất truyền thống đối mặt nguy cơ mất cạnh tranh. Nếu chậm chuyển đổi, Việt Nam có nguy cơ tụt hậu xa hơn, gia tăng phụ thuộc vào công nghệ nhập khẩu.',
      },
      {
        type: 'image',
        value: '/images/assembly-vietnam.jpg',
        caption: 'Ảnh 2: Công nghiệp lắp ráp sản xuất tại Việt Nam',
      },
    ],
    conclusion: 'Đứt gãy công nghệ vừa là rủi ro vừa là cơ hội. Để biến rủi ro thành động lực, yêu cầu khách quan là phải thực hiện một chiến lược tích hợp: nâng cao năng lực công nghệ — con người — thể chế — hạ tầng — tài chính.',
  },
  {
    id: 'vietnam-opportunity',
    title: 'Cơ hội công nghiệp hóa trong kỷ nguyên số',
    author: 'Ban Biên tập',
    date: '15 Tháng 12, 2024',
    readTime: '4 phút đọc',
    excerpt: 'Đứt gãy công nghệ làm gia tăng sự phân hóa, nhưng cũng mở ra cơ hội để Việt Nam đi tắt đón đầu trong kỷ nguyên số.',
    quote: {
      text: 'Gắn công nghiệp hóa với đổi mới sáng tạo, chuyển đổi số và phát triển bền vững là con đường tất yếu',
      source: 'Định hướng chiến lược quốc gia',
    },
    content: [
      {
        type: 'heading',
        value: 'Cơ hội trong thách thức',
      },
      {
        type: 'text',
        value: 'Đứt gãy công nghệ làm gia tăng sự phân hóa giữa các ngành, khu vực và nhóm lao động. Tuy nhiên, đây cũng là cơ hội để Việt Nam đi tắt đón đầu, phát triển kinh tế số, công nghiệp xanh và các ngành dựa trên tri thức.',
      },
      {
        type: 'image',
        value: '/images/digital-vietnam.jpg',
        caption: 'Ảnh: Chuyển đổi số tại Việt Nam',
      },
      {
        type: 'heading',
        value: 'Hướng đi chiến lược',
      },
      {
        type: 'text',
        value: 'Gắn công nghiệp hóa với đổi mới sáng tạo, chuyển đổi số và phát triển bền vững là con đường tất yếu để Việt Nam nâng cao năng lực cạnh tranh, tận dụng cơ hội từ công nghệ và phát triển lâu dài trong kỷ nguyên số.',
      },
      {
        type: 'text',
        value: 'Các ưu tiên chiến lược bao gồm: đầu tư mạnh vào giáo dục STEM, xây dựng hệ sinh thái khởi nghiệp công nghệ, thu hút FDI chất lượng cao vào các ngành công nghệ cao, và phát triển hạ tầng số quốc gia.',
      },
    ],
    conclusion: 'Đảm bảo chuyển đổi là công bằng và thân thiện với môi trường, không để ai bị bỏ lại phía sau trong cuộc cách mạng công nghệ.',
  },
]

export function VietnamTechArticles() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const toggleArticle = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id)
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <h3 className="heading-3 text-center mb-4 text-primary-400">
        ĐỨT GÃY CÔNG NGHỆ VÀ CÁCH MẠNG CÔNG NGHIỆP TẠI VIỆT NAM
      </h3>
      <p className="text-center text-text-2 mb-8 max-w-3xl mx-auto">
        Trong bối cảnh đứt gãy công nghệ toàn cầu và Cách mạng công nghiệp 4.0, 
        quá trình công nghiệp hóa ở Việt Nam đang chịu tác động mạnh mẽ.
      </p>

      {/* Article Cards - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {articlesData.map((article) => (
          <button
            key={article.id}
            onClick={() => toggleArticle(article.id)}
            className={cn(
              'card text-left transition-all duration-300 cursor-pointer group',
              'hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10',
              expandedArticle === article.id && 'ring-2 ring-primary-400 border-primary-500'
            )}
          >
            {/* Article Header */}
            <div className="flex items-center gap-2 text-xs text-text-3 mb-3">
              <span>📰</span>
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            {/* Title */}
            <h4 className="heading-4 text-text-1 mb-3 group-hover:text-primary-400 transition-colors">
              {article.title}
            </h4>

            {/* Excerpt */}
            <p className="text-text-2 text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Quote Preview */}
            {article.quote && (
              <blockquote className="border-l-4 border-primary-500 pl-4 py-2 bg-surface-2 rounded-r-lg mb-4">
                <p className="text-text-1 text-sm italic line-clamp-2">
                  &ldquo;{article.quote.text}&rdquo;
                </p>
                <footer className="text-text-3 text-xs mt-1">
                  — {article.quote.source}
                </footer>
              </blockquote>
            )}

            {/* Read More */}
            <div className="flex items-center justify-between">
              <span className="text-primary-400 text-sm font-medium">
                {expandedArticle === article.id ? 'Thu gọn ↑' : 'Đọc tiếp ↓'}
              </span>
              <Badge variant={expandedArticle === article.id ? 'primary' : 'system'}>
                {expandedArticle === article.id ? 'Đang xem' : 'Bài viết'}
              </Badge>
            </div>
          </button>
        ))}
      </div>

      {/* Expanded Article Content */}
      {expandedArticle && (
        <div className="card bg-surface-1 border border-border-1 animate-in slide-in-from-top-4 duration-300">
          {(() => {
            const article = articlesData.find((a) => a.id === expandedArticle)!
            return (
              <>
                {/* Article Header */}
                <div className="border-b border-border-1 pb-6 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-3 mb-3">
                    <Badge variant="primary">🇻🇳 Việt Nam</Badge>
                    <span>•</span>
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <h4 className="heading-3 text-primary-400 mb-4">{article.title}</h4>
                  
                  {/* Quote */}
                  {article.quote && (
                    <blockquote className="border-l-4 border-accent-500 pl-6 py-4 bg-accent-900/20 rounded-r-lg">
                      <p className="text-text-1 text-lg italic mb-2">
                        &ldquo;{article.quote.text}&rdquo;
                      </p>
                      <footer className="text-accent-400 text-sm">
                        — {article.quote.source}
                      </footer>
                    </blockquote>
                  )}
                </div>

                {/* Article Content */}
                <div className="space-y-6">
                  {article.content.map((block, index) => {
                    if (block.type === 'heading') {
                      return (
                        <h5 key={index} className="heading-4 text-text-1 mt-8">
                          {block.value}
                        </h5>
                      )
                    }
                    if (block.type === 'image') {
                      return (
                        <figure key={index} className="my-6">
                          <div className="relative aspect-[16/9] bg-surface-2 rounded-lg overflow-hidden flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-5xl block mb-3">🏭</span>
                              <span className="text-text-3 text-sm">Hình minh họa</span>
                            </div>
                          </div>
                          {block.caption && (
                            <figcaption className="text-center text-text-3 text-sm mt-3 italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      )
                    }
                    return (
                      <p key={index} className="text-text-1 leading-relaxed">
                        {block.value}
                      </p>
                    )
                  })}
                </div>

                {/* Conclusion */}
                {article.conclusion && (
                  <div className="mt-8 pt-6 border-t border-border-1">
                    <div className="bg-gradient-to-r from-primary-900/30 to-accent-900/30 border border-primary-500/30 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl">📌</span>
                        <div>
                          <h5 className="font-semibold text-primary-400 mb-2">Kết luận</h5>
                          <p className="text-text-1 leading-relaxed">
                            {article.conclusion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setExpandedArticle(null)}
                    className="px-6 py-2 bg-surface-2 hover:bg-surface-3 rounded-lg text-text-1 font-medium transition-colors"
                  >
                    Thu gọn bài viết ↑
                  </button>
                </div>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
