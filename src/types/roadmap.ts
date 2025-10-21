// src/types/roadmap.ts
import type { LucideIcon } from 'lucide-react'

export type MilestoneStatus = 'completed' | 'in-progress' | 'upcoming'

export interface Milestone {
  id: string
  title: string
  description: string
  status: MilestoneStatus
  date: string
  icon: LucideIcon
  highlights?: string[]
}

export interface RoadmapProps {
  title?: string
  description?: string
  milestones: Milestone[]
}
