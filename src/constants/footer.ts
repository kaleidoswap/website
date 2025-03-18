import type { FooterProps } from '@/types/footer'
import { GitHubIcon, TelegramIcon, XIcon } from '@/components/icons/SocialIcons'

export const footerConfig: FooterProps = {
  sections: [
    {
      title: "Product",
      links: [
        { label: "Download", href: "https://github.com/kaleidoswap/desktop-app/releases", external: true },
        { label: "Documentation", href: "https://docs.kaleidoswap.com", external: true },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "GitHub", href: "https://github.com/kaleidoswap", external: true },
        { label: "RGB Protocol", href: "https://rgb.info", external: true },
        { label: "RGB Lightning Node", href: "https://github.com/RGB-Tools/rgb-lightning-node", external: true }
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