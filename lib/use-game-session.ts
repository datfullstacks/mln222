'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// Types
export interface LeaderboardEntry {
    teamId: number
    teamName: string
    currentRoom: number
    score: number
    isComplete: boolean
    isOnline: boolean
}

export interface SessionInfo {
    sessionId: string
    status: 'lobby' | 'waiting' | 'playing' | 'finished'
    takenTeams: number[]
    playerCount: number
    leaderboard: LeaderboardEntry[]
    adminStarted: boolean
    gameStartTime: number | null
    canJoin: boolean
    canPlay: boolean
}

const API_URL = '/api/game-session'

// Hook để quản lý game session
export function useGameSession() {
    const [playerId, setPlayerId] = useState<string | null>(null)
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const heartbeatRef = useRef<NodeJS.Timeout | null>(null)
    const pollingRef = useRef<NodeJS.Timeout | null>(null)

    // Lấy hoặc tạo player ID từ localStorage
    useEffect(() => {
        const storedId = localStorage.getItem('mln-player-id')
        if (storedId) {
            setPlayerId(storedId)
        } else {
            // Tạo ID mới
            generatePlayerId()
        }
    }, [])

    // Tạo player ID
    const generatePlayerId = async () => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'generate-id' }),
            })
            const data = await res.json()
            if (data.success && data.playerId) {
                localStorage.setItem('mln-player-id', data.playerId)
                setPlayerId(data.playerId)
            }
        } catch (err) {
            console.error('Failed to generate player ID:', err)
        }
    }

    // Fetch session info
    const fetchSessionInfo = useCallback(async () => {
        try {
            const res = await fetch(API_URL)
            const data = await res.json()
            setSessionInfo(data)
            setError(null)
        } catch (err) {
            console.error('Failed to fetch session:', err)
            setError('Không thể kết nối server')
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Polling mỗi 2 giây để cập nhật realtime
    useEffect(() => {
        fetchSessionInfo()
        
        pollingRef.current = setInterval(fetchSessionInfo, 2000)
        
        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current)
            }
        }
    }, [fetchSessionInfo])

    // Heartbeat mỗi 10 giây
    useEffect(() => {
        if (!playerId) return

        const sendHeartbeat = async () => {
            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'heartbeat', playerId }),
                })
                const data = await res.json()
                if (data.success) {
                    setSessionInfo(prev => ({
                        ...prev!,
                        ...data,
                    }))
                }
            } catch (err) {
                console.error('Heartbeat failed:', err)
            }
        }

        heartbeatRef.current = setInterval(sendHeartbeat, 10000)

        return () => {
            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current)
            }
        }
    }, [playerId])

    // Join team
    const joinTeam = async (teamId: number, teamName: string): Promise<{ success: boolean; error?: string }> => {
        if (!playerId) {
            return { success: false, error: 'Chưa có player ID' }
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: 'join-team', 
                    playerId, 
                    teamId, 
                    teamName 
                }),
            })
            const data = await res.json()
            
            if (data.success) {
                // Refresh session info
                await fetchSessionInfo()
            }
            
            return data
        } catch (err) {
            console.error('Failed to join team:', err)
            return { success: false, error: 'Lỗi kết nối' }
        }
    }

    // Update progress
    const updateProgress = async (
        currentRoom: number,
        choices: Record<number, 'A' | 'B' | 'C' | 'D'>,
        score: number,
        isComplete: boolean
    ) => {
        if (!playerId) return

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: 'update-progress',
                    playerId,
                    currentRoom,
                    choices,
                    score,
                    isComplete,
                }),
            })
        } catch (err) {
            console.error('Failed to update progress:', err)
        }
    }

    // Leave game
    const leaveGame = async () => {
        if (!playerId) return

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'leave', playerId }),
            })
            localStorage.removeItem('mln-player-id')
            setPlayerId(null)
            await fetchSessionInfo()
        } catch (err) {
            console.error('Failed to leave game:', err)
        }
    }

    // Reset session (admin)
    const resetSession = async () => {
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reset' }),
            })
            localStorage.removeItem('mln-player-id')
            setPlayerId(null)
            await generatePlayerId()
            await fetchSessionInfo()
        } catch (err) {
            console.error('Failed to reset session:', err)
        }
    }

    // Kiểm tra team có available không
    const isTeamAvailable = (teamId: number): boolean => {
        if (!sessionInfo) return true
        return !sessionInfo.takenTeams.includes(teamId)
    }

    // Lấy thông tin team đã chọn của player hiện tại
    const getMyTeam = (): LeaderboardEntry | null => {
        if (!sessionInfo || !playerId) return null
        return sessionInfo.leaderboard.find(entry => {
            // Tìm trong localStorage
            const storedTeamId = localStorage.getItem('mln-team-id')
            return storedTeamId && entry.teamId === parseInt(storedTeamId)
        }) || null
    }

    return {
        playerId,
        sessionInfo,
        isLoading,
        error,
        joinTeam,
        updateProgress,
        leaveGame,
        resetSession,
        isTeamAvailable,
        getMyTeam,
        refetch: fetchSessionInfo,
    }
}
