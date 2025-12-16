'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { Room3DScene, GameUI, ConsequenceModal, GameIntro, GameEnding } from '@/components/game'
import { StatsHUD } from './StatsDisplay'
import { Timer, DilemmaCard, RoomTransition, AchievementPopup } from './GameElements'
import { LiveLeaderboard } from './LiveLeaderboard'
import { useGameSession } from '@/lib/use-game-session'
import { gradeToPoints } from '@/lib/game-data'
import { 
  rooms, 
  calculateEnding, 
  calculateStats, 
  checkAchievements,
  calculateScore,
  getGameRank,
  generateTeamLeaderboard,
  achievements,
  type GameState, 
  type Choice, 
  type Team, 
  teams 
} from '@/lib/game-data'

type GamePhase = 'intro' | 'playing' | 'consequence' | 'ending' | 'transition'

interface UnlockedAchievement {
  id: string
  title: string
  icon: string
}

export default function TechJourneyGame() {
  // Multiplayer session
  const { 
    playerId, 
    sessionInfo, 
    joinTeam, 
    updateProgress, 
    resetSession,
    isLoading: isSessionLoading 
  } = useGameSession()

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    currentRoom: 0,
    choices: {},
    isComplete: false,
    teamId: null,
    teamName: null,
    stats: { economy: 50, equality: 50, technology: 50, humanity: 50 },
    achievements: [],
    timeSpent: 0,
    roomTimes: [],
    score: null,
  })

  const [phase, setPhase] = useState<GamePhase>('intro')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentChoice, setCurrentChoice] = useState<Choice | null>(null)
  const [showAchievement, setShowAchievement] = useState<UnlockedAchievement | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [streak, setStreak] = useState(0)
  const [lastChoice, setLastChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Current room data
  const currentRoom = rooms[gameState.currentRoom]

  // Current team
  const currentTeam = gameState.teamId ? teams.find(t => t.id === gameState.teamId) : null

  // Calculate current score using grade system
  const currentScore = useMemo(() => {
    if (Object.keys(gameState.choices).length === 0) return 0
    
    let score = 0
    Object.entries(gameState.choices).forEach(([roomId, choiceId]) => {
      const room = rooms.find(r => r.id === parseInt(roomId))
      if (room) {
        const choice = room.choices.find(c => c.id === choiceId)
        if (choice) {
          score += gradeToPoints(choice.grade)
        }
        score += room.bonusPoints || 50
      }
    })
    if (currentTeam) {
      score += currentTeam.bonus.value * 20
    }
    score += streak * 50
    return score
  }, [gameState.choices, currentTeam, streak])

  // Sync progress với server khi có thay đổi
  useEffect(() => {
    if (phase !== 'intro' && gameState.teamId) {
      updateProgress(
        gameState.currentRoom + 1,
        gameState.choices,
        currentScore,
        gameState.isComplete
      )
    }
  }, [gameState.currentRoom, gameState.choices, currentScore, gameState.isComplete, gameState.teamId, phase, updateProgress])

  // Update stats when choices change
  useEffect(() => {
    if (Object.keys(gameState.choices).length > 0) {
      const newStats = calculateStats(gameState.choices, currentTeam || null)
      setGameState(prev => ({ ...prev, stats: newStats }))
    }
  }, [gameState.choices, currentTeam])

  // Start game with team
  const handleStart = useCallback((team: Team) => {
    const initialStats = calculateStats({}, team)
    setGameState(prev => ({
      ...prev,
      teamId: team.id,
      teamName: team.name,
      stats: initialStats,
    }))
    setPhase('playing')
  }, [])

  // Make a choice
  const handleChoice = useCallback((choiceId: 'A' | 'B' | 'C' | 'D') => {
    const choice = currentRoom.choices.find(c => c.id === choiceId)
    if (!choice) return

    // Update streak
    if (lastChoice === choiceId) {
      setStreak(prev => prev + 1)
    } else {
      setStreak(1)
    }
    setLastChoice(choiceId)

    // Save choice
    setGameState(prev => ({
      ...prev,
      choices: {
        ...prev.choices,
        [currentRoom.id]: choiceId,
      },
    }))

    // Show consequence
    setCurrentChoice(choice)
    setPhase('consequence')
  }, [currentRoom, lastChoice])

  // Handle timeout (auto-select random)
  const handleTimeout = useCallback(() => {
    const randomChoice = Math.random() > 0.5 ? 'A' : 'B'
    handleChoice(randomChoice)
  }, [handleChoice])

  // Continue after consequence
  const handleContinue = useCallback(() => {
    const isLastRoom = gameState.currentRoom >= rooms.length - 1

    if (isLastRoom) {
      // Calculate final score
      const finalAchievements = checkAchievements(
        { ...gameState.choices, [currentRoom.id]: Object.values(gameState.choices).pop() as 'A' | 'B' | 'C' | 'D' },
        gameState.stats,
        gameState.timeSpent
      )
      const scoreBreakdown = calculateScore(
        gameState.choices,
        currentTeam ?? null,
        gameState.timeSpent,
        finalAchievements,
        streak
      )
      
      // Game complete with score
      setGameState(prev => ({ 
        ...prev, 
        isComplete: true,
        score: scoreBreakdown,
        achievements: finalAchievements,
      }))
      setPhase('ending')
    } else {
      // Transition to next room
      setIsTransitioning(true)
      setPhase('playing')
    }

    setCurrentChoice(null)
  }, [gameState.currentRoom, gameState.choices, gameState.stats, gameState.timeSpent, currentRoom.id, currentTeam, streak])

  // Transition complete
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false)
    setGameState(prev => ({
      ...prev,
      currentRoom: prev.currentRoom + 1,
    }))
  }, [])

  // Restart game
  const handleRestart = useCallback(() => {
    setGameState({
      currentRoom: 0,
      choices: {},
      isComplete: false,
      teamId: null,
      teamName: null,
      stats: { economy: 50, equality: 50, technology: 50, humanity: 50 },
      achievements: [],
      timeSpent: 0,
      roomTimes: [],
      score: null,
    })
    setPhase('intro')
    setCurrentChoice(null)
    setIsTransitioning(false)
    setShowAchievement(null)
    setStreak(0)
    setLastChoice(null)
  }, [])

  // Check for new achievements
  const checkNewAchievements = useCallback(() => {
    const newAchievementIds = checkAchievements(gameState.choices, gameState.stats, gameState.timeSpent)
    const newUnlocked = newAchievementIds.filter(id => !gameState.achievements.includes(id))
    
    if (newUnlocked.length > 0) {
      const achievement = achievements.find(a => a.id === newUnlocked[0])
      if (achievement) {
        setShowAchievement({ id: achievement.id, title: achievement.title, icon: achievement.icon })
        setGameState(prev => ({
          ...prev,
          achievements: [...prev.achievements, ...newUnlocked],
        }))
      }
    }
  }, [gameState.choices, gameState.stats, gameState.achievements, gameState.timeSpent])

  // Check achievements when game ends
  useEffect(() => {
    if (gameState.isComplete) {
      checkNewAchievements()
    }
  }, [gameState.isComplete, checkNewAchievements])

  // Calculate ending
  const ending = gameState.isComplete ? calculateEnding(gameState.choices, gameState.stats) : null

  return (
    <div className="fixed inset-0 bg-bg-0 overflow-hidden">
      {/* Achievement popup */}
      {showAchievement && (
        <AchievementPopup
          title={showAchievement.title}
          icon={showAchievement.icon}
          onClose={() => setShowAchievement(null)}
        />
      )}

      {/* Intro Screen */}
      {phase === 'intro' && (
        <GameIntro 
          onStart={handleStart}
          sessionInfo={sessionInfo}
          onJoinTeam={joinTeam}
          isMultiplayer={true}
        />
      )}

      {/* Room transition */}
      {phase === 'transition' && (
        <RoomTransition
          fromRoom={gameState.currentRoom}
          toRoom={gameState.currentRoom + 1}
          onComplete={() => {
            setGameState(prev => ({ ...prev, currentRoom: prev.currentRoom + 1 }))
            setPhase('playing')
          }}
        />
      )}

      {/* Game Playing */}
      {(phase === 'playing' || phase === 'consequence') && currentRoom && (
        <>
          {/* 3D Scene */}
          <Room3DScene
            roomIndex={gameState.currentRoom}
            ambientColor={currentRoom.ambientColor}
            isTransitioning={isTransitioning}
            onTransitionComplete={handleTransitionComplete}
          />

          {/* HUD - Stats display */}
          <div className="absolute top-4 left-4 z-40">
            <StatsHUD 
              stats={gameState.stats} 
              currentScore={currentScore}
              roomNumber={gameState.currentRoom + 1}
            />
          </div>

          {/* Room progress indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
            {rooms.map((room, i) => (
              <div
                key={room.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  i < gameState.currentRoom
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : i === gameState.currentRoom
                    ? 'bg-primary-500/20 border-primary-500 text-primary-400 scale-110'
                    : 'bg-surface-2/50 border-border-1 text-text-3'
                }`}
                title={room.title}
              >
                {i < gameState.currentRoom ? '✓' : room.icon}
              </div>
            ))}
          </div>

          {/* Team badge */}
          {currentTeam && (
            <div 
              className="absolute top-20 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ 
                backgroundColor: `${currentTeam.color}20`,
                borderColor: `${currentTeam.color}50`,
              }}
            >
              <span>{currentTeam.icon}</span>
              <span className="text-sm font-medium" style={{ color: currentTeam.color }}>
                {currentTeam.name}
              </span>
            </div>
          )}

          {/* Live Leaderboard Toggle Button */}
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="absolute top-20 right-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2/80 backdrop-blur-sm border border-border-1 hover:border-primary-500/50 transition-all"
          >
            <span>🏆</span>
            <span className="text-sm text-text-2">
              {sessionInfo?.playerCount || 0}/6
            </span>
            {sessionInfo && sessionInfo.leaderboard.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            )}
          </button>

          {/* Live Leaderboard Sidebar */}
          {showLeaderboard && sessionInfo && (
            <div className="absolute top-32 right-4 z-40 w-72 animate-in slide-in-from-right duration-300">
              <LiveLeaderboard
                leaderboard={sessionInfo.leaderboard}
                currentTeamId={gameState.teamId ?? undefined}
              />
            </div>
          )}

          {/* Timer */}
          {phase === 'playing' && !isTransitioning && (
            <div className="absolute top-4 right-20 z-40">
              <Timer
                duration={currentRoom.timeLimit}
                onTimeout={handleTimeout}
                isPaused={isPaused || phase !== 'playing'}
              />
            </div>
          )}

          {/* Dilemma card */}
          {phase === 'playing' && !isTransitioning && (
            <div className="absolute bottom-4 left-4 z-40 max-w-xs">
              <DilemmaCard room={currentRoom} />
            </div>
          )}

          {/* Game UI */}
          {phase === 'playing' && !isTransitioning && (
            <GameUI
              room={currentRoom}
              onChoice={handleChoice}
              isAnimating={isTransitioning}
            />
          )}

          {/* Consequence Modal */}
          {phase === 'consequence' && currentChoice && (
            <ConsequenceModal
              choice={currentChoice}
              onContinue={handleContinue}
              isLastRoom={gameState.currentRoom >= rooms.length - 1}
              stats={gameState.stats}
              roomBonusPoints={currentRoom.bonusPoints || 50}
              correctAnswer={currentRoom.correctAnswer}
              answerExplanation={currentRoom.answerExplanation}
            />
          )}
        </>
      )}

      {/* Ending Screen */}
      {phase === 'ending' && ending && (
        <GameEnding
          ending={ending}
          gameState={gameState}
          onRestart={handleRestart}
        />
      )}

      {/* Exit button */}
      {phase !== 'intro' && phase !== 'ending' && (
        <button
          onClick={handleRestart}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-surface-2/80 backdrop-blur-sm border border-border-1 flex items-center justify-center text-text-2 hover:text-text-1 hover:border-primary-500/50 transition-all"
          title="Thoát game"
        >
          ✕
        </button>
      )}
    </div>
  )
}
