// src/components/animations/ProtocolOrbitAnimation.tsx
import React from 'react'

// Protocol logos
import bitcoinLogo from '@/assets/icons/bitcoin/bitcoin-logo.svg'
import rgbLogo from '@/assets/icons/rgb/rgb-logo.svg'
import sparkAsterisk from '@/assets/icons/spark/Asterisk/Spark Asterisk White.svg'
import arkadeLogo from '@/assets/icons/arkade/arkade-icon.svg'
import liquidLogo from '@/assets/icons/liquid/logo-liquid.svg'
import taprootLogo from '@/assets/icons/taproot-assets/tapass-logo.png'
import kaleidoLogo from '@/assets/kaleidoswap-mark.svg'

interface ProtocolOrbitAnimationProps {
  size?: number
  className?: string
}

interface Protocol {
  name: string
  logo: string
  color: string
  glowColor: string
}

const innerOrbitProtocols: (Protocol & { isLightning?: boolean })[] = [
  { name: 'Bitcoin', logo: bitcoinLogo, color: '#F7931A', glowColor: 'rgba(247, 147, 26, 0.5)' },
  { name: 'Lightning', logo: '', color: '#fbbf24', glowColor: 'rgba(251, 191, 36, 0.5)', isLightning: true },
  { name: 'RGB', logo: rgbLogo, color: '#8a5cf6', glowColor: 'rgba(138, 92, 246, 0.5)' },
  { name: 'Spark', logo: sparkAsterisk, color: '#FFFFFF', glowColor: 'rgba(255, 255, 255, 0.3)' },
]

const outerOrbitProtocols: Protocol[] = [
  { name: 'Arkade', logo: arkadeLogo, color: '#22c55e', glowColor: 'rgba(34, 197, 94, 0.5)' },
  { name: 'Liquid', logo: liquidLogo, color: '#14909c', glowColor: 'rgba(20, 144, 156, 0.5)' },
  { name: 'Taproot', logo: taprootLogo, color: '#F7931A', glowColor: 'rgba(247, 147, 26, 0.5)' },
]

export const ProtocolOrbitAnimation: React.FC<ProtocolOrbitAnimationProps> = ({
  size = 500,
  className = ''
}) => {
  const center = size / 2
  const innerOrbitRadius = size * 0.28
  const outerOrbitRadius = size * 0.42
  const logoSize = size * 0.1
  const centerLogoSize = size * 0.18

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background glow effects */}
      <div
        className="absolute rounded-full blur-3xl animate-pulse"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          left: center - (size * 0.3),
          top: center - (size * 0.3),
          background: 'radial-gradient(circle, rgba(14, 157, 255, 0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl animate-pulse"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          left: center - (size * 0.2),
          top: center - (size * 0.2),
          background: 'radial-gradient(circle, rgba(138, 92, 246, 0.15) 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />

      {/* Orbit rings */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Outer orbit ring */}
        <circle
          cx={center}
          cy={center}
          r={outerOrbitRadius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          strokeDasharray="8 4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${center} ${center}`}
            to={`360 ${center} ${center}`}
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Inner orbit ring */}
        <circle
          cx={center}
          cy={center}
          r={innerOrbitRadius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="6 3"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`360 ${center} ${center}`}
            to={`0 ${center} ${center}`}
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Center glow ring */}
        <circle
          cx={center}
          cy={center}
          r={centerLogoSize * 0.8}
          fill="none"
          stroke="url(#centerRingGradient)"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values={`${centerLogoSize * 0.75};${centerLogoSize * 0.85};${centerLogoSize * 0.75}`}
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.3;0.6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="centerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e9dff" />
            <stop offset="50%" stopColor="#8a5cf6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>

      {/* Outer orbit protocols */}
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}
      >
        {outerOrbitProtocols.map((protocol, index) => {
          const angle = (index * 120) * (Math.PI / 180)
          const x = center + outerOrbitRadius * Math.cos(angle) - logoSize / 2
          const y = center + outerOrbitRadius * Math.sin(angle) - logoSize / 2

          return (
            <div
              key={protocol.name}
              className="absolute animate-spin"
              style={{
                left: x,
                top: y,
                width: logoSize,
                height: logoSize,
                animationDuration: '30s',
                animationDirection: 'reverse',
                animationTimingFunction: 'linear',
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center p-2 backdrop-blur-sm transition-transform hover:scale-125 cursor-pointer group relative"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: `0 0 20px ${protocol.glowColor}`,
                }}
                title={protocol.name}
              >
                <img
                  src={protocol.logo}
                  alt={protocol.name}
                  className="w-full h-full object-contain"
                />
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {protocol.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Inner orbit protocols */}
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: '20s', animationDirection: 'reverse', animationTimingFunction: 'linear' }}
      >
        {innerOrbitProtocols.map((protocol, index) => {
          const angle = (index * 90) * (Math.PI / 180)
          const x = center + innerOrbitRadius * Math.cos(angle) - logoSize / 2
          const y = center + innerOrbitRadius * Math.sin(angle) - logoSize / 2

          return (
            <div
              key={protocol.name}
              className="absolute animate-spin"
              style={{
                left: x,
                top: y,
                width: logoSize,
                height: logoSize,
                animationDuration: '20s',
                animationTimingFunction: 'linear',
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center p-2.5 backdrop-blur-sm transition-transform hover:scale-125 cursor-pointer group relative"
                style={{
                  background: protocol.isLightning ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.08)',
                  border: protocol.isLightning ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: `0 0 25px ${protocol.glowColor}`,
                }}
                title={protocol.name}
              >
                {protocol.isLightning ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3/5 h-3/5"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#fbbf24" />
                  </svg>
                ) : (
                  <img
                    src={protocol.logo}
                    alt={protocol.name}
                    className="w-full h-full object-contain"
                  />
                )}
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {protocol.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Center KaleidoSwap logo */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: center - centerLogoSize / 2,
          top: center - centerLogoSize / 2,
          width: centerLogoSize,
          height: centerLogoSize,
        }}
      >
        <div
          className="w-full h-full rounded-2xl flex items-center justify-center p-3 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, rgba(14, 157, 255, 0.2) 0%, rgba(138, 92, 246, 0.2) 100%)',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 0 40px rgba(14, 157, 255, 0.3), 0 0 60px rgba(138, 92, 246, 0.2)',
            animationDuration: '3s',
          }}
        >
          <img
            src={kaleidoLogo}
            alt="KaleidoSwap"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-ping"
          style={{
            width: 4,
            height: 4,
            left: center + (Math.random() - 0.5) * size * 0.8,
            top: center + (Math.random() - 0.5) * size * 0.8,
            background: ['#0e9dff', '#8a5cf6', '#22c55e', '#F7931A'][i % 4],
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}

export default ProtocolOrbitAnimation
