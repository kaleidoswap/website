import { Children, type ReactNode } from 'react'
import { AnimateIn } from './AnimateIn'

type Variant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'

interface StaggerChildrenProps {
  children: ReactNode
  variant?: Variant
  stagger?: number
  baseDelay?: number
  duration?: number
  className?: string
  childClassName?: string
}

export const StaggerChildren = ({
  children,
  variant = 'fade-up',
  stagger = 100,
  baseDelay = 0,
  duration = 600,
  className = '',
  childClassName = '',
}: StaggerChildrenProps) => {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <AnimateIn
          key={index}
          variant={variant}
          delay={baseDelay + index * stagger}
          duration={duration}
          className={childClassName}
        >
          {child}
        </AnimateIn>
      ))}
    </div>
  )
}
