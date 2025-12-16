import { NextResponse } from 'next/server'
import { 
    getSessionInfo, 
    joinTeam, 
    updatePlayerProgress, 
    heartbeat, 
    leaveGame,
    resetSession,
    generatePlayerId,
    adminOpenLobby,
    adminStartGame,
    adminPauseGame,
    adminResumeGame,
} from '@/lib/game-session'

// GET - Lấy thông tin session hiện tại
export async function GET() {
    const sessionInfo = getSessionInfo()
    return NextResponse.json(sessionInfo)
}

// POST - Các action khác nhau
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { action, playerId, teamId, teamName, currentRoom, choices, score, isComplete } = body

        switch (action) {
            case 'generate-id':
                // Tạo player ID mới
                return NextResponse.json({ 
                    success: true, 
                    playerId: generatePlayerId() 
                })

            case 'join-team':
                // Player chọn team
                if (!playerId || !teamId || !teamName) {
                    return NextResponse.json({ 
                        success: false, 
                        error: 'Missing required fields' 
                    }, { status: 400 })
                }
                const joinResult = joinTeam(playerId, teamId, teamName)
                return NextResponse.json(joinResult)

            case 'update-progress':
                // Cập nhật tiến độ
                if (!playerId) {
                    return NextResponse.json({ 
                        success: false, 
                        error: 'Missing playerId' 
                    }, { status: 400 })
                }
                const updated = updatePlayerProgress(
                    playerId, 
                    currentRoom || 1, 
                    choices || {}, 
                    score || 0, 
                    isComplete || false
                )
                return NextResponse.json({ success: updated })

            case 'heartbeat':
                // Heartbeat để giữ session alive
                if (!playerId) {
                    return NextResponse.json({ 
                        success: false, 
                        error: 'Missing playerId' 
                    }, { status: 400 })
                }
                const alive = heartbeat(playerId)
                return NextResponse.json({ 
                    success: alive,
                    ...getSessionInfo()
                })

            case 'leave':
                // Player rời game
                if (!playerId) {
                    return NextResponse.json({ 
                        success: false, 
                        error: 'Missing playerId' 
                    }, { status: 400 })
                }
                const left = leaveGame(playerId)
                return NextResponse.json({ success: left })

            case 'reset':
                // Reset session (admin only)
                const newSession = resetSession()
                return NextResponse.json({ 
                    success: true, 
                    sessionId: newSession.id 
                })

            // ========== ADMIN ACTIONS ==========
            case 'admin-open-lobby':
                // Admin mở lobby cho teams vào chọn
                const openResult = adminOpenLobby()
                return NextResponse.json({
                    ...openResult,
                    ...getSessionInfo()
                })

            case 'admin-start-game':
                // Admin kích hoạt game - bắt đầu chơi
                const startResult = adminStartGame()
                return NextResponse.json({
                    ...startResult,
                    ...getSessionInfo()
                })

            case 'admin-pause':
                // Admin tạm dừng game
                const pauseResult = adminPauseGame()
                return NextResponse.json({
                    ...pauseResult,
                    ...getSessionInfo()
                })

            case 'admin-resume':
                // Admin tiếp tục game
                const resumeResult = adminResumeGame()
                return NextResponse.json({
                    ...resumeResult,
                    ...getSessionInfo()
                })

            default:
                return NextResponse.json({ 
                    success: false, 
                    error: 'Unknown action' 
                }, { status: 400 })
        }
    } catch (error) {
        console.error('Game session API error:', error)
        return NextResponse.json({ 
            success: false, 
            error: 'Internal server error' 
        }, { status: 500 })
    }
}
