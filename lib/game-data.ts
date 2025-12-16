// Game data types
export interface Choice {
    id: 'A' | 'B' | 'C' | 'D'
    text: string
    shortText: string // ≤7 từ
    consequence: string
    impact: {
        economy: number // -2 to +2
        equality: number // -2 to +2
        technology: number // -2 to +2
        humanity: number // -2 to +2
    }
    grade: 'best' | 'good' | 'fair' | 'poor' // Mức độ đúng theo Mác-Lênin
    // best = 100đ (đáp án tốt nhất), good = 60đ, fair = 30đ, poor = 0đ
}

export interface Room {
    id: number
    title: string
    theme: string
    icon: string
    description: string
    question: string
    choices: Choice[]
    ambientColor: string // Màu ánh sáng phòng
    timeLimit: number // Seconds for discussion
    dilemma: string // Core tension/dilemma
    funFact: string // Interesting fact related to topic
    bonusPoints?: number // Điểm bonus nếu hoàn thành nhanh (optional, default 50)
    correctAnswer: 'A' | 'B' | 'C' | 'D' // Đáp án đúng theo quan điểm MLN
    answerExplanation: string // Giải thích vì sao đáp án này đúng
}

// Team data
export interface Team {
    id: number
    name: string
    color: string
    icon: string
    description: string
    specialty: string // Lợi thế của team
    bonus: {
        stat: 'economy' | 'equality' | 'technology' | 'humanity'
        value: number
    }
}

// Player stats
export interface GameStats {
    economy: number // 0-100
    equality: number // 0-100
    technology: number // 0-100
    humanity: number // 0-100
}

// Scoring system
export interface ScoreBreakdown {
    basePoints: number // Điểm từ lựa chọn
    timeBonus: number // Bonus từ thời gian nhanh
    streakBonus: number // Bonus từ streak
    teamBonus: number // Bonus từ team specialty
    achievementPoints: number // Điểm từ achievements
    balanceBonus: number // Bonus nếu stats cân bằng
    correctAnswerBonus: number // Điểm bonus từ đáp án đúng
    correctCount: number // Số câu trả lời đúng
    total: number
}

// Game rank
export interface GameRank {
    id: string
    name: string
    minScore: number
    color: string
    icon: string
}

// Leaderboard entry
export interface LeaderboardEntry {
    teamId: number
    teamName: string
    score: number
    rank: GameRank
    isPlayer: boolean
    position?: number
}

// Team result for leaderboard
export interface TeamResult {
    teamId: number
    teamName: string
    teamIcon: string
    teamColor: string
    score: number
    rank: string
    stats: GameStats
    choices: Record<number, 'A' | 'B' | 'C' | 'D'>
    completedAt: number // timestamp
}

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    points: number // Điểm thưởng
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
    condition: (choices: Record<number, 'A' | 'B' | 'C' | 'D'>, stats: GameStats, timeSpent: number) => boolean
    unlocked?: boolean
}

export interface GameState {
    currentRoom: number
    choices: Record<number, 'A' | 'B' | 'C' | 'D'>
    isComplete: boolean
    teamId: number | null
    teamName: string | null
    stats: GameStats
    achievements: string[]
    timeSpent: number // Total seconds
    roomTimes: number[] // Thời gian mỗi phòng
    score: ScoreBreakdown | null
}

export interface Ending {
    id: string
    title: string
    description: string
    icon: string
    color: string
}

// 6 Teams - Đại diện các nhóm lợi ích khác nhau
export const teams: Team[] = [
    {
        id: 1,
        name: 'Tư bản Công nghệ',
        color: '#4F46E5',
        icon: '💰',
        description: 'Đại diện cho các tập đoàn công nghệ lớn, startup và nhà đầu tư.',
        specialty: 'Ưu tiên đổi mới sáng tạo và tăng trưởng kinh tế.',
        bonus: { stat: 'economy', value: 10 }
    },
    {
        id: 2,
        name: 'Công đoàn Lao động',
        color: '#EF4444',
        icon: '✊',
        description: 'Đại diện quyền lợi người lao động, bảo vệ việc làm.',
        specialty: 'Ưu tiên công bằng xã hội và an sinh.',
        bonus: { stat: 'equality', value: 10 }
    },
    {
        id: 3,
        name: 'Nhà nước',
        color: '#F59E0B',
        icon: '🏛️',
        description: 'Cơ quan quản lý, hoạch định chính sách và điều tiết.',
        specialty: 'Cân bằng các lợi ích, đảm bảo ổn định.',
        bonus: { stat: 'humanity', value: 5 }
    },
    {
        id: 4,
        name: 'Startup Việt',
        color: '#10B981',
        icon: '🚀',
        description: 'Đại diện các doanh nghiệp công nghệ nội địa.',
        specialty: 'Ưu tiên tự chủ công nghệ và sáng tạo.',
        bonus: { stat: 'technology', value: 10 }
    },
    {
        id: 5,
        name: 'Sinh viên & Giới trẻ',
        color: '#8B5CF6',
        icon: '🎓',
        description: 'Thế hệ tương lai, những người sẽ sống với hệ quả.',
        specialty: 'Ưu tiên giáo dục và cơ hội phát triển.',
        bonus: { stat: 'humanity', value: 10 }
    },
    {
        id: 6,
        name: 'Người tiêu dùng',
        color: '#0EA5E9',
        icon: '🛒',
        description: 'Đại diện hàng triệu người dùng công nghệ hàng ngày.',
        specialty: 'Ưu tiên tiện ích và quyền lợi người dùng.',
        bonus: { stat: 'equality', value: 5 }
    },
]

