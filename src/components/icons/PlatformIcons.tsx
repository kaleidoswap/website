// src/components/icons/PlatformIcons.tsx
import { forwardRef } from 'react'
import type { SVGProps } from 'react'
import { siGitforwindows, siApple, siLinux } from 'simple-icons'
// windows not available in simple-icons or lucide-react, use default windows icon

export const WindowsIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d={siGitforwindows.path} />
    </svg>
  )
})

export const AppleIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d={siApple.path} />
    </svg>
  )
})

export const LinuxIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d={siLinux.path} />
    </svg>
  )
})

export const AlertCircleIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
})

WindowsIcon.displayName = 'WindowsIcon'
AppleIcon.displayName = 'AppleIcon'
LinuxIcon.displayName = 'LinuxIcon'
AlertCircleIcon.displayName = 'AlertCircleIcon'