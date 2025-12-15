import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nền / chữ - sử dụng CSS variables để hỗ trợ theme switching
        'bg-0': 'var(--color-bg-primary)',
        'surface-1': 'var(--color-bg-secondary)',
        'surface-2': 'var(--color-bg-tertiary)',
        'text-1': 'var(--color-text-primary)',
        'text-2': 'var(--color-text-secondary)',
        'text-3': 'var(--color-text-muted)',
        'border-1': 'var(--color-border)',
        
        // Primary (graphite/steel)
        primary: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        
        // Accent cảnh báo (rupture/đứt gãy)
        rupture: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        
        // Critical (mâu thuẫn/bùng nổ)
        critical: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        
        // System (điều tiết/nhà nước)
        system: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        
        // Border (legacy - use border-1 instead)
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E5E7EB',
            a: {
              color: '#60A5FA',
              '&:hover': {
                color: '#3B82F6',
              },
            },
            'h1, h2, h3, h4': {
              color: '#E5E7EB',
            },
            blockquote: {
              borderLeftColor: '#F59E0B',
              color: '#A1A1AA',
            },
            code: {
              color: '#60A5FA',
              backgroundColor: '#1E293B',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