// Achievements - với điểm thưởng và độ hiếm
export const achievements: Achievement[] = [
    {
        id: 'tech-lover',
        title: 'Người yêu công nghệ',
        description: 'Chọn A ở tất cả các phòng',
        icon: '🤖',
        points: 100,
        rarity: 'rare',
        condition: (choices) => Object.values(choices).length === 4 && Object.values(choices).every(c => c === 'A'),
    },
    {
        id: 'humanist',
        title: 'Nhà nhân văn',
        description: 'Chọn B ở tất cả các phòng',
        icon: '❤️',
        points: 100,
        rarity: 'rare',
        condition: (choices) => Object.values(choices).length === 4 && Object.values(choices).every(c => c === 'B'),
    },
    {
        id: 'balanced',
        title: 'Người cân bằng',
        description: 'Chọn đều 2A và 2B',
        icon: '⚖️',
        points: 150,
        rarity: 'epic',
        condition: (choices) => {
            const values = Object.values(choices)
            return values.length === 4 && values.filter(c => c === 'A').length === 2 && values.filter(c => c === 'B').length === 2
        },
    },
    {
        id: 'speed-runner',
        title: 'Tốc độ ánh sáng',
        description: 'Hoàn thành trong dưới 3 phút',
        icon: '⚡',
        points: 200,
        rarity: 'epic',
        condition: (_, __, timeSpent) => timeSpent < 180,
    },
    {
        id: 'thoughtful',
        title: 'Người suy nghĩ',
        description: 'Dành ít nhất 1 phút mỗi phòng',
        icon: '🧠',
        points: 50,
        rarity: 'common',
        condition: (_, __, timeSpent) => timeSpent >= 240,
    },
    {
        id: 'utopia',
        title: 'Thế giới lý tưởng',
        description: 'Đạt tất cả chỉ số trên 60',
        icon: '🌟',
        points: 300,
        rarity: 'legendary',
        condition: (_, stats) => stats.economy >= 60 && stats.equality >= 60 && stats.technology >= 60 && stats.humanity >= 60,
    },
    {
        id: 'dystopia',
        title: 'Thế giới nghiệt ngã',
        description: 'Có chỉ số dưới 30',
        icon: '💀',
        points: 50,
        rarity: 'common',
        condition: (_, stats) => stats.economy < 30 || stats.equality < 30 || stats.technology < 30 || stats.humanity < 30,
    },
    {
        id: 'economist',
        title: 'Nhà kinh tế',
        description: 'Đạt Kinh tế trên 80',
        icon: '💰',
        points: 75,
        rarity: 'rare',
        condition: (_, stats) => stats.economy >= 80,
    },
    {
        id: 'equalizer',
        title: 'Người công bằng',
        description: 'Đạt Công bằng trên 80',
        icon: '⚖️',
        points: 75,
        rarity: 'rare',
        condition: (_, stats) => stats.equality >= 80,
    },
    {
        id: 'innovator',
        title: 'Nhà đổi mới',
        description: 'Đạt Công nghệ trên 80',
        icon: '🔬',
        points: 75,
        rarity: 'rare',
        condition: (_, stats) => stats.technology >= 80,
    },
    {
        id: 'humanitarian',
        title: 'Nhà nhân đạo',
        description: 'Đạt Nhân văn trên 80',
        icon: '🕊️',
        points: 75,
        rarity: 'rare',
        condition: (_, stats) => stats.humanity >= 80,
    },
    {
        id: 'perfectionist',
        title: 'Hoàn hảo',
        description: 'Đạt tổng điểm trên 1000',
        icon: '👑',
        points: 500,
        rarity: 'legendary',
        condition: () => false, // Checked separately based on score
    },
]

