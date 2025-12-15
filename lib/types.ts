import { z } from 'zod'

// Frontmatter schemas
export const ChapterFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  concepts: z.array(z.string()).optional(),
  order: z.number().optional(),
  published: z.boolean().default(true),
})

export const ConceptFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  definition: z.string(),
  category: z.enum(['llsx', 'qhsx', 'mauthuan', 'hequa', 'dieutiet']),
  relatedChapters: z.array(z.string()).optional(),
  relatedConcepts: z.array(z.string()).optional(),
})

export const CaseFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  type: z.enum(['chip-war', 'platform', 'sovereignty', 'sanctions', 'other']),
})

// Types
export type ChapterFrontmatter = z.infer<typeof ChapterFrontmatterSchema>
export type ConceptFrontmatter = z.infer<typeof ConceptFrontmatterSchema>
export type CaseFrontmatter = z.infer<typeof CaseFrontmatterSchema>

export interface Chapter extends ChapterFrontmatter {
  content: string
}

export interface Concept extends ConceptFrontmatter {
  content: string
}

export interface Case extends CaseFrontmatter {
  content: string
}

// Callout types for semantic UI
export type CalloutType = 'concept' | 'rupture' | 'consequence' | 'regulation'

// Navigation
export interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

// TOC
export interface TOCItem {
  id: string
  title: string
  level: number
}
