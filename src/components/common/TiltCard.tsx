import { useRef, useEffect, type ReactNode } from 'react'

interface TiltCardProps {
  src?: string
  alt?: string
  children?: ReactNode
  className?: string
  maxTilt?: number
  proximityRange?: number
}

export const TiltCard = ({
  src,
  alt,
  children,
  className = '',
  maxTilt = 14,
  proximityRange = 320,
}: TiltCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rotRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      const distFromEdgeX = Math.max(0, Math.abs(dx) - rect.width / 2)
      const distFromEdgeY = Math.max(0, Math.abs(dy) - rect.height / 2)
      const distFromEdge = Math.sqrt(distFromEdgeX ** 2 + distFromEdgeY ** 2)
      const falloff = Math.max(0, 1 - distFromEdge / proximityRange)

      const normX = dx / (rect.width / 2)
      const normY = dy / (rect.height / 2)
      const clampedX = Math.max(-1, Math.min(1, normX))
      const clampedY = Math.max(-1, Math.min(1, normY))

      targetRef.current = {
        x: -clampedY * maxTilt * falloff,
        y: clampedX * maxTilt * falloff,
      }
    }

    const tick = () => {
      rotRef.current.x += (targetRef.current.x - rotRef.current.x) * 0.065
      rotRef.current.y += (targetRef.current.y - rotRef.current.y) * 0.065

      const { x, y } = rotRef.current

      if (innerRef.current) {
        innerRef.current.style.transform = `perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`
      }

      // Border gradient angle tracks the tilt direction (light coming from tilt side)
      const angle = 135 + y * 3.5 - x * 2
      const greenIntensity = 0.35 + Math.max(0, -y / maxTilt) * 0.2
      const purpleIntensity = 0.3 + Math.max(0, y / maxTilt) * 0.2
      if (borderRef.current) {
        borderRef.current.style.background = `linear-gradient(${angle}deg, #22c55e 0%, #6366f1 52%, #a855f7 100%)`
        borderRef.current.style.boxShadow = [
          `0 0 45px rgba(34,197,94,${greenIntensity})`,
          `0 0 45px rgba(168,85,247,${purpleIntensity})`,
          `0 25px 80px rgba(0,0,0,0.6)`,
          `inset 0 1px 0 rgba(255,255,255,0.12)`,
        ].join(', ')
      }

      // Ambient glow drifts opposite to tilt (parallax layer)
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${y * 5}px, ${-x * 5}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [maxTilt, proximityRange])

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Ambient glow blob — moves opposite to tilt for parallax depth */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          inset: '-30px',
          borderRadius: '32px',
          filter: 'blur(35px)',
          opacity: 0.45,
          background:
            'radial-gradient(ellipse at 40% 40%, rgba(34,197,94,0.55) 0%, rgba(99,102,241,0.35) 50%, rgba(168,85,247,0.5) 100%)',
        }}
      />

      {/* 3D tilt container */}
      <div
        ref={innerRef}
        className="relative"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Thick border edge — sits behind the front face in Z, creates the "rim" depth */}
        <div
          className="absolute rounded-[20px]"
          style={{
            inset: '-3px',
            transform: 'translateZ(-7px)',
            background:
              'linear-gradient(135deg, #15803d 0%, #4338ca 50%, #7e22ce 100%)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Gradient border frame (front face) */}
        <div
          ref={borderRef}
          className="relative rounded-[20px]"
          style={{
            padding: '3px',
            background:
              'linear-gradient(135deg, #22c55e 0%, #6366f1 52%, #a855f7 100%)',
          }}
        >
          {/* Specular shine overlay — moves with tilt to simulate reflective surface */}
          <div
            className="absolute inset-[3px] rounded-[17px] pointer-events-none z-10"
            style={{
              background: `linear-gradient(${135}deg, rgba(255,255,255,0.08) 0%, transparent 60%)`,
              mixBlendMode: 'screen',
            }}
          />

          {children ?? (
            <img
              src={src}
              alt={alt}
              className="relative block w-full rounded-[17px]"
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