// Game Rules - cập nhật với hệ thống Spectrum
export const gameRules = [
    {
        icon: '👥',
        title: '6 đội cạnh tranh',
        description: 'Mỗi đội sẽ thi đua để đạt điểm cao nhất và xây dựng thế giới tốt nhất.',
    },
    {
        icon: '🎯',
        title: 'Thang điểm Spectrum',
        description: '🏆 Tốt nhất: 100đ | 🥈 Khá: 60đ | 🥉 Tạm: 30đ | ❌ Kém: 0đ',
    },
    {
        icon: '📚',
        title: 'Đánh giá theo Mác-Lênin',
        description: 'Điểm dựa trên mức độ phù hợp với quan điểm tiến bộ.',
    },
    {
        icon: '⏱️',
        title: 'Bonus thời gian',
        description: 'Quyết định nhanh = thêm điểm bonus. Nhưng đừng vội vàng!',
    },
    {
        icon: '📊',
        title: 'Xếp hạng S-D',
        description: 'Cuối game sẽ xếp hạng dựa trên tổng điểm: S (>1000), A (>800), B (>600), C (>400), D.',
    },
    {
        icon: '⚔️',
        title: 'So sánh kết quả',
        description: 'Xem team nào có thế giới cân bằng nhất và điểm cao nhất!',
    },
]

