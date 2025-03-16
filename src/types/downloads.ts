// src/types/downloads.ts
import { LucideIcon } from 'lucide-react'

export interface DownloadVersion {
  version: string
  versionDisplay?: string
  date: string
  notes: string
}

export interface PlatformDownload {
  platform: string
  icon: LucideIcon
  title: string
  architecture: string[]
  downloadUrl: string
  signatureUrl: string
  disabled?: boolean
  note?: string
}

export interface DownloadsPageProps {
  currentVersion: DownloadVersion
  platforms: PlatformDownload[]
  verificationGuideUrl: string
} 