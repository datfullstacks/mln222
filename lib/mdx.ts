import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { 
  ChapterFrontmatterSchema, 
  ConceptFrontmatterSchema,
  CaseFrontmatterSchema,
  type Chapter,
  type Concept,
  type Case
} from './types'

const contentDirectory = path.join(process.cwd(), 'content')

/**
 * Get all chapters
 */
export async function getAllChapters(): Promise<Chapter[]> {
  const chaptersDir = path.join(contentDirectory, 'chapters')
  
  if (!fs.existsSync(chaptersDir)) {
    return []
  }

  const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'))
  
  const chapters = files.map(file => {
    const filePath = path.join(chaptersDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const frontmatter = ChapterFrontmatterSchema.parse(data)
    
    return {
      ...frontmatter,
      content,
    }
  })

  return chapters.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

/**
 * Get chapter by slug
 */
export async function getChapterBySlug(slug: string): Promise<Chapter | null> {
  const chapters = await getAllChapters()
  return chapters.find(c => c.slug === slug) ?? null
}

/**
 * Get all concepts
 */
export async function getAllConcepts(): Promise<Concept[]> {
  const conceptsDir = path.join(contentDirectory, 'concepts')
  
  if (!fs.existsSync(conceptsDir)) {
    return []
  }

  const files = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.mdx'))
  
  return files.map(file => {
    const filePath = path.join(conceptsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const frontmatter = ConceptFrontmatterSchema.parse(data)
    
    return {
      ...frontmatter,
      content,
    }
  })
}

/**
 * Get concept by slug
 */
export async function getConceptBySlug(slug: string): Promise<Concept | null> {
  const concepts = await getAllConcepts()
  return concepts.find(c => c.slug === slug) ?? null
}

/**
 * Get all cases
 */
export async function getAllCases(): Promise<Case[]> {
  const casesDir = path.join(contentDirectory, 'cases')
  
  if (!fs.existsSync(casesDir)) {
    return []
  }

  const files = fs.readdirSync(casesDir).filter(f => f.endsWith('.mdx'))
  
  return files.map(file => {
    const filePath = path.join(casesDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const frontmatter = CaseFrontmatterSchema.parse(data)
    
    return {
      ...frontmatter,
      content,
    }
  })
}

/**
 * Get case by slug
 */
export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const cases = await getAllCases()
  return cases.find(c => c.slug === slug) ?? null
}

/**
 * Extract TOC from MDX content
 */
export function extractTOC(content: string) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const toc: { id: string; title: string; level: number }[] = []
  
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2]
    const id = title
      .toLowerCase()
      .replace(/[^\w\sà-ỹ]/g, '')
      .replace(/\s+/g, '-')
    
    toc.push({ id, title, level })
  }
  
  return toc
}
