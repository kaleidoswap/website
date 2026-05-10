import { useRef, useState, useEffect } from 'react'

interface MacbookMockupProps {
  src: string
  alt?: string
  className?: string
}

export const MacbookMockup = ({ src, alt = '', className = '' }: MacbookMockupProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsOpen(true)
      return
    }

    const open = () => setTimeout(() => setIsOpen(true), 150)

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { open(); observer.disconnect() } },
      { threshold: 0.2, rootMargin: '0px' }
    )
    observer.observe(el)

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0) {
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => { clearTimeout(timer); observer.disconnect() }
    }
    return () => observer.disconnect()
  }, [])

  /*
   * Geometry (final):
   *
   *   perspective: 2000px  →  large value = minimal distortion, flat/frontal screen
   *   perspectiveOrigin: 50% 60%  →  viewer slightly below center
   *
   *   Stage: rotateX(-12deg) only — NO rotateY → laptop perfectly parallel to page
   *     -12deg: top of scene tilts toward viewer (viewer looks slightly up)
   *
   *   Lid:  transform-origin 50% 100% (hinge at bottom)
   *     closed: rotateX(-90deg) → flat over keyboard, screenshot hidden
   *     open:   rotateX(0deg)   → vertical, screen faces viewer frontally ✓
   *
   *   Keyboard: position:absolute at top:100% (just below lid = hinge)
   *     transform-origin: 50% 0%  → pivot at its top edge = hinge
   *     transform: rotateX(90deg) → keyboard lies flat, horizontal, extending toward viewer
   *     height: 155px             → becomes the keyboard's 3D depth
   *     Key surface (CSS front face) faces upward → visible from viewer below ✓
   *     Perspective creates strong foreshortening: front edge close, hinge far ✓
   */

  const lidTransform = isOpen ? 'rotateX(0deg)' : 'rotateX(-90deg)'
  const lidTransition = isOpen
    ? 'transform 2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
    : 'none'
  const screenOpacity = isOpen ? 1 : 0
  const screenTransition = isOpen ? 'opacity 0.8s ease-out 1.3s' : 'none'

  return (
    <div
      ref={ref}
      className={`relative select-none ${className}`}
      style={{ perspective: '2000px', perspectiveOrigin: '50% 60%' }}
    >
      {/* Ambient glow — appears with the screen */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-50px',
          borderRadius: '50px',
          filter: 'blur(70px)',
          opacity: isOpen ? 0.28 : 0,
          transition: isOpen ? 'opacity 1s ease-out 1.5s' : 'none',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.45) 0%, rgba(99,102,241,0.25) 55%, rgba(168,85,247,0.35) 100%)',
        }}
      />

      {/* Stage — rotateX(-12deg) only for perfect alignment with page elements */}
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-12deg)',
        }}
      >
        {/* ── LID ──
            pivot: 50% 100% = bottom edge = hinge
            closed → open: -90deg → 0deg                                   */}
        <div
          style={{
            transformOrigin: '50% 100%',
            transformStyle: 'preserve-3d',
            transform: lidTransform,
            transition: lidTransition,
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(180deg, #2e3f52 0%, #1b2a3a 65%, #111e2b 100%)',
              borderRadius: '14px 14px 3px 3px',
              padding: '10px 10px 5px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
            }}
          >
            {/* Notch with camera */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12%',
                height: '22px',
                background: '#080f1a',
                borderRadius: '0 0 12px 12px',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#162030',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              />
            </div>

            {/* Screen bezel */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#000',
                borderRadius: '6px',
              }}
            >
              <div style={{ height: '20px', background: '#000' }} />
              <div
                style={{
                  padding: '0 5px 5px',
                  opacity: screenOpacity,
                  transition: screenTransition,
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{ width: '100%', display: 'block', borderRadius: '3px' }}
                  draggable={false}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
                  zIndex: 1,
                }}
              />
            </div>

            <div style={{ height: '5px' }} />
          </div>
        </div>

        {/* ── KEYBOARD BASE ──
            Positioned absolutely at the hinge (top: 100% of lid in DOM).
            transform-origin: top  → pivot at hinge.
            rotateX(90deg)         → keyboard lies FLAT and horizontal,
                                     extending toward the viewer.
            With stage rotateX(-12deg) (viewer below), the key surface (CSS front face,
            now pointing upward) is visible from below → strong perspective effect. ✓  */}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '155px',
            transformOrigin: '50% 0%',
            transform: 'rotateX(90deg)',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(180deg, #1d2e3f 0%, #111e2b 100%)',
            borderRadius: '0 0 14px 14px',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04) inset, 0 2px 0 rgba(255,255,255,0.03) inset',
          }}
        >
          {/* Hinge groove at top of keyboard */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '5%',
              right: '5%',
              height: '4px',
              background: '#080f1a',
              borderRadius: '0 0 4px 4px',
            }}
          />

          {/* Keyboard rows */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '20px',
              right: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[13, 14, 13, 10].map((n, row) => (
              <div key={row} style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: n }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '8px',
                      borderRadius: '2px',
                      background: 'rgba(148,163,184,0.13)',
                      boxShadow: '0 1px 0 rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Trackpad */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '34%',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(148,163,184,0.09)',
              border: '1px solid rgba(148,163,184,0.07)',
            }}
          />

          {/* Front thickness face — rotateX(-90deg) inside parent's rotateX(90deg) = vertical, facing viewer */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '18px',
              transformOrigin: '50% 0%',
              transform: 'rotateX(-90deg)',
              background: 'linear-gradient(180deg, #1a2d3e 0%, #0c1825 100%)',
              borderRadius: '0 0 14px 14px',
              boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.04)',
            }}
          />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: '8%',
          right: '8%',
          height: '24px',
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
          filter: 'blur(12px)',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
