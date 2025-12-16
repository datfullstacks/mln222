'use client'

import { useRef, useEffect, useState, memo, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface Room3DSceneProps {
  roomIndex: number
  ambientColor: string
  isTransitioning: boolean
  onTransitionComplete?: () => void
  className?: string
}

// Parse hex color to RGB - memoize outside component
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 79, g: 70, b: 229 }
}

export const Room3DScene = memo(function Room3DScene({
  roomIndex,
  ambientColor,
  isTransitioning,
  onTransitionComplete,
  className,
}: Room3DSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const transitionRef = useRef(0)
  const onTransitionCompleteRef = useRef(onTransitionComplete)

  // Keep callback ref updated
  useEffect(() => {
    onTransitionCompleteRef.current = onTransitionComplete
  }, [onTransitionComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Set canvas size - use lower resolution for better performance
    const dpr = Math.min(window.devicePixelRatio, 2)
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const rgb = hexToRgb(ambientColor)
    let lastFrameTime = 0
    const targetFPS = 30 // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS

    // Pre-calculate particle positions
    const particleCount = 15 // Reduced from 30
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      speedX: 0.3 + Math.random() * 0.2,
      speedY: 0.2 + Math.random() * 0.3,
      offset: i * 0.5,
    }))

    const draw = (timestamp: number) => {
      // Throttle frame rate
      const elapsed = timestamp - lastFrameTime
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = timestamp - (elapsed % frameInterval)

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      // Clear with solid color
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, width, height)

      // Handle transition
      if (isTransitioning) {
        transitionRef.current += 0.03
        if (transitionRef.current >= 1) {
          transitionRef.current = 0
          onTransitionCompleteRef.current?.()
        }
      }

      const centerX = width / 2
      const centerY = height / 2

      // Simplified floor grid - fewer lines
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`
      ctx.lineWidth = 1
      ctx.beginPath()

      // Horizontal lines
      for (let i = 0; i < 10; i++) {
        const y = centerY + (i * 40)
        const factor = 1 - (i / 15)
        ctx.moveTo(centerX - (width * 0.4 * factor), y)
        ctx.lineTo(centerX + (width * 0.4 * factor), y)
      }

      // Vertical lines
      for (let i = -5; i <= 5; i++) {
        ctx.moveTo(centerX + i * 15, centerY)
        ctx.lineTo(centerX + i * 50, height)
      }
      ctx.stroke()

      // Wall outlines only
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`
      ctx.lineWidth = 2
      ctx.beginPath()
      // Left
      ctx.moveTo(0, 0)
      ctx.lineTo(centerX * 0.3, centerY * 0.3)
      ctx.lineTo(centerX * 0.3, height - centerY * 0.3)
      ctx.lineTo(0, height)
      // Right
      ctx.moveTo(width, 0)
      ctx.lineTo(width - centerX * 0.3, centerY * 0.3)
      ctx.lineTo(width - centerX * 0.3, height - centerY * 0.3)
      ctx.lineTo(width, height)
      ctx.stroke()

      // Door
      const doorW = 120
      const doorH = 180
      const doorX = centerX - doorW / 2
      const doorY = centerY - doorH / 2 - 20

      // Simple door glow
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`
      ctx.fillRect(doorX - 30, doorY - 30, doorW + 60, doorH + 60)

      // Door frame
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`
      ctx.lineWidth = 3
      ctx.strokeRect(doorX, doorY, doorW, doorH)
      
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`
      ctx.fillRect(doorX + 3, doorY + 3, doorW - 6, doorH - 6)

      // Room number
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`
      ctx.font = 'bold 48px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`0${roomIndex + 1}`, centerX, doorY - 30)

      // Simplified particles
      const time = timeRef.current
      ctx.beginPath()
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        const px = (Math.sin(time * p.speedX + p.offset) * 0.5 + 0.5) * width
        const py = (Math.cos(time * p.speedY + p.offset) * 0.5 + 0.5) * height
        ctx.moveTo(px + 2, py)
        ctx.arc(px, py, 2, 0, Math.PI * 2)
      }
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`
      ctx.fill()

      // Transition overlay
      if (isTransitioning && transitionRef.current > 0) {
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transitionRef.current})`
        ctx.fillRect(0, 0, width, height)
      }

      timeRef.current += 0.02
      animationRef.current = requestAnimationFrame(draw)
    }

    setIsLoaded(true)
    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [roomIndex, ambientColor, isTransitioning])

  return (
    <div className={cn('relative w-full h-full', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-0">
          <div className="text-primary-400 animate-pulse">Đang tải...</div>
        </div>
      )}
    </div>
  )
})
