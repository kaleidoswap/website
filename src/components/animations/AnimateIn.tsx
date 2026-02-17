import { type ReactNode, type CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

type Variant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'

interface AnimateInProps {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

const variantStyles: Record<Variant, { from: CSSProperties; to: CSSProperties }> = {
  'fade-up': {
    from: { opacity: 0, transform: 'translateY(32px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-down': {
    from: { opacity: 0, transform: 'translateY(-32px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-left': {
    from: { opacity: 0, transform: 'translateX(-32px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    from: { opacity: 0, transform: 'translateX(32px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  scale: {
    from: { opacity: 0, transform: 'scale(0.92)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  blur: {
    from: { opacity: 0, filter: 'blur(8px)', transform: 'translateY(8px)' },
    to: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
  },
}

export const AnimateIn = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = '',
}: AnimateInProps) => {
  const { ref, isInView } = useInView({ threshold })
  const styles = variantStyles[variant]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isInView ? styles.to : styles.from),
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: isInView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
