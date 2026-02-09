import type { FooterProps } from '@/types/footer'
import { GitHubIcon, TelegramIcon, XIcon } from '@/components/icons/SocialIcons'

export const footerConfig: FooterProps = {
  sections: [
    {
      title: "Product",
      links: [
        { label: "Download Alpha", href: "/downloads" },
        { label: "Documentation", href: "https://docs.kaleidoswap.com", external: true },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "GitHub Repository", href: "https://github.com/kaleidoswap", external: true },
        { label: "RGB Protocol", href: "https://rgb.info", external: true },
        { label: "Lightning Network", href: "https://lightning.network", external: true },
        { label: "Bitcoin Whitepaper", href: "https://bitcoin.org/bitcoin.pdf", external: true }
      ]
    },
    {
      title: "Community",
      links: [
        { label: "Telegram", href: "https://t.me/kaleidoswap", external: true },
        { label: "Twitter/X", href: "https://x.com/kaleidoswap", external: true },
        { label: "Blog", href: "https://medium.kaleidoswap.com", external: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "https://github.com/kaleidoswap/desktop-app/security", external: true }
      ]
    }
  ],
  socials: [
    {
      platform: "GitHub",
      href: "https://github.com/kaleidoswap",
      icon: GitHubIcon
    },
    {
      platform: "Telegram",
      href: "https://t.me/kaleidoswap",
      icon: TelegramIcon
    },
    {
      platform: "X",
      href: "https://x.com/kaleidoswap",
      icon: XIcon
    }
  ]
} 