'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { teams } from '@/lib/game-data'

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

const API_URL = '/api/game-session'

export default function AdminPanel() {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Fetch session info
  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setSessionInfo(data)
    } catch (err) {
      console.error('Failed to fetch session:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Polling mỗi 2 giây
  useEffect(() => {
    fetchSession()
    const interval = setInterval(fetchSession, 2000)
    return () => clearInterval(interval)
  }, [fetchSession])

  // Admin action helper
  const doAction = async (action: string) => {
    setActionLoading(action)
    setMessage(null)
    
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: `✅ ${action} thành công!` })
        await fetchSession()
      } else {
        setMessage({ type: 'error', text: `❌ ${data.error || 'Có lỗi xảy ra'}` })
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Lỗi kết nối server' })
    } finally {
      setActionLoading(null)
    }
  }

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lobby': return 'bg-gray-500'
      case 'waiting': return 'bg-amber-500'
      case 'playing': return 'bg-green-500'
      case 'finished': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'lobby': return 'Chờ mở phòng'
      case 'waiting': return 'Đang chờ teams'
      case 'playing': return 'Đang chơi'
      case 'finished': return 'Đã kết thúc'
      default: return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-0 flex items-center justify-center">
        <div className="text-text-2">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-0 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <span>🎮</span> Admin Control Panel
            </h1>
            <p className="text-text-3 mt-1">Quản lý phiên game Hành Trình Công Nghệ</p>
          </div>
          
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-1 rounded-full border border-border-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400">LIVE</span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={cn(
            'p-4 rounded-xl mb-6 border',
            message.type === 'success' 
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
              : 'bg-red-500/20 border-red-500/50 text-red-400'
          )}>
            {message.text}
          </div>
        )}

        {/* Session Info Card */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-text-3 text-sm">Session ID</p>
              <p className="text-text-1 font-mono">{sessionInfo?.sessionId}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={cn(
                'px-3 py-1.5 rounded-full text-white text-sm font-medium',
                getStatusColor(sessionInfo?.status || 'lobby')
              )}>
                {getStatusText(sessionInfo?.status || 'lobby')}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-surface-2 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-primary-400">{sessionInfo?.playerCount || 0}</p>
              <p className="text-text-3 text-sm">Teams đã vào</p>
            </div>
            <div className="bg-surface-2 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-amber-400">{6 - (sessionInfo?.playerCount || 0)}</p>
              <p className="text-text-3 text-sm">Còn trống</p>
            </div>
            <div className="bg-surface-2 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-emerald-400">
                {sessionInfo?.leaderboard.filter(t => t.isComplete).length || 0}
              </p>
              <p className="text-text-3 text-sm">Đã hoàn thành</p>
            </div>
          </div>

          {/* Game time */}
          {sessionInfo?.gameStartTime && (
            <div className="bg-surface-2 rounded-xl p-4 text-center mb-6">
              <p className="text-text-3 text-sm mb-1">Thời gian game</p>
              <p className="text-2xl font-mono text-white">
                {Math.floor((Date.now() - sessionInfo.gameStartTime) / 1000 / 60)}:{String(Math.floor((Date.now() - sessionInfo.gameStartTime) / 1000) % 60).padStart(2, '0')}
              </p>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-text-1 mb-4 flex items-center gap-2">
            <span>🎛️</span> Điều khiển
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Open Lobby */}
            <button
              onClick={() => doAction('admin-open-lobby')}
              disabled={sessionInfo?.status !== 'lobby' || actionLoading !== null}
              className={cn(
                'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                sessionInfo?.status === 'lobby'
                  ? 'border-amber-500 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400'
                  : 'border-border-1 bg-surface-2 text-text-3 cursor-not-allowed'
              )}
            >
              <span className="text-2xl">🚪</span>
              <span className="text-sm font-medium">Mở Lobby</span>
              {actionLoading === 'admin-open-lobby' && <span className="animate-spin">⏳</span>}
            </button>

            {/* Start Game */}
            <button
              onClick={() => doAction('admin-start-game')}
              disabled={sessionInfo?.status !== 'waiting' || (sessionInfo?.playerCount || 0) === 0 || actionLoading !== null}
              className={cn(
                'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                sessionInfo?.status === 'waiting' && (sessionInfo?.playerCount || 0) > 0
                  ? 'border-emerald-500 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
                  : 'border-border-1 bg-surface-2 text-text-3 cursor-not-allowed'
              )}
            >
              <span className="text-2xl">▶️</span>
              <span className="text-sm font-medium">Bắt đầu Game</span>
              {actionLoading === 'admin-start-game' && <span className="animate-spin">⏳</span>}
            </button>

            {/* Pause */}
            <button
              onClick={() => doAction('admin-pause')}
              disabled={sessionInfo?.status !== 'playing' || actionLoading !== null}
              className={cn(
                'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                sessionInfo?.status === 'playing'
                  ? 'border-orange-500 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400'
                  : 'border-border-1 bg-surface-2 text-text-3 cursor-not-allowed'
              )}
            >
              <span className="text-2xl">⏸️</span>
              <span className="text-sm font-medium">Tạm dừng</span>
              {actionLoading === 'admin-pause' && <span className="animate-spin">⏳</span>}
            </button>

            {/* Resume */}
            <button
              onClick={() => doAction('admin-resume')}
              disabled={!(sessionInfo?.status === 'waiting' && sessionInfo?.adminStarted) || actionLoading !== null}
              className={cn(
                'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                sessionInfo?.status === 'waiting' && sessionInfo?.adminStarted
                  ? 'border-blue-500 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                  : 'border-border-1 bg-surface-2 text-text-3 cursor-not-allowed'
              )}
            >
              <span className="text-2xl">▶️</span>
              <span className="text-sm font-medium">Tiếp tục</span>
              {actionLoading === 'admin-resume' && <span className="animate-spin">⏳</span>}
            </button>
          </div>

          {/* Reset - Dangerous */}
          <div className="mt-6 pt-6 border-t border-border-1">
            <button
              onClick={() => {
                if (confirm('⚠️ Bạn có chắc muốn RESET toàn bộ game? Tất cả tiến độ sẽ bị mất!')) {
                  doAction('reset')
                }
              }}
              disabled={actionLoading !== null}
              className="w-full p-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              <span className="font-medium">Reset Game</span>
            </button>
          </div>
        </div>

        {/* Teams Status */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-text-1 mb-4 flex items-center gap-2">
            <span>👥</span> Trạng thái Teams
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {teams.map((team) => {
              const player = sessionInfo?.leaderboard.find(p => p.teamId === team.id)
              const isTaken = sessionInfo?.takenTeams.includes(team.id)
              
              return (
                <div
                  key={team.id}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all',
                    isTaken
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-border-1 bg-surface-2/50'
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{team.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: team.color }}>
                        {team.name}
                      </p>
                      {isTaken ? (
                        <div className="flex items-center gap-1">
                          <span className={cn(
                            'w-2 h-2 rounded-full',
                            player?.isOnline ? 'bg-green-500' : 'bg-gray-500'
                          )} />
                          <span className="text-xs text-text-3">
                            {player?.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-text-3">Đang chờ...</span>
                      )}
                    </div>
                  </div>
                  
                  {player && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-text-3">Phòng</span>
                        <span className="text-text-2">{player.currentRoom}/4</span>
                      </div>
                      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            'h-full transition-all',
                            player.isComplete ? 'bg-emerald-500' : 'bg-primary-500'
                          )}
                          style={{ width: `${(player.currentRoom / 4) * 100}%` }}
                        />
                      </div>
                      {player.isComplete && (
                        <p className="text-xs text-emerald-400 text-right">
                          ✅ {player.score} điểm
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-surface-1/50 border border-border-1 rounded-xl p-4">
          <h3 className="text-sm font-medium text-text-2 mb-2">📋 Hướng dẫn:</h3>
          <ol className="text-xs text-text-3 space-y-1 list-decimal list-inside">
            <li><strong>Mở Lobby</strong> - Cho phép 6 teams vào chọn team</li>
            <li><strong>Chờ teams</strong> - Đợi các team vào và chọn (realtime)</li>
            <li><strong>Bắt đầu Game</strong> - Khi đủ teams, bấm để bắt đầu</li>
            <li><strong>Tạm dừng/Tiếp tục</strong> - Điều khiển trong khi chơi</li>
            <li><strong>Reset</strong> - Xóa tất cả và bắt đầu phiên mới</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
