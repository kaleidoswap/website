import { motion, useReducedMotion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { protocols } from '@/constants/protocols'

const OUTER_RADIUS = 118
const INNER_RADIUS = 80
const ICON_SIZE = 40

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

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-primary-500/20 blur-xl" />
        </div>

        {/* Center KaleidoSwap mark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={iconVariants}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <svg viewBox="0 0 208 209" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </svg>
          </div>
        </motion.div>

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
