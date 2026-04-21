import { motion, useReducedMotion } from 'framer-motion'
import { Zap } from 'lucide-react'
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

          {/* Connection lines — rotate in sync with icon orbit */}
          <g>
            {anim && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${CENTER} ${CENTER}`}
                to={`360 ${CENTER} ${CENTER}`}
                dur="20s"
                repeatCount="indefinite"
              />
            )}
            {protocols.map((protocol, index) => {
              const angle = (index / protocols.length) * 360
              const rad = (angle * Math.PI) / 180
              const dx = Math.cos(rad)
              const dy = Math.sin(rad)
              const x1 = CENTER + dx * 28
              const y1 = CENTER + dy * 28
              const x2 = CENTER + dx * OUTER_RADIUS
              const y2 = CENTER + dy * OUTER_RADIUS
              const color = PROTOCOL_COLORS[protocol.name] ?? '#ffffff'
              const dur = `${2 + index * 0.3}s`
              return (
                <g key={protocol.name}>
                  {/* Colored dashed line */}
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={color}
                    strokeWidth="0.8"
                    strokeDasharray="2 4"
                    opacity="0.25"
                  >
                    {anim && (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0" to="-12"
                        dur={`${1.5 + index * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </line>
                  {/* Energy pulse dot */}
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
          </g>

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
          <path
            d={hexPath(28)}
            transform={`translate(${CENTER},${CENTER})`}
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

          {/* Inner hex fill */}
          <path
            d={hexPath(26)}
            transform={`translate(${CENTER},${CENTER})`}
            fill="rgba(10,15,30,0.75)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />

          {/* KaleidoSwap logo mark */}
          <g transform={`translate(${CENTER - 19},${CENTER - 19}) scale(0.182)`}>
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
        </svg>

        {/* Orbiting protocol icons */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={spinTransition}
        >
          {protocols.map((protocol, index) => {
            const angle = (index / protocols.length) * 360
            const rad = (angle * Math.PI) / 180
            const x = 140 + Math.cos(rad) * OUTER_RADIUS - ICON_SIZE / 2
            const y = 140 + Math.sin(rad) * OUTER_RADIUS - ICON_SIZE / 2

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
                  <div className="w-full h-full rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                    {protocol.icon ? (
                      <img
                        src={protocol.icon}
                        alt={protocol.name}
                        className="w-5 h-5 object-contain"
                      />
                    ) : protocol.lucideIcon === Zap ? (
                      <Zap className="w-5 h-5 text-yellow-500" />
                    ) : null}
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
