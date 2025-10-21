// src/components/animations/ReactBitsFallbacks.tsx
import React, { ReactNode } from 'react'

interface BaseAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

interface GradientProps {
  colors?: string[]
  speed?: number
  className?: string
}

interface ParticleProps {
  count?: number
  particleColor?: string
  dotColor?: string
  speed?: number
  effectColor?: string
  waveColor?: string
  color?: string
  className?: string
  elementColor?: string
}

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
}

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
}

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

interface ButtonGlowProps extends BaseAnimationProps {
  glowColor?: string
}

// Fallback components with basic animations using CSS classes
export const Reveal: React.FC<BaseAnimationProps> = ({ children, delay = 0, className = '' }) => (
  <div
    className={`animate-fadeIn ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
)

export const Tilt: React.FC<BaseAnimationProps> = ({ children, className = '' }) => (
  <div className={`transform transition-transform duration-300 hover:scale-105 hover:rotate-1 ${className}`}>
    {children}
  </div>
)

export const Magnetic: React.FC<BaseAnimationProps> = ({ children, className = '' }) => (
  <div className={`transform transition-transform duration-300 hover:scale-110 ${className}`}>
    {children}
  </div>
)

export const Stagger: React.FC<BaseAnimationProps> = ({ children, className = '' }) => (
  <div className={`animate-fadeIn ${className}`}>
    {children}
  </div>
)

export const Gradient: React.FC<GradientProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-bitcoin-500/10 animate-gradient ${className}`} />
)

export const Particles: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 opacity-20 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 animate-pulse" />
  </div>
)

export const FloatingDots: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 opacity-30 ${className}`}>
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
    <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-bitcoin-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
  </div>
)

export const Hyperspeed: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent animate-pulse" />
  </div>
)

export const Matrix: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 grid-background ${className}`} />
)

export const Aurora: React.FC<GradientProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 bg-gradient-to-br from-green-500/20 via-primary-500/20 to-secondary-500/20 animate-gradient ${className}`} />
)

export const Ripple: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent animate-pulse" />
  </div>
)

export const Wave: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent animate-pulse" />
  </div>
)

export const FloatingElements: React.FC<ParticleProps> = ({ className = '' }) => (
  <div className={`absolute inset-0 ${className}`}>
    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-400/30 rounded-full animate-float" />
    <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-secondary-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-3/4 w-5 h-5 bg-bitcoin-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
  </div>
)

export const CountUp: React.FC<CountUpProps> = ({ end, suffix = '' }) => (
  <span className="animate-pulse">{end}{suffix}</span>
)

export const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 0 }) => (
  <span
    className="animate-fadeIn"
    style={{ animationDelay: `${delay}ms` }}
  >
    {text}
  </span>
)

export const SplitText: React.FC<SplitTextProps> = ({ text, className = '', delay = 0 }) => (
  <h1
    className={`animate-fadeIn ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {text}
  </h1>
)

export const ButtonGlow: React.FC<ButtonGlowProps> = ({ children, className = '' }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />
    <div className="relative">
      {children}
    </div>
  </div>
)