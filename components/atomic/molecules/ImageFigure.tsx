'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface ImageFigureProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'video' | 'square' | 'portrait'
  fallbackIcon?: string
  fallbackText?: string
  className?: string
}

export function ImageFigure({
  src,
  alt,
  caption,
  aspectRatio = 'video',
  fallbackIcon = '🏭',
  fallbackText = 'Hình minh họa',
  className,
}: ImageFigureProps) {
  const [hasError, setHasError] = useState(false)

  const aspectRatios = {
    video: 'aspect-[4/3]',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  }

  return (
    <figure className={cn('group', className)}>
      <div className={cn(
        'relative bg-surface-2 rounded-xl overflow-hidden shadow-lg',
        aspectRatios[aspectRatio]
      )}>
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-text-3">
            <span className="text-5xl mb-3">{fallbackIcon}</span>
            <span className="text-sm">{fallbackText}</span>
          </div>
        ) : (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setHasError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-text-2 text-sm mt-3 px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
