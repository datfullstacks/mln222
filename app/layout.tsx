import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from '@/components/templates/MainLayout'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: {
    default: 'Đứt gãy Công nghệ | Phân tích Mác-Lênin',
    template: '%s | Đứt gãy Công nghệ',
  },
  description:
    'Phân tích mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất trong kỷ nguyên số từ góc nhìn kinh tế–chính trị Mác–Lênin.',
  keywords: [
    'đứt gãy công nghệ',
    'Mác Lênin',
    'kinh tế chính trị',
    'lực lượng sản xuất',
    'quan hệ sản xuất',
    'chip war',
    'platform economy',
  ],
  authors: [{ name: 'dathtfe' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Đứt gãy Công nghệ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
