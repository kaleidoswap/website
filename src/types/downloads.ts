import { LucideIcon } from 'lucide-react'

export interface DownloadVersion {
  version: string
  date: string
  notes: string
}

export interface PlatformDownload {
  platform: 'windows' | 'macos' | 'linux'
  icon: LucideIcon
  title: string
  architecture: string[]
  downloadUrl: string
  signatureUrl: string
}

export interface DownloadsPageProps {
  currentVersion: DownloadVersion
  platforms: PlatformDownload[]
  verificationGuideUrl: string
} 