// Kịch bản 4 phòng
export const rooms: Room[] = [
    {
        id: 1,
        title: 'AI & Tự động hóa',
        theme: 'automation',
        icon: '🤖',
        description: 'Bạn bước vào nhà máy. Robot đang thay thế công nhân. Năng suất tăng, nhưng hàng nghìn người mất việc.',
        question: 'Xã hội nên ứng xử với tự động hóa như thế nào?',
        dilemma: 'Tiến bộ công nghệ vs An sinh xã hội',
        funFact: '📊 Theo WEF, đến 2025, AI sẽ thay thế 85 triệu việc làm nhưng tạo ra 97 triệu việc làm mới.',
        timeLimit: 120,
        bonusPoints: 50,
        choices: [
            {
                id: 'A',
                text: 'Tự động hóa toàn diện - Để thị trường tự điều chỉnh, ai không thích nghi thì bị đào thải.',
                shortText: 'Thị trường quyết định',
                consequence: 'Năng suất tăng vọt 500%. Thất nghiệp 40%. Bất ổn xã hội nghiêm trọng.',
                impact: { economy: 2, equality: -2, technology: 2, humanity: -2 },
                grade: 'poor', // Tư duy tư bản hoang dã - bỏ mặc người lao động
            },
            {
                id: 'B',
                text: 'Cấm tự động hóa - Bảo vệ việc làm bằng mọi giá, hạn chế robot trong sản xuất.',
                shortText: 'Cấm robot',
                consequence: 'Việc làm được giữ nhưng năng suất thấp. Doanh nghiệp chuyển sang nước khác.',
                impact: { economy: -2, equality: 1, technology: -2, humanity: 1 },
                grade: 'fair', // Bảo vệ lao động nhưng cản trở tiến bộ
            },
            {
                id: 'C',
                text: 'Tự động hóa có kiểm soát - Nhà nước quản lý chuyển đổi, đào tạo lại lao động, chia sẻ lợi ích.',
                shortText: 'Chuyển đổi có quản lý',
                consequence: 'Năng suất tăng 200%. Lao động được đào tạo lại. An sinh xã hội được đảm bảo.',
                impact: { economy: 1, equality: 2, technology: 1, humanity: 2 },
                grade: 'best', // Đúng quan điểm MLN - Nhà nước dẫn dắt
            },
            {
                id: 'D',
                text: 'Thuế robot - Đánh thuế doanh nghiệp sử dụng robot để tài trợ UBI (thu nhập cơ bản phổ quát).',
                shortText: 'Thuế robot + UBI',
                consequence: 'Nguồn thu mới cho an sinh. Một số doanh nghiệp phản đối, đe dọa rời đi.',
                impact: { economy: 0, equality: 2, technology: 0, humanity: 1 },
                grade: 'good', // Tốt nhưng chưa toàn diện như C
            },
        ],
        ambientColor: '#4F46E5',
        correctAnswer: 'C',
        answerExplanation: 'Theo quan điểm Mác-Lênin, lực lượng sản xuất (công nghệ) phải phục vụ quan hệ sản xuất tiến bộ. Đáp án C thể hiện vai trò của Nhà nước trong quản lý chuyển đổi số: không cấm đoán tiến bộ (như B), không để thị trường tự do hoang dã (như A), mà chủ động dẫn dắt, đào tạo lại lao động, và đảm bảo lợi ích từ năng suất tăng được chia sẻ công bằng cho toàn xã hội.',
    },
    {
        id: 2,
        title: 'Dữ liệu & Nền tảng',
        theme: 'data',
        icon: '📊',
        description: 'Bạn đến trung tâm dữ liệu. Mọi hành vi của bạn đều được thu thập. Big Tech biết bạn muốn gì trước cả bạn.',
        question: 'Xã hội nên quản lý dữ liệu cá nhân như thế nào?',
        dilemma: 'Tiện ích miễn phí vs Quyền riêng tư',
        funFact: '🔒 Mỗi ngày, Facebook thu thập 2.8 petabytes dữ liệu người dùng.',
        timeLimit: 120,
        bonusPoints: 50,
        choices: [
            {
                id: 'A',
                text: 'Tự do hoàn toàn - Để thị trường tự quyết định, ai muốn đổi dữ liệu lấy dịch vụ thì cứ đổi.',
                shortText: 'Thị trường tự do',
                consequence: 'Big Tech thống trị. Người dùng mất kiểm soát dữ liệu. Thao túng thông tin tràn lan.',
                impact: { economy: 1, equality: -2, technology: 1, humanity: -2 },
                grade: 'poor', // Để tư bản khai thác dữ liệu tự do
            },
            {
                id: 'B',
                text: 'Cấm thu thập dữ liệu - Bảo vệ tuyệt đối quyền riêng tư, cấm mọi hình thức thu thập.',
                shortText: 'Cấm thu thập',
                consequence: 'Quyền riêng tư được bảo vệ tuyệt đối, nhưng nhiều dịch vụ số không thể hoạt động.',
                impact: { economy: -2, equality: 1, technology: -2, humanity: 1 },
                grade: 'fair', // Cực đoan, cản trở phát triển
            },
            {
                id: 'C',
                text: 'Luật bảo vệ dữ liệu mạnh - Như GDPR: người dùng kiểm soát, doanh nghiệp phải xin phép.',
                shortText: 'Luật bảo vệ (GDPR)',
                consequence: 'Người dùng có quyền kiểm soát. Big Tech phải minh bạch. Chi phí tuân thủ tăng.',
                impact: { economy: 0, equality: 2, technology: 0, humanity: 2 },
                grade: 'best', // Trao quyền cho người dân, minh bạch
            },
            {
                id: 'D',
                text: 'Dữ liệu là tài sản công - Nhà nước quản lý dữ liệu, chia sẻ lợi ích cho toàn dân.',
                shortText: 'Dữ liệu công cộng',
                consequence: 'Lợi ích từ dữ liệu được chia sẻ. Lo ngại về giám sát nhà nước tăng.',
                impact: { economy: 0, equality: 1, technology: 1, humanity: 0 },
                grade: 'good', // Ý tưởng tốt nhưng cần cân nhắc quyền riêng tư
            },
        ],
        ambientColor: '#0EA5E9',
        correctAnswer: 'C',
        answerExplanation: 'Dữ liệu cá nhân là "dầu mỏ mới" của thế kỷ 21. Đáp án C (mô hình GDPR) là cân bằng tốt nhất: không cấm đoán cực đoan (B), không để thị trường tự do hoang dã (A), mà trao quyền kiểm soát cho người dùng. Đây là cách tiếp cận tiến bộ của EU - buộc Big Tech phải minh bạch, xin phép trước khi thu thập, và cho phép người dùng "quyền được quên". Việt Nam cũng đang xây dựng Luật Bảo vệ dữ liệu cá nhân theo hướng này.',
    },
    {
        id: 3,
        title: 'Lao động & Bất bình đẳng',
        theme: 'inequality',
        icon: '⚖️',
        description: 'Bạn thấy hai thế giới: Khu công nghệ với lương cao, và khu lao động với đồng lương tối thiểu. Khoảng cách ngày càng xa.',
        question: 'Xã hội nên giải quyết bất bình đẳng như thế nào?',
        dilemma: 'Tự do thị trường vs Công bằng xã hội',
        funFact: '💰 Top 1% người giàu nhất sở hữu nhiều tài sản hơn 6.9 tỷ người còn lại.',
        timeLimit: 120,
        bonusPoints: 50,
        choices: [
            {
                id: 'A',
                text: 'Tự do thị trường tuyệt đối - Cạnh tranh tự nhiên, ai giỏi thì giàu, không can thiệp.',
                shortText: 'Thị trường tự do',
                consequence: 'GDP tăng mạnh. Top 1% sở hữu 60% tài sản. Bất ổn xã hội, tội phạm gia tăng.',
                impact: { economy: 2, equality: -2, technology: 1, humanity: -2 },
                grade: 'poor', // CNTB hoang dã - Mác phê phán
            },
            {
                id: 'B',
                text: 'Bình quân chủ nghĩa - Chia đều tài sản, không ai được giàu hơn ai.',
                shortText: 'Chia đều tất cả',
                consequence: 'Bình đẳng tuyệt đối. Không còn động lực phấn đấu. Kinh tế trì trệ.',
                impact: { economy: -2, equality: 2, technology: -1, humanity: 0 },
                grade: 'fair', // Bình quân chủ nghĩa - không phải MLN đích thực
            },
            {
                id: 'C',
                text: 'Thuế luỹ tiến + Phúc lợi - Người giàu đóng nhiều hơn, đảm bảo y tế-giáo dục miễn phí.',
                shortText: 'Thuế + Phúc lợi',
                consequence: 'Bất bình đẳng giảm. Cơ hội bình đẳng cho mọi người. Kinh tế ổn định.',
                impact: { economy: 1, equality: 2, technology: 0, humanity: 2 },
                grade: 'best', // Mô hình Bắc Âu - phân phối lại công bằng
            },
            {
                id: 'D',
                text: 'Đào tạo kỹ năng số - Tập trung nâng cao năng lực để mọi người tự nâng mình lên.',
                shortText: 'Đào tạo kỹ năng',
                consequence: 'Lao động có kỹ năng cao hơn. Nhưng không giải quyết gốc rễ bất bình đẳng cấu trúc.',
                impact: { economy: 1, equality: 0, technology: 1, humanity: 1 },
                grade: 'good', // Tốt nhưng không đủ - chỉ giải quyết bề mặt
            },
        ],
        ambientColor: '#F59E0B',
        correctAnswer: 'C',
        answerExplanation: 'Mác chỉ ra: trong CNTB, cạnh tranh tự do dẫn đến tích tụ tư bản và bất bình đẳng ngày càng sâu (A). Bình quân chủ nghĩa (B) cũng không phải giải pháp vì triệt tiêu động lực. Đáp án C - thuế luỹ tiến kết hợp phúc lợi xã hội (y tế, giáo dục miễn phí) - là mô hình Bắc Âu đã chứng minh thành công: vừa tăng trưởng ổn định, vừa đảm bảo công bằng. Đào tạo kỹ năng (D) cần thiết nhưng không đủ nếu không có cơ chế phân phối lại.',
    },
    {
        id: 4,
        title: 'Thể chế & Tương lai',
        theme: 'governance',
        icon: '🏛️',
        description: 'Cuối hành trình, bạn đứng trước ngã ba. Những lựa chọn trước đó đã định hình thế giới này.',
        question: 'Việt Nam nên định hướng chiến lược công nghệ như thế nào?',
        dilemma: 'Đi tắt đón đầu vs Phát triển bền vững',
        funFact: '🇻🇳 Việt Nam đứng top 3 ASEAN về thu hút đầu tư FDI vào công nghệ cao.',
        timeLimit: 120,
        bonusPoints: 100, // Phòng cuối bonus cao hơn
        choices: [
            {
                id: 'A',
                text: 'Đi tắt đón đầu - Nhập khẩu công nghệ mới nhất, bỏ qua các bước trung gian.',
                shortText: 'Nhập khẩu công nghệ',
                consequence: 'Nhanh chóng tiếp cận công nghệ mới. Nhưng phụ thuộc nước ngoài, mất chủ quyền số.',
                impact: { economy: 2, equality: -1, technology: 1, humanity: -1 },
                grade: 'fair', // Nhanh nhưng không bền vững, mất tự chủ
            },
            {
                id: 'B',
                text: 'Đóng cửa bảo hộ - Phát triển công nghệ trong nước, hạn chế du nhập từ bên ngoài.',
                shortText: 'Bảo hộ trong nước',
                consequence: 'Tự chủ công nghệ. Nhưng tụt hậu so với thế giới, không cạnh tranh được.',
                impact: { economy: -1, equality: 0, technology: -1, humanity: 1 },
                grade: 'poor', // Bế quan tỏa cảng - bài học lịch sử
            },
            {
                id: 'C',
                text: 'Kết hợp sức mạnh dân tộc + thời đại - Tiếp thu có chọn lọc, làm chủ công nghệ lõi.',
                shortText: 'Kết hợp + Làm chủ',
                consequence: 'Phát triển bền vững, chủ động công nghệ, giữ bản sắc. Cần thời gian dài.',
                impact: { economy: 1, equality: 2, technology: 2, humanity: 2 },
                grade: 'best', // Đúng đường lối Đảng
            },
            {
                id: 'D',
                text: 'Trở thành công xưởng thế giới - Thu hút FDI tối đa, trở thành base sản xuất toàn cầu.',
                shortText: 'Công xưởng thế giới',
                consequence: 'Việc làm tăng, GDP tăng. Nhưng giá trị gia tăng thấp, ô nhiễm môi trường.',
                impact: { economy: 2, equality: 0, technology: 0, humanity: -1 },
                grade: 'good', // Tốt nhưng chỉ làm gia công cho nước ngoài
            },
        ],
        ambientColor: '#10B981',
        correctAnswer: 'C',
        answerExplanation: 'Đường lối của Đảng ta: "Kết hợp sức mạnh dân tộc với sức mạnh thời đại". Đáp án C thể hiện đúng tinh thần này: không đóng cửa bảo hộ (B), không phụ thuộc hoàn toàn (A), không chỉ làm gia công (D). Mà tiếp thu có chọn lọc tinh hoa thế giới, đồng thời xây dựng năng lực tự chủ, làm chủ công nghệ lõi (AI, chip, an ninh mạng), phát triển vì lợi ích nhân dân, không vì lợi nhuận tập đoàn nước ngoài.',
    },
]

