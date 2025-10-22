// src/types/products.ts
import type { LucideIcon } from 'lucide-react'

export type ProductStatus = 'latest-release' | 'beta' | 'coming-soon'
export type ProductColor = 'primary' | 'secondary' | 'bitcoin' | 'green'

export interface ProductCTA {
  label: string
  href: string
  external: boolean
}

export interface Product {
  id: string
  name: string
  version?: string
  status: ProductStatus
  badge: string
  description: string
  features: string[]
  icon: LucideIcon
  platforms: string[]
  primaryCTA?: ProductCTA
  secondaryCTA?: ProductCTA
  color: ProductColor
}

export interface ProductsProps {
  title?: string
  description?: string
  products: Product[]
}
