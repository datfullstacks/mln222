'use client'

import { useState, useEffect, memo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { Room } from '@/lib/game-data'

interface TimerProps {
  duration: number // seconds
  onTimeout: () => void
  isPaused?: boolean
  className?: string
}

export const Timer = memo(function Timer({ duration, onTimeout, isPaused = false, className }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const onTimeoutRef = useRef(onTimeout)
  
  // Keep ref updated
  useEffect(() => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeoutRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, timeLeft])

  // Reset when duration changes (new room)
  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  const percentage = (timeLeft / duration) * 100
  const isWarning = timeLeft <= 30
  const isCritical = timeLeft <= 10
  const circumference = 2 * Math.PI * 35

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" style={{ willChange: 'auto' }}>
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-surface-3"
          />
          {/* Progress circle - use CSS custom property for smoother updates */}
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percentage / 100)}
            className={cn(
              isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-primary-500'
            )}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              'text-lg font-bold tabular-nums',
              isCritical ? 'text-red-400 animate-pulse' : isWarning ? 'text-amber-400' : 'text-text-1'
            )}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  )
})

interface DilemmaCardProps {
  room: Room
  className?: string
}

export const DilemmaCard = memo(function DilemmaCard({ room, className }: DilemmaCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl bg-surface-2/80 backdrop-blur-sm border border-border-1',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{room.icon}</span>
        <h3 className="font-bold text-text-1">{room.title}</h3>
      </div>
      
      {/* Dilemma highlight */}
      <div className="mb-3 p-2 rounded-lg bg-rupture-500/10 border border-rupture-500/20">
        <div className="flex items-center gap-2">
          <span className="text-rupture-400">⚡</span>
          <span className="text-sm font-medium text-rupture-300">{room.dilemma}</span>
        </div>
      </div>

      {/* Fun fact */}
      <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
        <p className="text-xs text-primary-300">{room.funFact}</p>
      </div>
    </div>
  )
})

interface ChoiceButtonProps {
  choice: Room['choices'][0]
  onSelect: () => void
  isSelected?: boolean
  isDisabled?: boolean
  variant: 'A' | 'B'
  className?: string
}

export function ChoiceButton({
  choice,
  onSelect,
  isSelected,
  isDisabled,
  variant,
  className,
}: ChoiceButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variantStyles = {
    A: 'border-primary-500/50 hover:border-primary-400 hover:bg-primary-500/10',
    B: 'border-rupture-500/50 hover:border-rupture-400 hover:bg-rupture-500/10',
  }

  const selectedStyles = {
    A: 'border-primary-500 bg-primary-500/20 ring-2 ring-primary-500/50',
    B: 'border-rupture-500 bg-rupture-500/20 ring-2 ring-rupture-500/50',
  }

  return (
    <button
      onClick={onSelect}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative p-4 rounded-xl border-2 text-left transition-all duration-300',
        'bg-surface-2/80 backdrop-blur-sm',
        isSelected ? selectedStyles[variant] : variantStyles[variant],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Choice indicator */}
      <div
        className={cn(
          'absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold',
          variant === 'A' ? 'bg-primary-600' : 'bg-rupture-600'
        )}
      >
        {variant}
      </div>

      {/* Impact preview on hover */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-1 border border-border-1 shadow-lg z-10">
          {Object.entries(choice.impact).map(([stat, value]) => (
            <div key={stat} className="flex items-center gap-1">
              <span className="text-xs">
                {stat === 'economy' ? '📈' : stat === 'equality' ? '⚖️' : stat === 'technology' ? '🔧' : '❤️'}
              </span>
              <span
                className={cn(
                  'text-xs font-bold',
                  value > 0 ? 'text-emerald-400' : value < 0 ? 'text-red-400' : 'text-text-3'
                )}
              >
                {value > 0 ? '+' : ''}{value * 10}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Short text */}
      <div className="flex items-center gap-2 mb-2 pl-6">
        <span className="font-semibold text-text-1">{choice.shortText}</span>
      </div>

      {/* Full text */}
      <p className="text-sm text-text-2 pl-6">{choice.text}</p>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
      )}
    </button>
  )
}

interface RoomTransitionProps {
  fromRoom: number
  toRoom: number
  onComplete: () => void
}

export function RoomTransition({ fromRoom, toRoom, onComplete }: RoomTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-0 z-50">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Spinning portal effect */}
          <div className="absolute inset-0 rounded-full border-4 border-primary-500/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border-4 border-primary-500/50 animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-primary-500/70 animate-reverse-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🚪</span>
          </div>
        </div>
        <p className="text-xl font-bold text-text-1 animate-pulse">
          Đang di chuyển đến phòng {toRoom + 1}...
        </p>
      </div>

      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-reverse-spin {
          animation: reverse-spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

interface AchievementPopupProps {
  title: string
  icon: string
  onClose: () => void
}

export function AchievementPopup({ title, icon, onClose }: AchievementPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-xs font-medium opacity-80">Thành tựu mở khóa!</p>
          <p className="font-bold">{title}</p>
        </div>
        <span className="text-2xl">🏆</span>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
          100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
