import { Download, ExternalLink, FileText, Shield } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Navbar } from '@/components/nav/Navbar'
import { currentVersion, platforms, verificationGuideUrl, manifestUrl, manifestSignatureUrl } from '@/constants/downloads'
import type { PlatformDownload } from '@/types/downloads'

export const Downloads = () => {
  const downloadFile = (url: string) => {
    window.location.href = url
  }

  const renderPlatformCard = (platform: PlatformDownload) => {
    const Icon = platform.icon

    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary-500/10 shrink-0">
              <Icon className="w-8 h-8 text-primary-400" />
            </div>
            <div className="min-h-[80px] flex flex-col">
              <h3 className="text-xl font-semibold">{platform.title}</h3>
              <p className="text-gray-400">
                {platform.architecture.join(' / ')}
              </p>
              {platform.note && (
                <p className="text-sm text-yellow-400 mt-auto">{platform.note}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="default"
            className="w-full justify-center"
            onClick={() => downloadFile(platform.downloadUrl)}
            disabled={platform.disabled}
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Download KaleidoSwap</h1>
            <p className="text-gray-400 text-lg mb-4">
              Download the latest version of KaleidoSwap for your platform
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>Version {currentVersion.version}</span>
              <span>•</span>
              <span>{currentVersion.date}</span>
              <span>•</span>
              <a
                href={currentVersion.notes}
                className="text-primary-400 hover:text-primary-300 flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Release Notes
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Download Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {platforms.map((platform) => (
              <div key={platform.platform}>
                {renderPlatformCard(platform)}
              </div>
            ))}
          </div>

          {/* Verification Files */}
          <div className="max-w-2xl mx-auto bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-3">Verification Files</h2>
              <p className="text-gray-400">
                Download these files to verify the authenticity of your download
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="justify-center"
                onClick={() => downloadFile(manifestUrl)}
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Manifest
              </Button>
              
              <Button
                variant="outline"
                className="justify-center"
                onClick={() => downloadFile(manifestSignatureUrl)}
              >
                <Shield className="w-5 h-5 mr-2" />
                Download Signature
              </Button>
            </div>
          </div>

          {/* Verification Notice */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-semibold mb-3">Verify Your Download</h2>
            <p className="text-gray-400 mb-4">
              For security, please verify the authenticity of your download using our manifest and public key.
            </p>
            <a
              href={verificationGuideUrl}
              className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Verification Guide
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
} 