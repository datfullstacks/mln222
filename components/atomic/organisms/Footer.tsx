import Link from 'next/link'
import { Divider } from '../atoms/Divider'
import { cn } from '@/lib/utils'

const footerLinks = [
  {
    title: 'Khám phá',
    links: [
      { label: 'Game', href: '/game' },
      { label: 'AI Usage', href: '/ai-usage' },
    ],
  },
  {
    title: 'Thông tin',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Liên hệ', href: '/about#contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-surface-1 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-3">
              ĐỨT GÃY CÔNG NGHỆ
            </h3>
            <p className="text-text-2 text-sm max-w-xs">
              Phân tích mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất 
              trong kỷ nguyên số từ góc nhìn kinh tế–chính trị Mác–Lênin.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-text-1 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-2 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-2">
          <p>© 2024 Đứt gãy Công nghệ. Nội dung theo giấy phép CC BY-NC-SA 4.0</p>
          <p>
            Xây dựng bằng{' '}
            <span className="text-primary-400">Next.js</span> +{' '}
            <span className="text-primary-400">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
