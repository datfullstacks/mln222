'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import { cn } from '@/lib/utils'
import type { Room, Choice, GameStats } from '@/lib/game-data'
import { gradeToLabel, gradeToPoints } from '@/lib/game-data'

interface GameUIProps {
  room: Room
  onChoice: (choice: 'A' | 'B' | 'C' | 'D') => void
  isAnimating: boolean
  className?: string
}

export function GameUI({
  room,
  onChoice,
  isAnimating,
  className,
}: GameUIProps) {
  const [hoveredChoice, setHoveredChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null)

  // Memoize impact data to prevent recalculation
  const hoveredImpact = useMemo(() => {
    if (!hoveredChoice) return null
    return room.choices.find(c => c.id === hoveredChoice)?.impact
  }, [hoveredChoice, room.choices])

  // Generic hover handler
  const createHoverHandler = useCallback((choiceId: 'A' | 'B' | 'C' | 'D') => (isHovered: boolean) => {
    setHoveredChoice(isHovered ? choiceId : null)
  }, [])

  // Generic choice handler
  const createChoiceHandler = useCallback((choiceId: 'A' | 'B' | 'C' | 'D') => () => {
    onChoice(choiceId)
  }, [onChoice])

  return (
    <div className={cn(
      'absolute inset-0 flex flex-col justify-end pointer-events-none',
      className
    )}>
      {/* Bottom panel - Question & Choices */}
      <div className="p-6 pointer-events-auto">
        <div className="bg-surface-1/95 backdrop-blur-md border border-border-1 rounded-2xl p-6 max-w-2xl mx-auto">
          {/* Question */}
          <h3 className="text-text-1 font-semibold text-lg mb-6 text-center">
            {room.question}
          </h3>

          {/* Choices - 2x2 grid for 4 options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {room.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                onClick={createChoiceHandler(choice.id)}
                disabled={isAnimating}
                onHover={createHoverHandler(choice.id)}
                isHovered={hoveredChoice === choice.id}
              />
            ))}
          </div>

          {/* Impact preview - simplified, no heavy animations */}
          <div className={cn(
            'mt-4 p-3 rounded-xl bg-surface-2/50 border border-border-1 transition-opacity duration-150',
            hoveredImpact ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}>
            <p className="text-xs text-text-3 mb-2">Tác động dự kiến:</p>
            <div className="flex items-center justify-center gap-4">
              <ImpactItem stat="economy" value={hoveredImpact?.economy || 0} />
              <ImpactItem stat="equality" value={hoveredImpact?.equality || 0} />
              <ImpactItem stat="technology" value={hoveredImpact?.technology || 0} />
              <ImpactItem stat="humanity" value={hoveredImpact?.humanity || 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Memoized impact item to prevent re-renders
const ImpactItem = memo(function ImpactItem({ stat, value }: { stat: string; value: number }) {
  const icon = stat === 'economy' ? '📈' : stat === 'equality' ? '⚖️' : stat === 'technology' ? '🔧' : '❤️'
  const label = stat === 'economy' ? 'Kinh tế' : stat === 'equality' ? 'Công bằng' : stat === 'technology' ? 'Công nghệ' : 'Nhân văn'
  
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm">{icon}</span>
      <span className="text-xs text-text-3">{label}</span>
      <span className={cn(
        'text-sm font-bold tabular-nums',
        value > 0 ? 'text-emerald-400' : value < 0 ? 'text-red-400' : 'text-text-3'
      )}>
        {value > 0 ? '+' : ''}{value * 10}%
      </span>
    </div>
  )
})

interface ChoiceButtonProps {
  choice: Choice
  onClick: () => void
  disabled: boolean
  onHover: (isHovered: boolean) => void
  isHovered: boolean
}

// Memoized choice button to prevent unnecessary re-renders
const ChoiceButton = memo(function ChoiceButton({ 
  choice, 
  onClick, 
  disabled, 
  onHover, 
  isHovered 
}: ChoiceButtonProps) {
  // Color scheme for each choice
  const colorScheme = {
    A: { border: 'border-primary-500', bg: 'bg-primary-500', ring: 'ring-primary-500', text: 'text-primary-400' },
    B: { border: 'border-rupture-500', bg: 'bg-rupture-500', ring: 'ring-rupture-500', text: 'text-rupture-400' },
    C: { border: 'border-system-500', bg: 'bg-system-500', ring: 'ring-system-500', text: 'text-system-400' },
    D: { border: 'border-amber-500', bg: 'bg-amber-500', ring: 'ring-amber-500', text: 'text-amber-400' },
  }
  const colors = colorScheme[choice.id]
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        'group relative overflow-hidden rounded-xl p-3 text-left',
        'bg-surface-2 border-2',
        'transition-[border-color,background-color] duration-150',
        `${colors.border}/30 hover:${colors.border} hover:${colors.bg}/10`,
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-0',
        `focus:${colors.ring}`,
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        willChange: 'transform',
        borderColor: isHovered ? undefined : `var(--${choice.id === 'A' ? 'primary' : choice.id === 'B' ? 'rupture' : choice.id === 'C' ? 'system' : 'amber'}-500)30`,
      }}
    >
      {/* Choice indicator */}
      <div className={cn(
        'absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white',
        choice.id === 'A' ? 'bg-primary-600' : 
        choice.id === 'B' ? 'bg-rupture-600' : 
        choice.id === 'C' ? 'bg-system-600' : 'bg-amber-600'
      )}>
        {choice.id}
      </div>

      {/* Short text */}
      <p className={cn(
        'font-semibold text-text-1 text-sm pr-10 mb-1 mt-1',
        isHovered && colors.text
      )}>
        {choice.shortText}
      </p>

      {/* Full text - truncated for space */}
      <p className="text-xs text-text-2 leading-relaxed pr-8 line-clamp-2">
        {choice.text}
      </p>
    </button>
  )
})

