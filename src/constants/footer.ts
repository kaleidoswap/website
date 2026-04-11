import type { FooterProps } from '@/types/footer'
import { GitHubIcon, TelegramIcon, XIcon, MediumIcon, RumbleIcon } from '@/components/icons/SocialIcons'
import { PRODUCTS, SOCIALS, GITHUB, EXTERNAL } from '@/constants/urls'

export const footerConfig: FooterProps = {
  sections: [
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: PRODUCTS.docs, external: true },
        { label: "GitHub Repository", href: GITHUB.orgUrl, external: true },
        { label: "RGB Protocol", href: EXTERNAL.rgbInfo, external: true },
        { label: "Lightning Network", href: EXTERNAL.lightningNetwork, external: true },
        { label: "Bitcoin Whitepaper", href: EXTERNAL.bitcoinWhitepaper, external: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: GITHUB.securityUrl, external: true }
      ]
    }
  ],
  socials: [
    {
      platform: "GitHub",
      href: SOCIALS.github,
      icon: GitHubIcon
    },
    {
      platform: "Telegram",
      href: SOCIALS.telegram,
      icon: TelegramIcon
    },
    {
      platform: "Medium",
      href: SOCIALS.medium,
      icon: MediumIcon
    },
    {
      platform: "Rumble",
      href: "https://rumble.com/user/kaleidoswap?e9s=src_v1_cbl",
      icon: RumbleIcon
    },
    {
      platform: "X",
      href: SOCIALS.twitter,
      icon: XIcon
    }
  ]
} 