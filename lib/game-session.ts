// Game Session Management - In-memory store (cho demo)
// Production nên dùng Redis hoặc database

export interface PlayerSession {
    oderId: string // Unique player ID
    teamId: number
    teamName: string
    currentRoom: number
    choices: Record<number, 'A' | 'B' | 'C' | 'D'>
    score: number
    isComplete: boolean
    lastActive: number // timestamp
    joinedAt: number // timestamp
}

export interface GameSession {
    id: string
    createdAt: number
    players: Record<string, PlayerSession> // oderId -> PlayerSession
    takenTeams: number[] // Team IDs đã được chọn
    status: 'lobby' | 'waiting' | 'playing' | 'finished' // lobby = chờ admin kích hoạt
    adminStarted: boolean // Admin đã bấm Start chưa
    gameStartTime: number | null // Thời điểm game bắt đầu
}

// In-memory store - sẽ reset khi server restart
// Production: dùng Redis/MongoDB
let currentSession: GameSession | null = null

// Tạo session ID từ ngày
function generateSessionId(): string {
    const today = new Date()
    return `game-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`
}

// Tạo player ID unique
export function generatePlayerId(): string {
    return `player-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Lấy hoặc tạo session hiện tại
export function getOrCreateSession(): GameSession {
    const sessionId = generateSessionId()
    
    if (!currentSession || currentSession.id !== sessionId) {
        currentSession = {
            id: sessionId,
            createdAt: Date.now(),
            players: {},
            takenTeams: [],
            status: 'lobby', // Bắt đầu ở lobby, chờ admin
            adminStarted: false,
            gameStartTime: null,
        }
    }
    
    return currentSession
}

// Reset session (cho admin)
export function resetSession(): GameSession {
    const sessionId = generateSessionId()
    currentSession = {
        id: sessionId,
        createdAt: Date.now(),
        players: {},
        takenTeams: [],
        status: 'lobby',
        adminStarted: false,
        gameStartTime: null,
    }
    return currentSession
}

// Admin bắt đầu game - cho phép teams vào chọn
export function adminOpenLobby(): { success: boolean; error?: string } {
    const session = getOrCreateSession()
    
    if (session.status !== 'lobby') {
        return { success: false, error: 'Game đã được mở hoặc đang chạy' }
    }
    
    session.status = 'waiting' // Chuyển sang chờ teams
    return { success: true }
}

// Admin kích hoạt game - bắt đầu chơi
export function adminStartGame(): { success: boolean; error?: string } {
    const session = getOrCreateSession()
    
    if (session.status === 'lobby') {
        return { success: false, error: 'Cần mở lobby trước' }
    }
    
    if (session.status === 'playing') {
        return { success: false, error: 'Game đã bắt đầu rồi' }
    }
    
    if (session.takenTeams.length === 0) {
        return { success: false, error: 'Chưa có team nào tham gia' }
    }
    
    session.status = 'playing'
    session.adminStarted = true
    session.gameStartTime = Date.now()
    
    return { success: true }
}

// Admin pause game
export function adminPauseGame(): { success: boolean } {
    const session = getOrCreateSession()
    if (session.status === 'playing') {
        session.status = 'waiting'
        return { success: true }
    }
    return { success: false }
}

// Admin resume game
export function adminResumeGame(): { success: boolean } {
    const session = getOrCreateSession()
    if (session.status === 'waiting' && session.adminStarted) {
        session.status = 'playing'
        return { success: true }
    }
    return { success: false }
}

// Kiểm tra team có available không
export function isTeamAvailable(teamId: number): boolean {
    const session = getOrCreateSession()
    return !session.takenTeams.includes(teamId)
}

// Lấy danh sách teams đã chọn
export function getTakenTeams(): number[] {
    const session = getOrCreateSession()
    // Clean up inactive players (không hoạt động > 5 phút)
    const now = Date.now()
    const timeout = 5 * 60 * 1000 // 5 phút
    
    Object.entries(session.players).forEach(([playerId, player]) => {
        if (now - player.lastActive > timeout && !player.isComplete) {
            // Xóa player không hoạt động
            delete session.players[playerId]
            session.takenTeams = session.takenTeams.filter(t => t !== player.teamId)
        }
    })
    
    return session.takenTeams
}

// Player chọn team
export function joinTeam(playerId: string, teamId: number, teamName: string): { success: boolean; error?: string } {
    const session = getOrCreateSession()
    
    // Kiểm tra lobby đã mở chưa
    if (session.status === 'lobby') {
        return { success: false, error: 'Vui lòng chờ Admin mở phòng chờ' }
    }
    
    // Kiểm tra game đã bắt đầu chưa
    if (session.status === 'playing') {
        return { success: false, error: 'Game đã bắt đầu, không thể tham gia' }
    }
    
    // Kiểm tra player đã có team chưa
    if (session.players[playerId]) {
        return { success: false, error: 'Bạn đã chọn team rồi' }
    }
    
    // Kiểm tra team còn trống không
    if (session.takenTeams.includes(teamId)) {
        return { success: false, error: 'Team này đã có người chọn' }
    }
    
    // Thêm player
    session.players[playerId] = {
        oderId: playerId,
        teamId,
        teamName,
        currentRoom: 1,
        choices: {},
        score: 0,
        isComplete: false,
        lastActive: Date.now(),
        joinedAt: Date.now(),
    }
    
    // Đánh dấu team đã chọn
    session.takenTeams.push(teamId)
    
    // KHÔNG tự động start - chờ admin kích hoạt
    
    return { success: true }
}

// Cập nhật progress của player
export function updatePlayerProgress(
    playerId: string, 
    currentRoom: number, 
    choices: Record<number, 'A' | 'B' | 'C' | 'D'>,
    score: number,
    isComplete: boolean
): boolean {
    const session = getOrCreateSession()
    
    if (!session.players[playerId]) {
        return false
    }
    
    session.players[playerId] = {
        ...session.players[playerId],
        currentRoom,
        choices,
        score,
        isComplete,
        lastActive: Date.now(),
    }
    
    // Kiểm tra nếu tất cả hoàn thành
    const allPlayers = Object.values(session.players)
    if (allPlayers.length > 0 && allPlayers.every(p => p.isComplete)) {
        session.status = 'finished'
    }
    
    return true
}

// Lấy leaderboard realtime
export function getLeaderboard(): Array<{
    teamId: number
    teamName: string
    currentRoom: number
    score: number
    isComplete: boolean
    isOnline: boolean
}> {
    const session = getOrCreateSession()
    const now = Date.now()
    const onlineTimeout = 30 * 1000 // 30 giây
    
    return Object.values(session.players)
        .map(player => ({
            teamId: player.teamId,
            teamName: player.teamName,
            currentRoom: player.currentRoom,
            score: player.score,
            isComplete: player.isComplete,
            isOnline: now - player.lastActive < onlineTimeout,
        }))
        .sort((a, b) => {
            // Sắp xếp: hoàn thành trước, điểm cao hơn, room xa hơn
            if (a.isComplete !== b.isComplete) return a.isComplete ? -1 : 1
            if (a.score !== b.score) return b.score - a.score
            return b.currentRoom - a.currentRoom
        })
}

// Lấy thông tin session đầy đủ
export function getSessionInfo(): {
    sessionId: string
    status: 'lobby' | 'waiting' | 'playing' | 'finished'
    takenTeams: number[]
    playerCount: number
    leaderboard: ReturnType<typeof getLeaderboard>
    adminStarted: boolean
    gameStartTime: number | null
    canJoin: boolean // Teams có thể join không
    canPlay: boolean // Có thể chơi không
} {
    const session = getOrCreateSession()
    return {
        sessionId: session.id,
        status: session.status,
        takenTeams: getTakenTeams(),
        playerCount: Object.keys(session.players).length,
        leaderboard: getLeaderboard(),
        adminStarted: session.adminStarted,
        gameStartTime: session.gameStartTime,
        canJoin: session.status === 'waiting', // Chỉ join được khi admin đã mở lobby
        canPlay: session.status === 'playing', // Chỉ chơi được khi admin đã start
    }
}

// Heartbeat - player còn active
export function heartbeat(playerId: string): boolean {
    const session = getOrCreateSession()
    if (session.players[playerId]) {
        session.players[playerId].lastActive = Date.now()
        return true
    }
    return false
}

// Player rời game
export function leaveGame(playerId: string): boolean {
    const session = getOrCreateSession()
    const player = session.players[playerId]
    
    if (!player) return false
    
    // Xóa team khỏi danh sách đã chọn
    session.takenTeams = session.takenTeams.filter(t => t !== player.teamId)
    
    // Xóa player
    delete session.players[playerId]
    
    return true
}