// Tính toán stats từ choices
export function calculateStats(choices: Record<number, 'A' | 'B' | 'C' | 'D'>, team: Team | null): GameStats {
    let stats: GameStats = {
        economy: 50,
        equality: 50,
        technology: 50,
        humanity: 50,
    }

    // Apply team bonus
    if (team) {
        stats[team.bonus.stat] += team.bonus.value
    }

    // Apply choice impacts
    Object.entries(choices).forEach(([roomId, choice]) => {
        const room = rooms.find(r => r.id === parseInt(roomId))
        if (room) {
            const selectedChoice = room.choices.find(c => c.id === choice)
            if (selectedChoice) {
                stats.economy = Math.max(0, Math.min(100, stats.economy + selectedChoice.impact.economy * 10))
                stats.equality = Math.max(0, Math.min(100, stats.equality + selectedChoice.impact.equality * 10))
                stats.technology = Math.max(0, Math.min(100, stats.technology + selectedChoice.impact.technology * 10))
                stats.humanity = Math.max(0, Math.min(100, stats.humanity + selectedChoice.impact.humanity * 10))
            }
        }
    })

    return stats
}

// Check achievements
export function checkAchievements(choices: Record<number, 'A' | 'B' | 'C' | 'D'>, stats: GameStats, timeSpent: number = 0): string[] {
    return achievements
        .filter(a => a.condition(choices, stats, timeSpent))
        .map(a => a.id)
}

