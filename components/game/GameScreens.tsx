'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { Ending, GameState, Team, ScoreBreakdown, LeaderboardEntry } from '@/lib/game-data'
import { rooms, teams, gameRules, achievements, getGameRank, generateTeamLeaderboard } from '@/lib/game-data'
import Link from 'next/link'

// Session info type for multiplayer
interface SessionInfo {
  sessionId: string
  status: 'lobby' | 'waiting' | 'playing' | 'finished'
  takenTeams: number[]
  playerCount: number
  leaderboard: Array<{
    teamId: number
    teamName: string
    currentRoom: number
    score: number
    isComplete: boolean
    isOnline: boolean
  }>
  adminStarted: boolean
  gameStartTime: number | null
  canJoin: boolean
  canPlay: boolean
}

interface GameIntroProps {
  onStart: (team: Team) => void
  className?: string
  sessionInfo?: SessionInfo | null
  onJoinTeam?: (teamId: number, teamName: string) => Promise<{ success: boolean; error?: string }>
  isMultiplayer?: boolean
}

export function GameIntro({ onStart, className, sessionInfo, onJoinTeam, isMultiplayer = false }: GameIntroProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showRules, setShowRules] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)
  const [hasJoined, setHasJoined] = useState(false) // Đã join team và đang chờ admin start

  // Trạng thái lobby
  const isLobby = isMultiplayer && sessionInfo?.status === 'lobby'
  const isWaiting = isMultiplayer && sessionInfo?.status === 'waiting'
  const isPlaying = isMultiplayer && sessionInfo?.status === 'playing'
  const canJoin = !isMultiplayer || sessionInfo?.canJoin

  // Kiểm tra team có available không
  const isTeamTaken = (teamId: number): boolean => {
    if (!isMultiplayer || !sessionInfo) return false
    return sessionInfo.takenTeams.includes(teamId)
  }

  // Handle team selection với multiplayer check
  const handleTeamSelect = async (team: Team) => {
    if (!canJoin) {
      setJoinError('Vui lòng chờ Admin mở phòng chờ')
      return
    }
    if (isTeamTaken(team.id)) {
      setJoinError('Team này đã có người chọn!')
      return
    }
    setSelectedTeam(team)
    setJoinError(null)
  }

  // Handle start với join team
  const handleStart = async () => {
    if (!selectedTeam) return

    if (isMultiplayer && onJoinTeam) {
      setIsJoining(true)
      setJoinError(null)
      
      const result = await onJoinTeam(selectedTeam.id, selectedTeam.name)
      
      if (!result.success) {
        setJoinError(result.error || 'Không thể tham gia team')
        setIsJoining(false)
        return
      }
      
      setIsJoining(false)
      setHasJoined(true) // Đánh dấu đã join, chờ admin start
      
      // Lưu team đã chọn vào localStorage
      localStorage.setItem('mln-team-id', selectedTeam.id.toString())
      
      // Nếu game đã playing thì vào luôn
      if (sessionInfo?.canPlay) {
        onStart(selectedTeam)
      }
      // Nếu chưa playing, sẽ chờ và check trong useEffect
      return
    }
    
    // Single player mode
    localStorage.setItem('mln-team-id', selectedTeam.id.toString())
    onStart(selectedTeam)
  }

  // Auto-start khi admin bấm start và đã join team
  useEffect(() => {
    if (hasJoined && selectedTeam && sessionInfo?.canPlay) {
      onStart(selectedTeam)
    }
  }, [hasJoined, selectedTeam, sessionInfo?.canPlay, onStart])

  return (
    <div className={cn(
      'absolute inset-0 flex items-center justify-center bg-bg-0 overflow-y-auto py-8',
      className
    )}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-bg-0 to-rupture-900/20" />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary-500/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-sm">🎮</span>
          <span className="text-primary-400 text-sm font-medium">Team Interactive Experience</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          HÀNH TRÌNH
          <br />
          <span className="text-gradient">CÔNG NGHỆ</span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-2 text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
          <strong className="text-primary-400">6 đội</strong> sẽ cùng tham gia, đi qua{' '}
          <strong className="text-primary-400">4 không gian</strong>, đưa ra{' '}
          <strong className="text-primary-400">4 quyết định</strong>.
          <br />Mỗi lựa chọn sẽ định hình thế giới của đội bạn.
        </p>

        {/* Rules Button */}
        <button
          onClick={() => setShowRules(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2/50 border border-border-1 rounded-lg mb-8 hover:border-primary-500/50 transition-colors"
        >
          <span>📜</span>
          <span className="text-text-2 text-sm">Xem luật chơi</span>
        </button>

        {/* Room preview */}
        <div className="flex justify-center gap-3 mb-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className="w-14 h-14 rounded-xl bg-surface-2 border border-border-1 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 hover:border-primary-500/50"
                style={{ boxShadow: `0 0 20px ${room.ambientColor}20` }}
              >
                {room.icon}
              </div>
              <span className="text-xs text-text-3">Phòng {index + 1}</span>
            </div>
          ))}
        </div>

        {/* Multiplayer Status Banner */}
        {isMultiplayer && sessionInfo && (
          <div className={cn(
            'backdrop-blur-md rounded-xl p-4 mb-6 max-w-2xl mx-auto border',
            isLobby 
              ? 'bg-gray-500/20 border-gray-500/30' 
              : hasJoined && !sessionInfo.canPlay
                ? 'bg-amber-500/20 border-amber-500/30'
                : 'bg-surface-1/80 border-primary-500/30'
          )}>
            {/* Lobby - Chờ admin mở */}
            {isLobby && (
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-lg font-semibold text-gray-300">Phòng chờ chưa mở</p>
                <p className="text-sm text-text-3">Vui lòng chờ Admin mở phòng...</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                  <span className="text-xs text-gray-400">Đang chờ</span>
                </div>
              </div>
            )}

            {/* Waiting - Có thể join */}
            {isWaiting && !hasJoined && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-green-400">LIVE</span>
                    </div>
                    <span className="text-text-2 text-sm">
                      {sessionInfo.playerCount}/6 đội đã tham gia
                    </span>
                  </div>
                  <div className="text-xs text-text-3">
                    Session: {sessionInfo.sessionId}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-3 h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-system-500 transition-all duration-500"
                    style={{ width: `${(sessionInfo.playerCount / 6) * 100}%` }}
                  />
                </div>
              </>
            )}

            {/* Đã join - Chờ admin start */}
            {hasJoined && !sessionInfo.canPlay && (
              <div className="text-center">
                <div className="text-4xl mb-2 animate-bounce">⏳</div>
                <p className="text-lg font-semibold text-amber-300">Đã tham gia!</p>
                <p className="text-sm text-text-3">
                  Chờ Admin bấm <strong>Bắt đầu Game</strong>...
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-2xl">{selectedTeam?.icon}</span>
                  <span className="font-medium" style={{ color: selectedTeam?.color }}>
                    {selectedTeam?.name}
                  </span>
                </div>
                <div className="mt-3 text-xs text-text-3">
                  {sessionInfo.playerCount}/6 đội đã sẵn sàng
                </div>
              </div>
            )}
          </div>
        )}

        {/* Team Selection - Ẩn khi đã join */}
        {!hasJoined && (
          <div className="bg-surface-1/80 backdrop-blur-md border border-border-1 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="text-text-1 font-semibold text-lg mb-4 flex items-center justify-center gap-2">
              <span>👥</span> Chọn Team của bạn
              {isMultiplayer && (
                <span className="text-xs text-text-3 font-normal">(Team đã chọn sẽ bị khóa)</span>
              )}
            </h3>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {teams.map((team) => {
                const isTaken = isTeamTaken(team.id)
                const isSelected = selectedTeam?.id === team.id
                const isDisabled = isTaken || isLobby
                
                return (
                  <button
                    key={team.id}
                    onClick={() => handleTeamSelect(team)}
                    disabled={isDisabled}
                    className={cn(
                      'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300',
                      isDisabled
                        ? 'border-red-500/50 bg-red-900/20 cursor-not-allowed opacity-60'
                        : isSelected
                          ? 'border-primary-500 bg-primary-600/20 scale-105'
                          : 'border-border-1 bg-surface-2/50 hover:border-primary-500/50 hover:bg-surface-1'
                    )}
                  >
                    {/* Taken badge */}
                    {isTaken && (
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        ĐÃ CHỌN
                      </div>
                    )}
                    
                    <span className={cn('text-3xl', isDisabled && 'grayscale')}>{team.icon}</span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: isDisabled ? '#888' : team.color }}
                    >
                      {team.name.replace('Team ', '')}
                    </span>
                    
                    {/* Online indicator for taken teams */}
                    {isTaken && isMultiplayer && sessionInfo && (
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-green-400">Online</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Error message */}
            {joinError && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 animate-in fade-in duration-300">
                <p className="text-sm text-red-400 text-center">
                  ⚠️ {joinError}
              </p>
            </div>
          )}

          {selectedTeam && !joinError && (
            <div 
              className="mt-4 p-3 rounded-lg border animate-in fade-in duration-300"
              style={{ 
                backgroundColor: `${selectedTeam.color}10`,
                borderColor: `${selectedTeam.color}50`
              }}
            >
              <p className="text-sm" style={{ color: selectedTeam.color }}>
                ✓ Đã chọn: <strong>{selectedTeam.name}</strong>
              </p>
            </div>
          )}
          </div>
        )}

        {/* Start button - Ẩn khi đã join */}
        {!hasJoined && (
          <button
            onClick={handleStart}
            disabled={!selectedTeam || isJoining || isLobby}
            className={cn(
              'group relative px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300',
              selectedTeam && !isJoining && !isLobby
                ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40'
                : 'bg-surface-2 text-text-3 cursor-not-allowed'
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isJoining ? (
                <>
                  <span className="animate-spin">⏳</span> Đang tham gia...
                </>
              ) : isLobby ? (
                <>
                  🔒 Chờ Admin mở phòng
                </>
              ) : (
                <>
                  🚀 {selectedTeam ? 'Tham gia & Chờ bắt đầu' : 'Chọn team để tiếp tục'}
                </>
              )}
            </span>
            {selectedTeam && !isJoining && !isLobby && (
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-rupture-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        )}

        {/* Instructions */}
        <p className="text-text-3 text-sm mt-6">
          ⏱️ Thời gian: ~10 phút • 🎯 Thảo luận nhóm • ⚖️ Không có đáp án đúng/sai
        </p>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <GameRulesModal onClose={() => setShowRules(false)} />
      )}
    </div>
  )
}

// Rules Modal Component
function GameRulesModal({ onClose }: { onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-0/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-surface-1 border border-border-1 rounded-2xl p-6 max-w-lg mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-1 flex items-center gap-2">
            <span>📜</span> Luật chơi
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-2 hover:text-text-1 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {gameRules.map((rule, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{rule.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold text-text-1 text-sm">{rule.title}</h4>
                <p className="text-text-3 text-xs">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-500 transition-colors"
        >
          Đã hiểu, bắt đầu thôi! 🚀
        </button>
      </div>
    </div>
  )
}

interface GameEndingProps {
  ending: Ending
  gameState: GameState
  onRestart: () => void
  className?: string
}

export function GameEnding({
  ending,
  gameState,
  onRestart,
  className,
}: GameEndingProps) {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  
  const colorVariants = {
    primary: 'from-primary-900/30 to-primary-600/10 border-primary-500/30',
    system: 'from-system-900/30 to-system-600/10 border-system-500/30',
    accent: 'from-rupture-900/30 to-rupture-600/10 border-rupture-500/30',
  }

  // Get team info
  const team = teams.find(t => t.id === gameState.teamId)
  const stats = gameState.stats
  const score = gameState.score
  const rank = score ? getGameRank(score.total) : null
  const leaderboard = team && score ? generateTeamLeaderboard(score.total, team) : []
  const playerPosition = leaderboard.find(e => e.isPlayer)?.position || 0

  return (
    <div className={cn(
      'absolute inset-0 flex items-center justify-center bg-bg-0 overflow-y-auto py-8',
      className
    )}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br',
          colorVariants[ending.color as keyof typeof colorVariants] || colorVariants.primary
        )} />
        {/* Confetti effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#4F46E5', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 5)],
                  opacity: 0.5,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Team Badge */}
        {team && (
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border shadow-lg"
            style={{ 
              backgroundColor: `${team.color}30`,
              borderColor: `${team.color}60`,
              boxShadow: `0 10px 40px ${team.color}30`
            }}
          >
            <span className="text-2xl">{team.icon}</span>
            <span className="font-bold text-lg" style={{ color: team.color }}>
              {team.name}
            </span>
          </div>
        )}

        {/* Score and Rank Display */}
        {score && rank && (
          <div className="mb-6">
            {/* Rank Badge */}
            <div 
              className="inline-flex flex-col items-center p-6 rounded-3xl border-2 mb-4"
              style={{ 
                borderColor: rank.color,
                background: `linear-gradient(135deg, ${rank.color}20, ${rank.color}05)`,
                boxShadow: `0 10px 60px ${rank.color}40`
              }}
            >
              <div className="text-6xl mb-2 animate-bounce">{rank.icon}</div>
              <div className="text-3xl font-black mb-1" style={{ color: rank.color }}>
                {score.total.toLocaleString()} điểm
              </div>
              <div className="text-lg font-bold" style={{ color: rank.color }}>
                Hạng {rank.name}
              </div>
              {playerPosition > 0 && (
                <div className="mt-2 text-sm text-text-2">
                  🏅 Vị trí #{playerPosition}/6 trong lớp
                </div>
              )}
            </div>

            {/* Score Breakdown */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[
                { label: 'Cơ bản', value: score.basePoints, icon: '🎯' },
                { label: 'Thời gian', value: score.timeBonus, icon: '⏱️' },
                { label: 'Streak', value: score.streakBonus, icon: '🔥' },
                { label: 'Team', value: score.teamBonus, icon: '👥' },
                { label: 'Thành tựu', value: score.achievementPoints, icon: '🏆' },
                { label: 'Cân bằng', value: score.balanceBonus, icon: '⚖️' },
                { label: `Đúng (${score.correctCount}/4)`, value: score.correctAnswerBonus, icon: '✅' },
              ].filter(item => item.value > 0).map(item => (
                <div 
                  key={item.label}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-2/80 border border-border-1 text-sm"
                >
                  <span>{item.icon}</span>
                  <span className="text-text-2">{item.label}:</span>
                  <span className="font-bold text-system-400">+{item.value}</span>
                </div>
              ))}
            </div>

            {/* Leaderboard Toggle */}
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600/20 border border-primary-500/30 hover:bg-primary-600/30 transition-colors"
            >
              <span>🏆</span>
              <span className="text-primary-400 font-medium text-sm">
                {showLeaderboard ? 'Ẩn bảng xếp hạng' : 'Xem bảng xếp hạng lớp'}
              </span>
            </button>

            {/* Leaderboard */}
            {showLeaderboard && (
              <div className="mt-4 bg-surface-1/90 backdrop-blur-sm border border-border-1 rounded-2xl p-4 max-w-md mx-auto">
                <h4 className="text-text-1 font-bold mb-3 text-center">🏆 Bảng xếp hạng lớp</h4>
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => {
                    const entryTeam = teams.find(t => t.id === entry.teamId)
                    return (
                      <div 
                        key={entry.teamId}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl transition-all',
                          entry.isPlayer 
                            ? 'bg-primary-600/20 border-2 border-primary-500/50 scale-105' 
                            : 'bg-surface-2/50'
                        )}
                      >
                        {/* Position */}
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                          index === 0 ? 'bg-amber-500 text-amber-950' :
                          index === 1 ? 'bg-gray-400 text-gray-900' :
                          index === 2 ? 'bg-orange-600 text-orange-100' :
                          'bg-surface-3 text-text-2'
                        )}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.position}
                        </div>
                        
                        {/* Team Info */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{entryTeam?.icon}</span>
                            <span className={cn(
                              'font-semibold text-sm',
                              entry.isPlayer ? 'text-primary-400' : 'text-text-1'
                            )}>
                              {entry.teamName}
                              {entry.isPlayer && ' (Bạn)'}
                            </span>
                          </div>
                        </div>

                        {/* Score & Rank */}
                        <div className="text-right">
                          <div className="font-bold tabular-nums" style={{ color: entry.rank.color }}>
                            {entry.score.toLocaleString()}
                          </div>
                          <div className="text-xs text-text-3">{entry.rank.icon} {entry.rank.name}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ending icon */}
        <div className="text-8xl mb-4 drop-shadow-lg">
          {ending.icon}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
          {ending.title}
        </h1>

        {/* Team name in result */}
        {team && (
          <p className="text-xl mb-6 font-medium" style={{ color: team.color }}>
            Thế giới mà {team.name} đã tạo ra
          </p>
        )}

        {/* Description */}
        <p className="text-text-2 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          {ending.description}
        </p>

        {/* Stats Radar/Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Stats bars */}
          <div className="bg-surface-1/80 backdrop-blur-sm border border-border-1 rounded-2xl p-6">
            <h3 className="text-text-1 font-bold mb-4 flex items-center gap-2">
              <span>📊</span> Chỉ số thế giới
            </h3>
            <div className="space-y-4">
              {[
                { key: 'economy', label: 'Kinh tế', icon: '📈', color: '#10B981' },
                { key: 'equality', label: 'Công bằng', icon: '⚖️', color: '#8B5CF6' },
                { key: 'technology', label: 'Công nghệ', icon: '🔧', color: '#0EA5E9' },
                { key: 'humanity', label: 'Nhân văn', icon: '❤️', color: '#EF4444' },
              ].map(({ key, label, icon, color }) => {
                const value = stats[key as keyof typeof stats]
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{icon}</span>
                        <span className="text-sm font-medium text-text-2">{label}</span>
                      </div>
                      <span 
                        className="font-bold tabular-nums"
                        style={{ color: value >= 60 ? '#10B981' : value >= 40 ? '#F59E0B' : '#EF4444' }}
                      >
                        {value}%
                      </span>
                    </div>
                    <div className="h-3 bg-surface-3 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${value}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Choices summary */}
          <div className="bg-surface-1/80 backdrop-blur-sm border border-border-1 rounded-2xl p-6">
            <h3 className="text-text-1 font-bold mb-4 flex items-center gap-2">
              <span>📋</span> Lựa chọn của {team?.name || 'bạn'}
            </h3>
            <div className="space-y-3">
              {rooms.map((room) => {
                const choice = gameState.choices[room.id]
                const selectedChoice = room.choices.find(c => c.id === choice)
                const isChoiceA = choice === 'A'
                return (
                  <div
                    key={room.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50"
                  >
                    <span className="text-2xl">{room.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="text-xs text-text-3">{room.title}</p>
                      <p className="text-sm font-semibold text-text-1">
                        {selectedChoice?.shortText || '—'}
                      </p>
                    </div>
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white',
                      isChoiceA ? 'bg-primary-600' : 'bg-rupture-600'
                    )}>
                      {choice}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Achievements */}
        {gameState.achievements.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-amber-400 font-bold mb-4 flex items-center justify-center gap-2">
              <span>🏆</span> Thành tựu đạt được
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {gameState.achievements.map((id) => {
                const achievement = achievements.find(a => a.id === id)
                if (!achievement) return null
                return (
                  <div 
                    key={id}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30"
                  >
                    <span className="text-xl">{achievement.icon}</span>
                    <span className="font-medium text-amber-300">{achievement.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Message */}
        <div className="bg-primary-600/10 border border-primary-500/30 rounded-2xl p-6 mb-8">
          <p className="text-text-1 text-base leading-relaxed">
            &ldquo;Đứt gãy công nghệ không có đáp án đúng-sai. Chỉ có những lựa chọn và hệ quả. 
            Điều quan trọng là hiểu rõ mâu thuẫn để hành động có ý thức.&rdquo;
          </p>
          <p className="text-text-3 text-sm mt-3">— Quan điểm Mác-Lênin về mâu thuẫn xã hội</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className={cn(
              'px-8 py-4 rounded-xl font-bold transition-all duration-300 text-lg',
              'bg-surface-2 text-text-1 border-2 border-border-1',
              'hover:bg-surface-1 hover:border-primary-500/50 hover:scale-105'
            )}
          >
            🔄 Chơi lại
          </button>
          
          <Link
            href="/articles/vietnam-tech"
            className={cn(
              'px-8 py-4 rounded-xl font-bold transition-all duration-300 text-lg',
              'bg-gradient-to-r from-primary-600 to-primary-500 text-white',
              'hover:from-primary-500 hover:to-primary-400 hover:scale-105',
              'shadow-xl shadow-primary-600/30'
            )}
          >
            📚 Đọc bài phân tích
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
