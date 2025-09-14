// src/types/partnerships.ts
export interface Partner {
  name: string
  description: string
  logo: string
  website: string
  type: 'investor' | 'strategic' | 'technology' | 'ecosystem'
}

export interface PartnershipsProps {
  title: string
  description: string
  partners: Partner[]
}