// ===== HỆ THỐNG TÍNH ĐIỂM =====

// Hạng game dựa trên tổng điểm
export const gameRanks: GameRank[] = [
    { id: 'bronze', name: 'Đồng', minScore: 0, color: '#CD7F32', icon: '🥉' },
    { id: 'silver', name: 'Bạc', minScore: 500, color: '#C0C0C0', icon: '🥈' },
    { id: 'gold', name: 'Vàng', minScore: 1000, color: '#FFD700', icon: '🥇' },
    { id: 'platinum', name: 'Bạch kim', minScore: 1500, color: '#E5E4E2', icon: '💎' },
    { id: 'diamond', name: 'Kim cương', minScore: 2000, color: '#B9F2FF', icon: '👑' },
]

// Hàm helper: chuyển grade sang điểm
export function gradeToPoints(grade: 'best' | 'good' | 'fair' | 'poor'): number {
    switch (grade) {
        case 'best': return 100
        case 'good': return 60
        case 'fair': return 30
        case 'poor': return 0
    }
}

// Hàm helper: lấy label tiếng Việt cho grade
export function gradeToLabel(grade: 'best' | 'good' | 'fair' | 'poor'): { text: string; emoji: string; color: string } {
    switch (grade) {
        case 'best': return { text: 'Tốt nhất', emoji: '🏆', color: 'text-green-400' }
        case 'good': return { text: 'Khá', emoji: '🥈', color: 'text-blue-400' }
        case 'fair': return { text: 'Tạm được', emoji: '🥉', color: 'text-amber-400' }
        case 'poor': return { text: 'Chưa tốt', emoji: '❌', color: 'text-red-400' }
    }
}

