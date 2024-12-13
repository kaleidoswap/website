// src/constants/footer.ts
import { Github, Twitter } from 'lucide-react'
import type { FooterProps } from '@/types/footer'

export const footerConfig: FooterProps = {
  sections: [
    {
      title: "Product",
      links: [
        { label: "Download", href: "https://github.com/kaleidoswap/desktop-app/releases", external: true },
        { label: "Documentation", href: "https://docs.kaleidoswap.com", external: true },
        { label: "Security", href: "https://docs.kaleidoswap.com/security", external: true }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "GitHub", href: "https://github.com/kaleidoswap", external: true },
        { label: "RGB Protocol", href: "https://rgb.tech", external: true },
        { label: "Lightning Network", href: "https://lightning.network", external: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  ],
  socials: [
    {
      platform: "GitHub",
      href: "https://github.com/kaleidoswap",
      icon: Github
    },
    {
      platform: "Twitter",
      href: "https://twitter.com/kaleidoswap",
      icon: Twitter
    }
  ]
}