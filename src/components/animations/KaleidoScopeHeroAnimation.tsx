// src/components/animations/KaleidoScopeHeroAnimation.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react'

// Protocol logos
import bitcoinLogo from '@/assets/icons/bitcoin/bitcoin-logo.svg'
import rgbLogo from '@/assets/icons/rgb/rgb-logo.svg'
import sparkAsterisk from '@/assets/icons/spark/Asterisk/Spark Asterisk White.svg'
import arkadeLogo from '@/assets/icons/arkade/arkade-icon.svg'
import liquidLogo from '@/assets/icons/liquid/logo-liquid.svg'
import taprootLogo from '@/assets/icons/taproot-assets/tapass-logo.png'

interface KaleidoScopeHeroAnimationProps {
  size?: number
  className?: string
}

interface Protocol {
  name: string
  logo: string
  color: string
  glowColor: string
  isLightning?: boolean
}

const protocols: Protocol[] = [
  { name: 'Bitcoin', logo: bitcoinLogo, color: '#F7931A', glowColor: 'rgba(247,147,26,0.5)' },
  { name: 'Lightning', logo: '', color: '#fbbf24', glowColor: 'rgba(251,191,36,0.5)', isLightning: true },
  { name: 'RGB', logo: rgbLogo, color: '#8a5cf6', glowColor: 'rgba(138,92,246,0.5)' },
  { name: 'Spark', logo: sparkAsterisk, color: '#FFFFFF', glowColor: 'rgba(255,255,255,0.3)' },
  { name: 'Arkade', logo: arkadeLogo, color: '#22c55e', glowColor: 'rgba(34,197,94,0.5)' },
  { name: 'Liquid', logo: liquidLogo, color: '#14909c', glowColor: 'rgba(20,144,156,0.5)' },
  { name: 'Taproot Assets', logo: taprootLogo, color: '#F7931A', glowColor: 'rgba(247,147,26,0.5)' },
]

