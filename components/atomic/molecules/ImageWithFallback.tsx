'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackIcon: string
  fallbackText: string
  className?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackIcon,
  fallbackText,
  className = '',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center text-text-3 w-full h-full">
        <span className="text-4xl mb-2">{fallbackIcon}</span>
        <span className="text-sm">{fallbackText}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
    //   onError={() => setHasError(true)}
    />
  )
}
