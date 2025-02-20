import { forwardRef } from 'react'
import type { SVGProps } from 'react'
import { siGithub, siTelegram, siX } from 'simple-icons'

export const GitHubIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d={siGithub.path} />
    </svg>
  )
})

export const TelegramIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d={siTelegram.path} />
    </svg>
  )
})

export const XIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <path d={siX.path} />
    </svg>
  )
})

GitHubIcon.displayName = 'GitHubIcon'
TelegramIcon.displayName = 'TelegramIcon'
XIcon.displayName = 'XIcon' 