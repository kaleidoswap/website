import type { FooterProps } from '@/types/footer'
import { GitHubIcon, TelegramIcon, XIcon } from '@/components/icons/SocialIcons'
import { PRODUCTS, SOCIALS, GITHUB, EXTERNAL } from '@/constants/urls'

export const footerConfig: FooterProps = {
  sections: [
    {
      title: "Product",
      links: [
        { label: "Download Alpha", href: "/downloads" },
        { label: "Documentation", href: PRODUCTS.docs, external: true },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "GitHub Repository", href: GITHUB.orgUrl, external: true },
        { label: "RGB Protocol", href: EXTERNAL.rgbInfo, external: true },
        { label: "Lightning Network", href: EXTERNAL.lightningNetwork, external: true },
        { label: "Bitcoin Whitepaper", href: EXTERNAL.bitcoinWhitepaper, external: true }
      ]
    },
    {
      title: "Community",
      links: [
        { label: "Telegram", href: SOCIALS.telegram, external: true },
        { label: "Twitter/X", href: SOCIALS.twitter, external: true },
        { label: "Blog", href: PRODUCTS.blog, external: true }
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
      platform: "X",
      href: SOCIALS.twitter,
      icon: XIcon
    }
  ]
} 