// Tính điểm chi tiết
export function calculateScore(
    choices: Record<number, 'A' | 'B' | 'C' | 'D'>,
    team: Team | null,
    timeSpent: number,
    earnedAchievements: string[],
    streak: number
): ScoreBreakdown {
    // 1. Base points từ choices (dùng grade system)
    let basePoints = 0
    let correctCount = 0
    Object.entries(choices).forEach(([roomId, choiceId]) => {
        const room = rooms.find(r => r.id === parseInt(roomId))
        if (room) {
            const choice = room.choices.find(c => c.id === choiceId)
            if (choice) {
                // Tính điểm theo grade
                basePoints += gradeToPoints(choice.grade)
                // Đếm số câu "best"
                if (choice.grade === 'best') {
                    correctCount++
                }
            }
            // Bonus từ phòng
            basePoints += room.bonusPoints || 0
        }
    })

    // 2. Time bonus: Hoàn thành càng nhanh càng được nhiều điểm
    // Max 400 điểm nếu hoàn thành trong 2 phút, giảm dần
    const maxTime = 4 * 60 // 4 phút cho 4 phòng
    const timeBonus = Math.max(0, Math.floor((1 - timeSpent / maxTime) * 400))

    // 3. Streak bonus: Mỗi lựa chọn "best" liên tiếp +50 điểm
    const streakBonus = streak * 50

    // 4. Team bonus: Bonus từ team được chọn
    const teamBonus = team?.bonus.value ? team.bonus.value * 20 : 0

    // 5. Achievement points
    let achievementPoints = 0
    earnedAchievements.forEach(achId => {
        const ach = achievements.find(a => a.id === achId)
        if (ach) {
            achievementPoints += ach.points || 50
        }
    })

    // 6. Balance bonus: Điểm thưởng nếu stats cân bằng
    const stats = calculateStats(choices, team)
    const avgStat = (stats.economy + stats.equality + stats.technology + stats.humanity) / 4
    const variance = Math.abs(stats.economy - avgStat) + Math.abs(stats.equality - avgStat) +
        Math.abs(stats.technology - avgStat) + Math.abs(stats.humanity - avgStat)
    const balanceBonus = variance < 40 ? 100 : variance < 80 ? 50 : 0

    // 7. Correct answer bonus: +100 điểm cho mỗi đáp án "best" 
    // (đã tính trong basePoints, thêm bonus nếu đạt 4/4)
    const correctAnswerBonus = correctCount === 4 ? 200 : 0 // Perfect bonus

    // Tổng điểm
    const total = basePoints + timeBonus + streakBonus + teamBonus + achievementPoints + balanceBonus + correctAnswerBonus

    return {
        basePoints,
        timeBonus,
        streakBonus,
        teamBonus,
        achievementPoints,
        balanceBonus,
        correctAnswerBonus,
        correctCount,
        total,
    }
}

// Xác định hạng dựa trên điểm
export function getGameRank(score: number): GameRank {
    // Sắp xếp giảm dần theo minScore để tìm hạng cao nhất đạt được
    const sortedRanks = [...gameRanks].sort((a, b) => b.minScore - a.minScore)
    for (const rank of sortedRanks) {
        if (score >= rank.minScore) {
            return rank
        }
    }
    return gameRanks[0] // Bronze mặc định
}

// Tính điểm team trung bình (cho bảng xếp hạng giả lập)
export function generateTeamLeaderboard(playerScore: number, playerTeam: Team | null): LeaderboardEntry[] {
    const leaderboard: LeaderboardEntry[] = []

    // Thêm điểm người chơi
    if (playerTeam) {
        leaderboard.push({
            teamId: playerTeam.id,
            teamName: playerTeam.name,
            score: playerScore,
            rank: getGameRank(playerScore),
            isPlayer: true,
        })
    }

    // Giả lập điểm các team khác (random quanh điểm người chơi)
    teams.filter(t => t.id !== playerTeam?.id).forEach(team => {
        const variance = Math.floor(Math.random() * 600) - 300 // ±300 điểm
        const teamScore = Math.max(0, playerScore + variance)
        leaderboard.push({
            teamId: team.id,
            teamName: team.name,
            score: teamScore,
            rank: getGameRank(teamScore),
            isPlayer: false,
        })
    })

    // Sắp xếp theo điểm giảm dần
    leaderboard.sort((a, b) => b.score - a.score)

    // Gán vị trí
    return leaderboard.map((entry, index) => ({
        ...entry,
        position: index + 1,
    }))
}

