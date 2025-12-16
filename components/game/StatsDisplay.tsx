'use client'

import { useEffect, useState, memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { GameStats } from '@/lib/game-data'
import { statConfig } from '@/lib/game-data'

interface StatsDisplayProps {
  stats: GameStats
  showLabels?: boolean
  animate?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const StatsDisplay = memo(function StatsDisplay({
  stats,
  showLabels = true,
  animate = true,
  size = 'md',
  className,
}: StatsDisplayProps) {
  const [displayStats, setDisplayStats] = useState<GameStats>(
    animate ? { economy: 50, equality: 50, technology: 50, humanity: 50 } : stats
  )

  useEffect(() => {
    if (!animate) {
      setDisplayStats(stats)
      return
    }

    const duration = 800
    const steps = 20
    const stepDuration = duration / steps
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setDisplayStats({
        economy: Math.round(50 + (stats.economy - 50) * easeOut),
        equality: Math.round(50 + (stats.equality - 50) * easeOut),
        technology: Math.round(50 + (stats.technology - 50) * easeOut),
        humanity: Math.round(50 + (stats.humanity - 50) * easeOut),
      })

      if (step >= steps) {
        clearInterval(interval)
        setDisplayStats(stats)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [stats, animate])

  const sizeConfig = useMemo(() => ({
    sm: { barHeight: 'h-1.5', text: 'text-xs', gap: 'gap-1.5' },
    md: { barHeight: 'h-2', text: 'text-sm', gap: 'gap-2' },
    lg: { barHeight: 'h-3', text: 'text-base', gap: 'gap-3' },
  }), [])

  const getStatColor = (value: number) => {
    if (value >= 70) return 'bg-emerald-500'
    if (value >= 40) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className={cn('space-y-3', className)}>
      {(Object.keys(statConfig) as Array<keyof GameStats>).map((key) => {
        const config = statConfig[key]
        const value = displayStats[key]

        return (
          <div key={key} className={cn('space-y-1', sizeConfig[size].gap)}>
            {showLabels && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{config.icon}</span>
                  <span className={cn('font-medium text-text-2', sizeConfig[size].text)}>
                    {config.label}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-bold tabular-nums',
                    sizeConfig[size].text,
                    value >= 70 ? 'text-emerald-400' : value >= 40 ? 'text-amber-400' : 'text-red-400'
                  )}
                >
                  {value}%
                </span>
              </div>
            )}
            <div className={cn('w-full bg-surface-3 rounded-full overflow-hidden', sizeConfig[size].barHeight)}>
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  getStatColor(value)
                )}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
})

// Compact version for HUD - memoized for performance
interface StatsHUDProps {
  stats: GameStats
  currentScore?: number // Điểm tạm thời hiện tại
  roomNumber?: number // Phòng hiện tại  
  className?: string
}

const StatItem = memo(function StatItem({ 
  icon, 
  value, 
  label 
}: { 
  icon: string; 
  value: number; 
  label: string 
}) {
  return (
    <div className="flex items-center gap-1.5" title={label}>
      <span className="text-sm">{icon}</span>
      <span
        className={cn(
          'text-xs font-bold tabular-nums',
          value >= 70 ? 'text-emerald-400' : value >= 40 ? 'text-amber-400' : 'text-red-400'
        )}
      >
        {value}
      </span>
    </div>
  )
})

export const StatsHUD = memo(function StatsHUD({ stats, currentScore, roomNumber, className }: StatsHUDProps) {
  return (
    <div className={cn(
      'flex items-center gap-3 px-4 py-2 bg-surface-1/90 backdrop-blur-sm rounded-full border border-border-1',
      className
    )}>
      {/* Room indicator */}
      {roomNumber !== undefined && (
        <div className="flex items-center gap-1 pr-3 border-r border-border-1">
          <span className="text-xs text-text-3">Phòng</span>
          <span className="text-sm font-bold text-primary-400">{roomNumber}/4</span>
        </div>
      )}
      
      {/* Stats */}
      <StatItem icon={statConfig.economy.icon} value={stats.economy} label={statConfig.economy.label} />
      <StatItem icon={statConfig.equality.icon} value={stats.equality} label={statConfig.equality.label} />
      <StatItem icon={statConfig.technology.icon} value={stats.technology} label={statConfig.technology.label} />
      <StatItem icon={statConfig.humanity.icon} value={stats.humanity} label={statConfig.humanity.label} />
      
      {/* Score - ẨN trong quá trình chơi, chỉ hiện ở màn kết thúc */}
      {/* Điểm được giữ bí mật để tăng tính bất ngờ */}
    </div>
  )
})

// Radar chart for ending screen
interface StatsRadarProps {
  stats: GameStats
  className?: string
}

export function StatsRadar({ stats, className }: StatsRadarProps) {
  const size = 200
  const center = size / 2
  const radius = size * 0.4

  const statKeys: Array<keyof GameStats> = ['economy', 'equality', 'technology', 'humanity']
  
  const getPoint = (index: number, value: number) => {
    const angle = (index * 90 - 90) * (Math.PI / 180)
    const r = (value / 100) * radius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    }
  }

  const points = statKeys.map((key, i) => getPoint(i, stats[key]))
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <div className={cn('relative', className)}>
      <svg width={size} height={size} className="mx-auto">
        {/* Background circles */}
        {[25, 50, 75, 100].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            className="text-border-1"
            opacity={0.3}
          />
        ))}

        {/* Axis lines */}
        {statKeys.map((_, i) => {
          const endPoint = getPoint(i, 100)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="currentColor"
              strokeWidth={1}
              className="text-border-1"
              opacity={0.3}
            />
          )
        })}

        {/* Data polygon */}
        <path
          d={pathData}
          fill="url(#gradient)"
          stroke="currentColor"
          strokeWidth={2}
          className="text-primary-500"
          opacity={0.8}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={statConfig[statKeys[i]].color}
            stroke="white"
            strokeWidth={2}
          />
        ))}
      </svg>

      {/* Labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-center">
        <span className="text-lg">{statConfig.economy.icon}</span>
        <div className="text-xs font-medium text-text-2">{stats.economy}%</div>
      </div>
      <div className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2 text-center">
        <span className="text-lg">{statConfig.equality.icon}</span>
        <div className="text-xs font-medium text-text-2">{stats.equality}%</div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
        <span className="text-lg">{statConfig.technology.icon}</span>
        <div className="text-xs font-medium text-text-2">{stats.technology}%</div>
      </div>
      <div className="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2 text-center">
        <span className="text-lg">{statConfig.humanity.icon}</span>
        <div className="text-xs font-medium text-text-2">{stats.humanity}%</div>
      </div>
    </div>
  )
}
