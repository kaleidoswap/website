import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/common/Button'
import type { MarketMaker } from '@/types/marketMakers'

interface MarketMakerCardProps {
  marketMaker: MarketMaker;
  index: number;
}

export const MarketMakerCard = ({ marketMaker, index }: MarketMakerCardProps) => {
  const { name, description, logoUrl, website, registryUrl, supportedNetworks, supportedAssets, tradingPairs } = marketMaker;
  
  return (
    <div 
      className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 animate-fadeIn"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className="flex items-center mb-4">
        {logoUrl && (
          <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
            <img src={logoUrl} alt={name} className="w-10 h-10 object-contain" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {supportedNetworks.map((network) => (
              <span key={network} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                {network}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">Supported Assets</h4>
        <div className="flex flex-wrap gap-2">
          {supportedAssets.map((asset) => (
            <span key={asset} className="text-xs px-2 py-1 rounded-full bg-secondary-500/10 text-secondary-300">
              {asset}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">Trading Pairs</h4>
        <div className="flex flex-wrap gap-2">
          {tradingPairs.map((pair) => (
            <span key={pair.pairId} className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-300">
              {pair.baseAsset}/{pair.quoteAsset}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.open(registryUrl, '_blank')}
          className="flex items-center justify-center"
        >
          <span>View Registry</span>
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
        
        {website && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(website, '_blank')}
            className="flex items-center justify-center"
          >
            <span>Website</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
} 