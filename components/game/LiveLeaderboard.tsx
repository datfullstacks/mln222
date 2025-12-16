'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'
import type { LeaderboardEntry } from '@/lib/use-game-session'

interface LiveLeaderboardProps {
  leaderboard: LeaderboardEntry[]
  currentTeamId?: number
  className?: string
  compact?: boolean // Compact mode cho sidebar
}

// Component hiển thị realtime leaderboard trong game
export const LiveLeaderboard = memo(function LiveLeaderboard({
  leaderboard,
  currentTeamId,
  className,
  compact = false,
}: LiveLeaderboardProps) {
  if (leaderboard.length === 0) {
    return (
      <div className={cn('text-center text-text-3 text-sm p-4', className)}>
        Chưa có team nào tham gia
      </div>
    )
  }

  // Sort: complete > score > room
  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (a.isComplete !== b.isComplete) return a.isComplete ? -1 : 1
    if (a.score !== b.score) return b.score - a.score
    return b.currentRoom - a.currentRoom
  })

  if (compact) {
    return (
      <div className={cn('space-y-1', className)}>
        {sortedLeaderboard.map((entry, index) => {
          const isMe = entry.teamId === currentTeamId
          const position = index + 1
          
          return (
            <div
              key={entry.teamId}
              className={cn(
                'flex items-center gap-2 px-2 py-1 rounded-lg text-xs',
                isMe ? 'bg-primary-600/20 border border-primary-500/30' : 'bg-surface-2/50',
                !entry.isOnline && 'opacity-50'
              )}
            >
              {/* Position */}
              <span className={cn(
                'w-5 h-5 rounded flex items-center justify-center font-bold text-[10px]',
                position === 1 ? 'bg-amber-500/20 text-amber-400' :
                position === 2 ? 'bg-gray-300/20 text-gray-300' :
                position === 3 ? 'bg-orange-600/20 text-orange-400' :
                'bg-surface-2 text-text-3'
              )}>
                {position}
              </span>
              
              {/* Team name */}
              <span className={cn(
                'flex-1 truncate',
                isMe ? 'text-primary-400 font-medium' : 'text-text-2'
              )}>
                {entry.teamName.replace('Team ', '')}
                {isMe && ' (Bạn)'}
              </span>
              
              {/* Status */}
              <div className="flex items-center gap-1">
                {entry.isComplete ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-text-3">P{entry.currentRoom}</span>
                )}
                {entry.isOnline && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Full version
  return (
    <div className={cn('bg-surface-1/80 backdrop-blur-md rounded-xl border border-border-1 p-4', className)}>
      <h3 className="text-sm font-semibold text-text-1 mb-3 flex items-center gap-2">
        <span>🏆</span> Bảng xếp hạng LIVE
        <span className="flex items-center gap-1 ml-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400">LIVE</span>
        </span>
      </h3>
      
      <div className="space-y-2">
        {sortedLeaderboard.map((entry, index) => {
          const isMe = entry.teamId === currentTeamId
          const position = index + 1
          
          return (
            <div
              key={entry.teamId}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
                isMe 
                  ? 'bg-primary-600/20 border border-primary-500/30 scale-[1.02]' 
                  : 'bg-surface-2/50 hover:bg-surface-2',
                !entry.isOnline && 'opacity-50'
              )}
            >
              {/* Position medal */}
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center font-bold',
                position === 1 ? 'bg-amber-500/20 text-amber-400 text-xl' :
                position === 2 ? 'bg-gray-300/20 text-gray-300 text-lg' :
                position === 3 ? 'bg-orange-600/20 text-orange-400 text-lg' :
                'bg-surface-2 text-text-3'
              )}>
                {position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : position}
              </div>
              
              {/* Team info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'font-medium truncate',
                    isMe ? 'text-primary-400' : 'text-text-1'
                  )}>
                    {entry.teamName}
                  </span>
                  {isMe && (
                    <span className="text-xs bg-primary-600/30 text-primary-400 px-2 py-0.5 rounded-full">
                      Bạn
                    </span>
                  )}
                  {entry.isOnline && (
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
                
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        'h-full transition-all duration-500',
                        entry.isComplete 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-primary-500 to-system-500'
                      )}
                      style={{ width: `${(entry.currentRoom / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-3">
                    {entry.isComplete ? '✅ Hoàn thành' : `Phòng ${entry.currentRoom}/4`}
                  </span>
                </div>
              </div>
              
              {/* Score - hiển thị khi complete */}
              {entry.isComplete && (
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-400">
                    {entry.score}
                  </div>
                  <div className="text-xs text-text-3">điểm</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Waiting for more teams */}
      {leaderboard.length < 6 && (
        <div className="mt-3 p-2 rounded-lg bg-surface-2/30 text-center">
          <span className="text-xs text-text-3">
            ⏳ Đang chờ thêm {6 - leaderboard.length} đội...
          </span>
        </div>
      )}
    </div>
  )
})