const hexPath = (r: number) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${r * Math.cos(a)},${r * Math.sin(a)}`
  })
  return `M${pts.join('L')}Z`
}

const diamondPath = (w: number, h: number) =>
  `M0,${-h} L${w},0 L0,${h} L${-w},0 Z`

const triPath = (s: number) =>
  `M0,${-s} L${s * 0.866},${s * 0.5} L${-s * 0.866},${s * 0.5} Z`

export const KaleidoScopeHeroAnimation: React.FC<KaleidoScopeHeroAnimationProps> = ({
  size = 500,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetOffset = useRef({ x: 0, y: 0 })
  const currentOffset = useRef({ x: 0, y: 0 })
  const rafId = useRef(0)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hoveredProtocol, setHoveredProtocol] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  const c = 250
  const orbitR = 148
  const innerR = 82
  const outerR1 = 210
  const outerR2 = 185
  const midR = 118
  const iconR = 24

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Pause animations when not visible (IntersectionObserver)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotion) return
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = rect.left + rect.width / 2
    const my = rect.top + rect.height / 2
    const dx = Math.max(-1, Math.min(1, (e.clientX - mx) / (rect.width / 2)))
    const dy = Math.max(-1, Math.min(1, (e.clientY - my) / (rect.height / 2)))
    targetOffset.current = { x: dx, y: dy }
  }, [reducedMotion])

  const handleMouseLeave = useCallback(() => {
    targetOffset.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    if (reducedMotion || !isVisible) return
    const lerp = () => {
      const cur = currentOffset.current
      const tgt = targetOffset.current
      const nx = cur.x + (tgt.x - cur.x) * 0.05
      const ny = cur.y + (tgt.y - cur.y) * 0.05
      if (Math.abs(nx - cur.x) > 0.0005 || Math.abs(ny - cur.y) > 0.0005) {
        currentOffset.current = { x: nx, y: ny }
        setOffset({ x: nx, y: ny })
      }
      rafId.current = requestAnimationFrame(lerp)
    }
    rafId.current = requestAnimationFrame(lerp)
    return () => cancelAnimationFrame(rafId.current)
  }, [reducedMotion, isVisible])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    const el = containerRef.current
    if (el) el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (el) el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  const px = (layer: number) => {
    if (reducedMotion) return 'translate(0,0)'
    return `translate(${offset.x * layer},${offset.y * layer})`
  }

  const anim = !reducedMotion && isVisible

  const iconPositions = protocols.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2
    return { x: c + orbitR * Math.cos(angle), y: c + orbitR * Math.sin(angle) }
  })

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 500 500"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Animated color-cycling gradients */}
          <linearGradient id="kh-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%">
              {anim && <animate attributeName="stop-color" values="#22c55e;#8a5cf6;#06b6d4;#F7931A;#22c55e" dur="10s" repeatCount="indefinite" />}
            </stop>
            <stop offset="100%">
              {anim && <animate attributeName="stop-color" values="#8a5cf6;#F7931A;#22c55e;#06b6d4;#8a5cf6" dur="10s" repeatCount="indefinite" />}
            </stop>
          </linearGradient>
          <linearGradient id="kh-grad-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%">
              {anim && <animate attributeName="stop-color" values="#06b6d4;#22c55e;#F7931A;#8a5cf6;#06b6d4" dur="8s" repeatCount="indefinite" />}
            </stop>
            <stop offset="100%">
              {anim && <animate attributeName="stop-color" values="#F7931A;#06b6d4;#8a5cf6;#22c55e;#F7931A" dur="8s" repeatCount="indefinite" />}
            </stop>
          </linearGradient>
          <linearGradient id="kh-grad-c" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%">
              {anim && <animate attributeName="stop-color" values="#0e9dff;#8a5cf6;#15E99A;#0e9dff" dur="6s" repeatCount="indefinite" />}
            </stop>
            <stop offset="100%">
              {anim && <animate attributeName="stop-color" values="#8a5cf6;#15E99A;#0e9dff;#8a5cf6" dur="6s" repeatCount="indefinite" />}
            </stop>
          </linearGradient>

          {/* Static gradients */}
          <linearGradient id="kh-gp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#8a5cf6" />
          </linearGradient>
          <linearGradient id="kh-oc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7931A" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="kh-bp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e9dff" />
            <stop offset="100%" stopColor="#8a5cf6" />
          </linearGradient>

          {/* Connection line gradient (radial for center-outward flow) */}
          <radialGradient id="kh-line-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e9dff" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#8a5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </radialGradient>

          {/* Energy pulse gradient */}
          <radialGradient id="kh-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e9dff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0e9dff" stopOpacity="0" />
          </radialGradient>

          {/* Glow filters */}
          <filter id="kh-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="kh-glow-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Center ambient glow */}
          <radialGradient id="kh-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0e9dff" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#8a5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Outer ambient haze */}
          <radialGradient id="kh-haze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="60%" stopColor="#0e9dff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#8a5cf6" stopOpacity="0.06" />
          </radialGradient>

          {/* Circular clip for protocol icons */}
          <clipPath id="kh-icon-clip">
            <circle cx="0" cy="0" r={iconR * 0.56} />
          </clipPath>
        </defs>

        {/* Background haze */}
        <circle cx={c} cy={c} r="248" fill="url(#kh-haze)" />

        {/* ====== LAYER 1: OUTER KALEIDOSCOPE (parallax 20) ====== */}
        <g transform={px(20)}>
          {/* Ring A: 6 large hexagons, CW 55s */}
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="55s" repeatCount="indefinite" />
            )}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i
              return (
                <g key={`ha-${i}`} transform={`translate(${c + outerR1 * Math.cos(a)},${c + outerR1 * Math.sin(a)})`}>
                  <path d={hexPath(40)} fill="url(#kh-grad-a)" opacity={0.08 + (i % 3) * 0.04} />
                  <path d={hexPath(40)} fill="none" stroke="url(#kh-grad-a)" strokeWidth="0.5" opacity={0.15}>
                    {anim && <animate attributeName="opacity" values="0.1;0.25;0.1" dur={`${4 + i * 0.3}s`} repeatCount="indefinite" />}
                  </path>
                </g>
              )
            })}
            {/* Accent triangles between hexagons */}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i + Math.PI / 6
              return (
                <path key={`ta-${i}`}
                  d={triPath(14)}
                  transform={`translate(${c + outerR1 * 0.78 * Math.cos(a)},${c + outerR1 * 0.78 * Math.sin(a)}) rotate(${i * 60 + 30})`}
                  fill="url(#kh-grad-a)" opacity={0.06}
                />
              )
            })}
            {/* Tiny connector dots on outer ring */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (Math.PI / 6) * i
              return (
                <circle key={`od-${i}`}
                  cx={c + outerR1 * 0.92 * Math.cos(a)}
                  cy={c + outerR1 * 0.92 * Math.sin(a)}
                  r="1.5" fill="url(#kh-grad-a)" opacity="0.15"
                >
                  {anim && <animate attributeName="opacity" values="0.08;0.25;0.08" dur={`${2 + (i % 3) * 0.7}s`} repeatCount="indefinite" />}
                </circle>
              )
            })}
          </g>

          {/* Ring B: 6 medium hexagons, CCW 40s, offset 30deg */}
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`-360 ${c} ${c}`} dur="40s" repeatCount="indefinite" />
            )}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i + Math.PI / 6
              return (
                <g key={`hb-${i}`} transform={`translate(${c + outerR2 * Math.cos(a)},${c + outerR2 * Math.sin(a)})`}>
                  <path d={hexPath(30)} fill="url(#kh-grad-b)" opacity={0.06 + (i % 2) * 0.04} />
                  <path d={hexPath(30)} fill="none" stroke="url(#kh-grad-b)" strokeWidth="0.5" opacity={0.12} />
                </g>
              )
            })}
            {/* Diamonds between B hexagons */}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i
              return (
                <path key={`db-${i}`}
                  d={diamondPath(8, 16)}
                  transform={`translate(${c + outerR2 * 0.85 * Math.cos(a)},${c + outerR2 * 0.85 * Math.sin(a)}) rotate(${i * 60})`}
                  fill="url(#kh-grad-b)" opacity="0.08"
                >
                  {anim && <animate attributeName="opacity" values="0.05;0.15;0.05" dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite" />}
                </path>
              )
            })}
          </g>

          {/* Ring C: 12 small triangles, CW 70s — slow drift layer */}
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="70s" repeatCount="indefinite" />
            )}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (Math.PI / 6) * i
              const r = outerR1 * (0.6 + (i % 2) * 0.15)
              return (
                <path key={`tc-${i}`}
                  d={triPath(10)}
                  transform={`translate(${c + r * Math.cos(a)},${c + r * Math.sin(a)}) rotate(${i * 30 + 15})`}
                  fill="url(#kh-grad-c)" opacity="0.05"
                >
                  {anim && <animate attributeName="opacity" values="0.03;0.1;0.03" dur={`${5 + (i % 4) * 0.8}s`} repeatCount="indefinite" />}
                </path>
              )
            })}
          </g>
        </g>

        {/* ====== MID TESSELLATION RING (parallax 14) ====== */}
        <g transform={px(14)}>
          {/* 12 small hexagons rotating CW */}
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="50s" repeatCount="indefinite" />
            )}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (Math.PI / 6) * i
              return (
                <g key={`mh-${i}`} transform={`translate(${c + midR * Math.cos(a)},${c + midR * Math.sin(a)})`}>
                  <path d={hexPath(12)} fill="url(#kh-grad-c)" opacity={0.08 + (i % 3) * 0.03} />
                  <path d={hexPath(12)} fill="none" stroke="url(#kh-grad-c)" strokeWidth="0.4" opacity="0.12">
                    {anim && <animate attributeName="opacity" values="0.08;0.2;0.08" dur={`${3 + (i % 4) * 0.5}s`} repeatCount="indefinite" />}
                  </path>
                </g>
              )
            })}
          </g>
          {/* 6 connecting arcs between mid hexagons */}
          {Array.from({ length: 6 }, (_, i) => {
            const a1 = (Math.PI / 3) * i
            const a2 = (Math.PI / 3) * (i + 1)
            const x1 = c + midR * Math.cos(a1)
            const y1 = c + midR * Math.sin(a1)
            const x2 = c + midR * Math.cos(a2)
            const y2 = c + midR * Math.sin(a2)
            return (
              <path key={`arc-${i}`}
                d={`M${x1},${y1} Q${c},${c} ${x2},${y2}`}
                fill="none" stroke="url(#kh-bp)" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.1"
              >
                {anim && <animate attributeName="stroke-dashoffset" from="0" to="-16" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />}
              </path>
            )
          })}
        </g>

        {/* ====== LAYER 2: PROTOCOL ICON ORBIT (parallax 10) ====== */}
        <g transform={px(10)}>
          {/* Orbit ring - double */}
          <circle cx={c} cy={c} r={orbitR} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 5">
            {anim && <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="90s" repeatCount="indefinite" />}
          </circle>
          <circle cx={c} cy={c} r={orbitR + 4} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

          {/* Rotating group */}
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="40s" repeatCount="indefinite" />
            )}

            {/* Connection lines with energy pulses */}
            {iconPositions.map((pos, i) => {
              const angle = Math.atan2(pos.y - c, pos.x - c)
              const dx = Math.cos(angle)
              const dy = Math.sin(angle)
              return (
                <g key={`conn-${i}`}>
                  {/* Base line */}
                  <line x1={c + dx * 52} y1={c + dy * 52} x2={pos.x} y2={pos.y}
                    stroke={protocols[i].color} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.2"
                  >
                    {anim && <animate attributeName="stroke-dashoffset" from="0" to="-12" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />}
                  </line>
                  {/* Energy pulse dot traveling along line */}
                  <circle r="2.5" fill={protocols[i].color} opacity="0">
                    {anim && (
                      <>
                        <animate attributeName="cx" values={`${c + dx * 52};${pos.x}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${c + dy * 52};${pos.y}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="r" values="1.5;3;1.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                      </>
                    )}
                  </circle>
                </g>
              )
            })}

            {/* Protocol icons */}
            {protocols.map((proto, i) => {
              const pos = iconPositions[i]
              const labelWidth = Math.max(proto.name.length * 5.5 + 10, 32)
              const isHovered = hoveredProtocol === proto.name
              return (
                <g key={proto.name} transform={`translate(${pos.x},${pos.y})`}>
                  {/* Counter-rotate to stay upright */}
                  <g
                    onMouseEnter={() => setHoveredProtocol(proto.name)}
                    onMouseLeave={() => setHoveredProtocol(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {anim && (
                      <animateTransform attributeName="transform" type="rotate"
                        from="0 0 0" to="-360 0 0" dur="40s" repeatCount="indefinite" />
                    )}

                    {/* Expanding pulse ring */}
                    <circle cx="0" cy="0" r={iconR} fill="none"
                      stroke={proto.color} strokeWidth="1" opacity="0"
                    >
                      {anim && (
                        <>
                          <animate attributeName="r" values={`${iconR};${iconR + 12}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
                          <animate attributeName="opacity" values="0.5;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
                        </>
                      )}
                    </circle>

                    {/* Outer glow ring */}
                    <circle cx="0" cy="0" r={iconR + 4} fill="none"
                      stroke={proto.color} strokeWidth="1" opacity="0.15"
                    >
                      {anim && <animate attributeName="opacity" values="0.15;0.4;0.15" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />}
                    </circle>

                    {/* Inner glow ring */}
                    <circle cx="0" cy="0" r={iconR + 1} fill="none"
                      stroke={proto.color} strokeWidth="1.5" opacity="0.25"
                    >
                      {anim && <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />}
                    </circle>

                    {/* Glassy background */}
                    <circle cx="0" cy="0" r={iconR}
                      fill="rgba(10,15,30,0.8)"
                      stroke="rgba(255,255,255,0.15)" strokeWidth="1"
                    />

                    {/* Subtle color tint behind icon */}
                    <circle cx="0" cy="0" r={iconR - 2}
                      fill={proto.color} opacity="0.06"
                    />

                    {/* Protocol icon */}
                    {proto.isLightning ? (
                      <g transform={`translate(${-iconR * 0.42},${-iconR * 0.52}) scale(${iconR * 0.036})`}>
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                          fill="#fbbf24" stroke="#fbbf24" strokeWidth="0.5" />
                      </g>
                    ) : (
                      <image href={proto.logo}
                        x={-iconR * 0.58} y={-iconR * 0.58}
                        width={iconR * 1.16} height={iconR * 1.16}
                        clipPath="url(#kh-icon-clip)"
                      />
                    )}

                    {/* Network name label on hover */}
                    <g opacity={isHovered ? 1 : 0} style={{ transition: 'opacity 0.2s ease' }}>
                      <rect
                        x={-labelWidth / 2}
                        y={iconR + 6}
                        width={labelWidth}
                        height={16}
                        rx={4}
                        fill="rgba(0,0,0,0.85)"
                        stroke={proto.color}
                        strokeWidth={0.5}
                        strokeOpacity={0.4}
                      />
                      <text
                        x="0"
                        y={iconR + 18}
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="system-ui, -apple-system, sans-serif"
                      >
                        {proto.name}
                      </text>
                    </g>
                  </g>
                </g>
              )
            })}
          </g>
        </g>

        {/* ====== LAYER 3: INNER GEOMETRIC PATTERN (parallax 5) ====== */}
        <g transform={px(5)}>
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`-360 ${c} ${c}`} dur="35s" repeatCount="indefinite" />
            )}

            {/* 6 diamonds */}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i
              return (
                <path key={`d-${i}`}
                  d={diamondPath(10, 22)}
                  transform={`translate(${c + innerR * Math.cos(a)},${c + innerR * Math.sin(a)}) rotate(${i * 60})`}
                  fill="url(#kh-gp)" opacity="0.15"
                >
                  {anim && <animate attributeName="opacity" values="0.1;0.28;0.1" dur={`${2.8 + i * 0.35}s`} repeatCount="indefinite" />}
                </path>
              )
            })}

            {/* 6 smaller triangles at 30deg offsets */}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i + Math.PI / 6
              return (
                <path key={`it-${i}`}
                  d={triPath(8)}
                  transform={`translate(${c + innerR * 0.75 * Math.cos(a)},${c + innerR * 0.75 * Math.sin(a)}) rotate(${i * 60 + 30})`}
                  fill="url(#kh-oc)" opacity="0.1"
                >
                  {anim && <animate attributeName="opacity" values="0.06;0.18;0.06" dur={`${3.2 + i * 0.3}s`} repeatCount="indefinite" />}
                </path>
              )
            })}

            {/* 12 dots */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (Math.PI / 6) * i
              const r = innerR * (i % 2 === 0 ? 0.55 : 0.65)
              return (
                <circle key={`id-${i}`}
                  cx={c + r * Math.cos(a)} cy={c + r * Math.sin(a)}
                  r={i % 2 === 0 ? 2 : 1.5} fill="url(#kh-oc)" opacity="0.2"
                >
                  {anim && <animate attributeName="opacity" values="0.1;0.35;0.1" dur={`${2 + (i % 4) * 0.5}s`} repeatCount="indefinite" />}
                </circle>
              )
            })}
          </g>

          {/* Counter-rotating inner ring of mini hexagons */}
          <g>
            {anim && (
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="25s" repeatCount="indefinite" />
            )}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i + Math.PI / 6
              return (
                <path key={`ih-${i}`}
                  d={hexPath(6)}
                  transform={`translate(${c + innerR * 0.42 * Math.cos(a)},${c + innerR * 0.42 * Math.sin(a)})`}
                  fill="url(#kh-bp)" opacity="0.1"
                >
                  {anim && <animate attributeName="opacity" values="0.06;0.18;0.06" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />}
                </path>
              )
            })}
          </g>
        </g>

        {/* ====== FLOATING PARTICLES (parallax 18 — drift with outer layer) ====== */}
        <g transform={px(18)}>
          {Array.from({ length: 16 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 16
            const baseR = 60 + (i % 4) * 45
            const x = c + baseR * Math.cos(a)
            const y = c + baseR * Math.sin(a)
            const colors = ['#0e9dff', '#8a5cf6', '#22c55e', '#F7931A', '#06b6d4', '#15E99A']
            return (
              <circle key={`p-${i}`} cx={x} cy={y}
                r={1 + (i % 3) * 0.5} fill={colors[i % colors.length]} opacity="0"
              >
                {anim && (
                  <>
                    <animate attributeName="opacity" values="0;0.6;0" dur={`${3 + (i % 5) * 0.8}s`} repeatCount="indefinite" begin={`${(i % 7) * 0.5}s`} />
                    <animate attributeName="cx" values={`${x};${x + (Math.cos(a) * 15)}`} dur={`${4 + (i % 3) * 1.5}s`} repeatCount="indefinite" begin={`${(i % 7) * 0.5}s`} />
                    <animate attributeName="cy" values={`${y};${y + (Math.sin(a) * 15)}`} dur={`${4 + (i % 3) * 1.5}s`} repeatCount="indefinite" begin={`${(i % 7) * 0.5}s`} />
                  </>
                )}
              </circle>
            )
          })}
        </g>

        {/* ====== LAYER 4: CENTER LOGO (no parallax — anchor) ====== */}
        <g>
          {/* Large ambient glow */}
          <circle cx={c} cy={c} r="75" fill="url(#kh-center-glow)">
            {anim && <animate attributeName="r" values="70;80;70" dur="4s" repeatCount="indefinite" />}
          </circle>

          {/* Pulsing energy ring */}
          <circle cx={c} cy={c} r="52" fill="none" stroke="url(#kh-bp)" strokeWidth="1" opacity="0">
            {anim && (
              <>
                <animate attributeName="r" values="48;65" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="3s" repeatCount="indefinite" />
              </>
            )}
          </circle>
          {/* Second staggered pulse */}
          <circle cx={c} cy={c} r="48" fill="none" stroke="url(#kh-gp)" strokeWidth="0.8" opacity="0">
            {anim && (
              <>
                <animate attributeName="r" values="48;60" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </>
            )}
          </circle>

          {/* Hexagonal border — breathing */}
          <path d={hexPath(50)} transform={`translate(${c},${c})`}
            fill="none" stroke="url(#kh-gp)" strokeWidth="1.5" opacity="0.4" filter="url(#kh-glow)"
          >
            {anim && (
              <>
                <animate attributeName="opacity" values="0.3;0.65;0.3" dur="3s" repeatCount="indefinite" />
                <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite" />
              </>
            )}
          </path>

          {/* Inner hex fill */}
          <path d={hexPath(46)} transform={`translate(${c},${c})`}
            fill="rgba(10,15,30,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
          />

          {/* KaleidoSwap mark logo */}
          <g transform={`translate(${c - 34},${c - 34}) scale(0.325)`}>
            <path d="M69.7141 207.3H0.908203L35.3243 172.936L69.7141 207.3Z" fill="#6F32FF" />
            <path d="M138.441 0.96106V69.767L104.078 35.3508L138.441 0.96106Z" fill="#17B581" />
            <path d="M138.415 138.547V207.352L104.051 172.936L138.415 138.547Z" fill="#17B581" />
            <path d="M138.441 69.7406V0.96106L172.804 35.3772L138.441 69.767V69.7406Z" fill="#17B581" />
            <path d="M69.6614 138.494V69.6879L104.025 104.104L69.6614 138.494Z" fill="#15E99A" />
            <path d="M69.6615 69.7142V138.52L35.2981 104.104L69.6615 69.7142Z" fill="#15E99A" />
            <path d="M138.467 207.379V138.573L172.831 172.989L138.467 207.379Z" fill="#17B581" />
            <path d="M0.908203 0.908325H69.7141L35.298 35.2718L0.908203 0.908325Z" fill="#6F32FF" />
            <path d="M207.22 207.3H138.415L172.831 172.936L207.22 207.3Z" fill="#17B581" />
            <path d="M138.415 0.987427H207.22L172.804 35.3509L138.415 0.987427Z" fill="#17B581" />
            <path d="M138.467 69.7143H69.6614L104.078 35.3508L138.467 69.7143Z" fill="#17B581" />
            <path d="M69.635 138.494H138.441L104.025 172.857L69.635 138.494Z" fill="#17B581" />
            <path d="M138.415 138.494H69.635L104.025 104.157L138.388 138.494H138.415Z" fill="#15E99A" />
            <path d="M138.415 69.7142L104.051 104.051L69.6614 69.7142H138.441H138.415Z" fill="#15E99A" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default KaleidoScopeHeroAnimation