// Consequence Modal
interface ConsequenceModalProps {
  choice: Choice
  onContinue: () => void
  isLastRoom: boolean
  stats?: GameStats
  roomBonusPoints?: number
  correctAnswer?: 'A' | 'B' | 'C' | 'D'
  answerExplanation?: string
}

export function ConsequenceModal({
  choice,
  onContinue,
  isLastRoom,
  stats,
  roomBonusPoints = 50,
  correctAnswer,
  answerExplanation,
}: ConsequenceModalProps) {
  // Color scheme for each choice
  const colorScheme = {
    A: { bg: 'bg-primary-600/20', text: 'text-primary-400', solid: 'bg-primary-600' },
    B: { bg: 'bg-rupture-600/20', text: 'text-rupture-400', solid: 'bg-rupture-600' },
    C: { bg: 'bg-system-600/20', text: 'text-system-400', solid: 'bg-system-600' },
    D: { bg: 'bg-amber-600/20', text: 'text-amber-400', solid: 'bg-amber-600' },
  }
  const colors = colorScheme[choice.id]
  
  // Dùng grade system mới
  const gradeInfo = gradeToLabel(choice.grade)
  const isBest = choice.grade === 'best'
  const isGood = choice.grade === 'good'
  const isFair = choice.grade === 'fair'
  const isPoor = choice.grade === 'poor'
  
  // Background colors based on grade
  const gradeBgColor = isBest ? 'bg-emerald-500/20 border-emerald-500/50' :
                        isGood ? 'bg-blue-500/20 border-blue-500/50' :
                        isFair ? 'bg-amber-500/20 border-amber-500/50' :
                                 'bg-red-500/20 border-red-500/50'
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-0/80 backdrop-blur-sm z-50 animate-in fade-in duration-300">
      <div className="bg-surface-1 border border-border-1 rounded-2xl p-8 max-w-lg mx-4 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Grade Banner - Spectrum system */}
        <div className={cn(
          'rounded-xl p-4 mb-4 text-center border-2',
          gradeBgColor
        )}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{gradeInfo.emoji}</span>
            <div>
              <p className={cn(
                'text-xl font-black',
                gradeInfo.color
              )}>
                {gradeInfo.text.toUpperCase()}
              </p>
              <p className="text-xs text-text-3 mt-1">
                +{gradeToPoints(choice.grade)} điểm
              </p>
            </div>
          </div>
          {/* Giải thích nếu không phải best */}
          {!isBest && answerExplanation && (
            <div className="mt-3 p-3 rounded-lg bg-surface-2/50 text-left">
              <p className="text-xs text-text-3 uppercase tracking-wider mb-1">Đáp án tốt nhất: {correctAnswer}</p>
              <p className="text-sm text-text-2">{answerExplanation}</p>
            </div>
          )}
          {/* Giải thích khi đúng */}
          {isBest && answerExplanation && (
            <p className="mt-2 text-sm text-emerald-300/80 italic">{answerExplanation}</p>
          )}
        </div>
        
        {/* Điểm được ẨN - chỉ hiển thị ở màn hình kết thúc để tăng tính bất ngờ */}
        
        {/* Choice badge */}
        <div className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
          colors.bg
        )}>
          <span className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white',
            colors.solid
          )}>
            {choice.id}
          </span>
          <span className={cn(
            'font-medium',
            colors.text
          )}>
            {choice.shortText}
          </span>
        </div>

        {/* Consequence */}
        <h3 className="text-text-1 font-semibold text-xl mb-3 flex items-center gap-2">
          <span>⚡</span> Hệ quả
        </h3>
        <p className="text-text-2 leading-relaxed mb-6">
          {choice.consequence}
        </p>

        {/* Stats impact */}
        <div className="p-4 rounded-xl bg-surface-2/50 border border-border-1 mb-6">
          <p className="text-xs text-text-3 mb-3 uppercase tracking-wider">Tác động đến thế giới của bạn</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(choice.impact).map(([stat, value]) => (
              <div key={stat} className="flex items-center gap-2">
                <span className="text-lg">
                  {stat === 'economy' ? '📈' : stat === 'equality' ? '⚖️' : stat === 'technology' ? '🔧' : '❤️'}
                </span>
                <div className="flex-1">
                  <p className="text-xs text-text-3">
                    {stat === 'economy' ? 'Kinh tế' : stat === 'equality' ? 'Công bằng' : stat === 'technology' ? 'Công nghệ' : 'Nhân văn'}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          value > 0 ? 'bg-emerald-500' : value < 0 ? 'bg-red-500' : 'bg-gray-500'
                        )}
                        style={{ width: `${Math.abs(value) * 25}%` }}
                      />
                    </div>
                    <span className={cn(
                      'text-sm font-bold tabular-nums min-w-[3rem] text-right',
                      value > 0 ? 'text-emerald-400' : value < 0 ? 'text-red-400' : 'text-text-3'
                    )}>
                      {value > 0 ? '+' : ''}{value * 10}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className={cn(
            'w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-lg',
            'bg-gradient-to-r from-primary-600 to-primary-500 text-white',
            'hover:from-primary-500 hover:to-primary-400 hover:shadow-lg hover:shadow-primary-500/30',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface-1',
            'active:scale-[0.98]'
          )}
        >
          {isLastRoom ? '🎯 Xem kết quả cuối cùng' : '→ Tiếp tục hành trình'}
        </button>
      </div>
    </div>
  )
}
