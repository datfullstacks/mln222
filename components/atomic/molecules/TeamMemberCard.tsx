import { cn } from '@/lib/utils'

interface TeamMemberCardProps {
  name: string
  studentId: string
  initial?: string
  className?: string
}

export function TeamMemberCard({
  name,
  studentId,
  initial,
  className,
}: TeamMemberCardProps) {
  // Get first letter of name for avatar
  const avatarLetter = initial || name.charAt(0).toUpperCase()

  return (
    <div className={cn(
      'flex flex-col items-center text-center group',
      className
    )}>
      {/* Avatar */}
      <div className="w-20 h-20 rounded-xl bg-surface-2 border border-border-1 flex items-center justify-center mb-4 group-hover:border-primary-500/50 group-hover:bg-surface-1 transition-all duration-300">
        <span className="text-2xl font-bold text-text-2 group-hover:text-primary-400 transition-colors">
          {avatarLetter}
        </span>
      </div>

      {/* Name */}
      <h4 className="font-semibold text-text-1 mb-1 group-hover:text-primary-400 transition-colors">
        {name}
      </h4>

      {/* Student ID */}
      <span className="text-sm text-text-3">
        {studentId}
      </span>
    </div>
  )
}