// Tính toán kết thúc dựa trên lựa chọn và stats
export function calculateEnding(choices: Record<number, 'A' | 'B' | 'C' | 'D'>, stats: GameStats): Ending {
    const aCount = Object.values(choices).filter(c => c === 'A').length
    const bCount = Object.values(choices).filter(c => c === 'B').length

    // More nuanced ending based on stats
    if (stats.technology >= 70 && stats.economy >= 70) {
        return {
            id: 'techno-capitalist',
            title: '🏙️ Siêu đô thị Công nghệ',
            description: 'Thế giới của bạn là một siêu đô thị rực rỡ ánh đèn neon. AI và robot phục vụ mọi nhu cầu. Kinh tế bùng nổ, nhưng chỉ những ai có kỹ năng cao mới thành công. Đây là tương lai mà Thung lũng Silicon mơ ước - hiệu quả tuyệt đối, nhưng không phải ai cũng có chỗ đứng.',
            icon: '🌃',
            color: 'primary',
        }
    } else if (stats.equality >= 70 && stats.humanity >= 70) {
        return {
            id: 'humanist-utopia',
            title: '🌳 Xã hội Nhân văn',
            description: 'Thế giới của bạn đặt con người làm trung tâm. Công nghệ phục vụ cộng đồng, không phải lợi nhuận. Mọi người có việc làm có ý nghĩa, dù không phải ai cũng giàu có. Đây là viễn cảnh của những người tin rằng tiến bộ phải đi đôi với công bằng.',
            icon: '🌻',
            color: 'system',
        }
    } else if (aCount >= 3) {
        return {
            id: 'techno-optimist',
            title: '🚀 Người lạc quan Công nghệ',
            description: 'Bạn tin vào tiến bộ công nghệ như động lực phát triển. Thế giới của bạn tăng trưởng nhanh, nhưng không phải ai cũng được hưởng lợi. Theo Mác, đây là mâu thuẫn cơ bản của CNTB: lực lượng sản xuất phát triển nhưng quan hệ sản xuất vẫn còn bất bình đẳng.',
            icon: '🚀',
            color: 'primary',
        }
    } else if (bCount >= 3) {
        return {
            id: 'humanist',
            title: '🌱 Người Nhân văn',
            description: 'Bạn đặt con người làm trung tâm của phát triển. Thế giới của bạn ổn định và công bằng hơn, dù có thể chậm hơn trong cuộc đua công nghệ. Theo quan điểm Mác-Lênin, đây là hướng đi phù hợp với mục tiêu CNXH: phát triển vì con người.',
            icon: '🌱',
            color: 'system',
        }
    } else {
        return {
            id: 'pragmatist',
            title: '⚖️ Người Thực dụng',
            description: 'Bạn cân bằng giữa tiến bộ và công bằng. Thế giới của bạn không cực đoan theo hướng nào. Đây phản ánh thực tiễn Việt Nam: kết hợp kinh tế thị trường định hướng XHCN, tiếp thu công nghệ nhưng giữ bản sắc.',
            icon: '⚖️',
            color: 'accent',
        }
    }
}

// Stat labels and colors
export const statConfig = {
    economy: { label: 'Kinh tế', icon: '📈', color: '#10B981' },
    equality: { label: 'Công bằng', icon: '⚖️', color: '#8B5CF6' },
    technology: { label: 'Công nghệ', icon: '🔧', color: '#0EA5E9' },
    humanity: { label: 'Nhân văn', icon: '❤️', color: '#EF4444' },
}

// Text intro/outro
export const gameIntro = {
    title: 'HÀNH TRÌNH CÔNG NGHỆ',
    subtitle: 'Một trải nghiệm tương tác về đứt gãy công nghệ',
    description: 'Bạn sẽ đi qua 4 không gian, đối mặt với 4 quyết định. Mỗi lựa chọn sẽ định hình thế giới của bạn.',
    startButton: 'Bắt đầu hành trình',
}

export const gameOutro = {
    title: 'KẾT THÚC HÀNH TRÌNH',
    message: 'Đứt gãy công nghệ không có đáp án đúng-sai. Chỉ có những lựa chọn và hệ quả. Điều quan trọng là hiểu rõ mâu thuẫn để hành động có ý thức.',
    restartButton: 'Chơi lại',
    learnMoreButton: 'Tìm hiểu thêm',
}
