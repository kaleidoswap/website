import { 
  Monitor, 
  Monitor as AppleLogo,
  MonitorDown 
} from 'lucide-react'
import type { DownloadVersion, PlatformDownload } from '@/types/downloads'

export const currentVersion: DownloadVersion = {
  version: '0.1.0',
  date: '2024-03-20',
  notes: 'https://github.com/kaleidoswap/desktop-app/releases/tag/v0.1.0'
}

export const platforms: PlatformDownload[] = [
  {
    platform: 'windows',
    icon: Monitor,
    title: 'Windows',
    architecture: ['x64', 'arm64'],
    downloadUrl: 'https://github.com/kaleidoswap/desktop-app/releases/download/v0.1.0/KaleidoSwap-0.1.0-win',
    signatureUrl: 'https://github.com/kaleidoswap/desktop-app/releases/download/v0.1.0/KaleidoSwap-0.1.0-win.sig'
  },
  {
    platform: 'macos',
    icon: AppleLogo,
    title: 'macOS',
    architecture: ['x64', 'arm64'],
    downloadUrl: 'https://github.com/kaleidoswap/desktop-app/releases/download/v0.1.0/KaleidoSwap-0.1.0-mac',
    signatureUrl: 'https://github.com/kaleidoswap/desktop-app/releases/download/v0.1.0/KaleidoSwap-0.1.0-mac.sig'
  },
  {
    platform: 'linux',
    icon: MonitorDown,
    title: 'Linux',
    architecture: ['x64', 'arm64'],
    downloadUrl: 'https://github.com/kaleidoswap/desktop-app/releases/download/v0.1.0/KaleidoSwap-0.1.0-linux',
    signatureUrl: 'https://github.com/kaleidoswap/desktop-app/releases/download/v0.1.0/KaleidoSwap-0.1.0-linux.sig'
  }
]

export const verificationGuideUrl = 'https://github.com/kaleidoswap/desktop-app/blob/main/docs/VERIFICATION.md' 