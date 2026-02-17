import { useEffect, useRef, useState } from 'react'
import { liveProtocols } from '@/constants/protocols'
import { Zap } from 'lucide-react'

const RING_SIZE = 120
const ICON_SIZE = 40

export const MobileHeroAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full flex justify-center py-8">
      <div className="relative w-[260px] h-[260px]">
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full bg-primary-500/20 blur-xl transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            }}
          />
        </div>

        {/* Center logo */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.7)',
          }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <span className="text-white font-bold text-lg">K</span>
          </div>
        </div>

        {/* Orbit ring */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
          style={{ opacity: isVisible ? 0.3 : 0 }}
        >
          <div
            className="rounded-full border border-dashed border-white/20"
            style={{ width: RING_SIZE * 2, height: RING_SIZE * 2 }}
          />
        </div>

        {/* Protocol icons orbiting */}
        {liveProtocols.map((protocol, index) => {
          const angle = (index / liveProtocols.length) * 360
          const rad = (angle * Math.PI) / 180
          const x = Math.cos(rad) * RING_SIZE
          const y = Math.sin(rad) * RING_SIZE

          return (
            <div
              key={protocol.name}
              className="absolute transition-all ease-out"
              style={{
                left: '50%',
                top: '50%',
                width: ICON_SIZE,
                height: ICON_SIZE,
                marginLeft: -ICON_SIZE / 2,
                marginTop: -ICON_SIZE / 2,
                transform: isVisible
                  ? `translate(${x}px, ${y}px)`
                  : 'translate(0px, 0px) scale(0)',
                opacity: isVisible ? 1 : 0,
                transitionDuration: '800ms',
                transitionDelay: `${300 + index * 120}ms`,
              }}
            >
              <div className="w-full h-full rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center animate-float"
                style={{ animationDelay: `${index * 0.8}s` }}
              >
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
            </div>
          )
        })}

        {/* Connecting lines (subtle) */}
        <svg
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '800ms' }}
          viewBox="0 0 260 260"
        >
          {liveProtocols.map((_, index) => {
            const angle = (index / liveProtocols.length) * 360
            const rad = (angle * Math.PI) / 180
            const x = 130 + Math.cos(rad) * RING_SIZE
            const y = 130 + Math.sin(rad) * RING_SIZE
            return (
              <line
                key={index}
                x1="130"
                y1="130"
                x2={x}
                y2={y}
                stroke="white"
                strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
