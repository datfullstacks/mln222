import { cn } from '@/lib/utils'
import {
  AlertTriangle,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Info,
  Layers,
  Link2,
  Mail,
  Menu,
  Moon,
  Search,
  Star,
  Sun,
  Target,
  Users,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export type IconName =
  | 'alert'
  | 'book'
  | 'book-open'
  | 'chevron-right'
  | 'external'
  | 'external-link'
  | 'eye'
  | 'file-text'
  | 'info'
  | 'layers'
  | 'link'
  | 'mail'
  | 'menu'
  | 'moon'
  | 'search'
  | 'star'
  | 'sun'
  | 'target'
  | 'users'
  | 'x'
  | 'zap'

const iconMap: Record<IconName, LucideIcon> = {
  alert: AlertTriangle,
  book: BookOpen,
  'book-open': BookOpen,
  'chevron-right': ChevronRight,
  external: ExternalLink,
  'external-link': ExternalLink,
  eye: Eye,
  'file-text': FileText,
  info: Info,
  layers: Layers,
  link: Link2,
  mail: Mail,
  menu: Menu,
  moon: Moon,
  search: Search,
  star: Star,
  sun: Sun,
  target: Target,
  users: Users,
  x: X,
  zap: Zap,
}

export interface IconProps {
  name: IconName
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const IconComponent = iconMap[name]

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }

  return <IconComponent className={cn(sizes[size], className)} />
}
