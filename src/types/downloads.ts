// src/types/downloads.ts
import { LucideIcon } from 'lucide-react'

export interface DownloadVersion {
  version: string
  versionDisplay?: string
  date: string
  notes: string
}

export interface SecondaryDownload {
  label: string
  url: string
  size?: string
}

export interface PlatformDownload {
  platform: string
  icon: LucideIcon
  title: string
  architecture: string[]
  downloadUrl: string
  signatureUrl: string
  manifestUrl?: string
  manifestSignatureUrl?: string
  disabled?: boolean
  note?: string
  secondaryDownloads?: SecondaryDownload[]
}

export interface DownloadsPageProps {
  currentVersion: DownloadVersion
  platforms: PlatformDownload[]
  verificationGuideUrl: string
  manifestUrl: string
  manifestSignatureUrl: string
} 