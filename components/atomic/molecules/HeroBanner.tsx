import { cn } from '@/lib/utils'
import Image from 'next/image'

interface HeroBannerProps {
  badge?: string
  title: string
  subtitle?: string
  backgroundImage?: string
  className?: string
}

export function HeroBanner({
  badge,
  title,
  subtitle,
  backgroundImage,
  className,
}: HeroBannerProps) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl mb-12',
      className
    )}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-surface-2 to-rupture-900">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-30 mix-blend-overlay"
          />
        )}
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center py-16 md:py-24 px-6">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/30 border border-primary-500/30 mb-6 backdrop-blur-sm">
            <span className="text-primary-300 text-sm font-medium">{badge}</span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl text-text-2 max-w-2xl mx-auto italic">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
