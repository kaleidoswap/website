import { motion, useReducedMotion } from 'framer-motion'
const kaleidoPictogram = '/logos/kaleidoswap-logos/kaleidoswap-pictogram.svg'
import { protocols } from '@/constants/protocols'

const OUTER_RADIUS = 118
const INNER_RADIUS = 80
const ICON_SIZE = 40
const CENTER = 140

const PROTOCOL_COLORS: Record<string, string> = {
  Bitcoin: '#F7931A',
  Lightning: '#fbbf24',
  RGB: '#EF4444',
  Spark: '#FFFFFF',
  Arkade: '#8B5CF6',
  Liquid: '#14909c',
  'Taproot Assets': '#F7931A',
}

const hexPath = (r: number) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${r * Math.cos(a)},${r * Math.sin(a)}`
  })
  return `M${pts.join('L')}Z`
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } },
}

export const MobileHeroAnimation = () => {
  const shouldReduceMotion = useReducedMotion()
  const anim = !shouldReduceMotion

  const spinTransition = shouldReduceMotion
    ? {}
    : { duration: 20, repeat: Infinity, ease: 'linear' as const }

  const counterSpinTransition = shouldReduceMotion
    ? {}
    : { duration: 20, repeat: Infinity, ease: 'linear' as const }

  const glowTransition = shouldReduceMotion
    ? {}
    : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }

  return (
    <div className="relative w-full flex justify-center py-8">
      <motion.div
        className="relative w-[280px] h-[280px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Outer pulsing glow ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={glowTransition}
        >
          <div
            className="rounded-full border border-primary-500/30"
            style={{ width: OUTER_RADIUS * 2, height: OUTER_RADIUS * 2 }}
          />
        </motion.div>

        {/* Inner orbit dashed ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full border border-dashed border-white/10"
            style={{ width: INNER_RADIUS * 2, height: INNER_RADIUS * 2 }}
          />
        </div>

        {/* SVG overlay: connection lines + desktop-style center */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 280 280"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="mob-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0e9dff" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#8a5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mob-gp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#8a5cf6" />
            </linearGradient>
            <linearGradient id="mob-bp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0e9dff" />
              <stop offset="100%" stopColor="#8a5cf6" />
            </linearGradient>
            <filter id="mob-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>


          {/* Ambient glow */}
          <circle cx={CENTER} cy={CENTER} r="42" fill="url(#mob-center-glow)">
            {anim && <animate attributeName="r" values="38;46;38" dur="4s" repeatCount="indefinite" />}
          </circle>

          {/* Pulsing energy ring 1 */}
          <circle cx={CENTER} cy={CENTER} r="29" fill="none" stroke="url(#mob-bp)" strokeWidth="1" opacity="0">
            {anim && (
              <>
                <animate attributeName="r" values="27;38" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="3s" repeatCount="indefinite" />
              </>
            )}
          </circle>

          {/* Pulsing energy ring 2 (staggered) */}
          <circle cx={CENTER} cy={CENTER} r="27" fill="none" stroke="url(#mob-gp)" strokeWidth="0.8" opacity="0">
            {anim && (
              <>
                <animate attributeName="r" values="27;36" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </>
            )}
          </circle>

          {/* Hexagonal border */}
          <g transform={`translate(${CENTER},${CENTER})`}>
            <g>
              {anim && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="40s"
                  repeatCount="indefinite"
                  additive="sum"
                />
              )}
              <path
                d={hexPath(34)}
                fill="none"
                stroke="url(#mob-gp)"
                strokeWidth="1.5"
                opacity="0.4"
                filter="url(#mob-glow)"
              >
                {anim && (
                  <>
                    <animate attributeName="opacity" values="0.3;0.65;0.3" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite" />
                  </>
                )}
              </path>
            </g>
          </g>

          {/* Inner hex fill */}
          <g transform={`translate(${CENTER},${CENTER})`}>
            <g>
              {anim && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="-360"
                  dur="40s"
                  repeatCount="indefinite"
                  additive="sum"
                />
              )}
              <path
                d={hexPath(32)}
                fill="rgba(10,15,30,0.75)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
            </g>
          </g>

          {/* KaleidoSwap pictogram */}
          <image href={kaleidoPictogram} x={CENTER - 18} y={CENTER - 18} width={36} height={36} />
        </svg>

        {/* Orbiting protocol icons + connection lines (same rotating container = always in sync) */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={spinTransition}
        >
          {/* Connection lines — no separate rotation needed, parent div handles it */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
            {protocols.map((protocol, index) => {
              const angle = (index / protocols.length) * 360
              const rad = (angle * Math.PI) / 180
              const dx = Math.cos(rad)
              const dy = Math.sin(rad)
              const x1 = CENTER + dx * 36
              const y1 = CENTER + dy * 36
              const x2 = CENTER + dx * (OUTER_RADIUS - ICON_SIZE / 2)
              const y2 = CENTER + dy * (OUTER_RADIUS - ICON_SIZE / 2)
              const color = PROTOCOL_COLORS[protocol.name] ?? '#ffffff'
              const dur = `${2 + index * 0.3}s`
              return (
                <g key={protocol.name}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.25">
                    {anim && <animate attributeName="stroke-dashoffset" from="0" to="-12" dur={`${1.5 + index * 0.2}s`} repeatCount="indefinite" />}
                  </line>
                  <circle r="2" fill={color} opacity="0">
                    {anim && (
                      <>
                        <animate attributeName="cx" values={`${x1};${x2}`} dur={dur} repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${y1};${y2}`} dur={dur} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.85;0" dur={dur} repeatCount="indefinite" />
                        <animate attributeName="r" values="1.5;2.5;1.5" dur={dur} repeatCount="indefinite" />
                      </>
                    )}
                  </circle>
                </g>
              )
            })}
          </svg>

          {protocols.map((protocol, index) => {
            const angle = (index / protocols.length) * 360
            const rad = (angle * Math.PI) / 180
            const x = 140 + Math.cos(rad) * OUTER_RADIUS - ICON_SIZE / 2
            const y = 140 + Math.sin(rad) * OUTER_RADIUS - ICON_SIZE / 2
            const color = PROTOCOL_COLORS[protocol.name] ?? '#ffffff'

            return (
              <motion.div
                key={protocol.name}
                className="absolute"
                style={{ left: x, top: y, width: ICON_SIZE, height: ICON_SIZE }}
                variants={iconVariants}
              >
                {/* Counter-rotate so icons stay upright */}
                <motion.div
                  className="w-full h-full"
                  animate={shouldReduceMotion ? {} : { rotate: -360 }}
                  transition={counterSpinTransition}
                >
                  <div
                    className="w-full h-full rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center"
                    style={{ border: `1px solid ${color}55` }}
                  >
                    {protocol.icon && (
                      <img
                        src={protocol.icon}
                        alt={protocol.name}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
