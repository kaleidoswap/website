// src/pages/products/SDK.tsx
import { Code, Package, BookOpen, Terminal, ArrowRight, ExternalLink, Check, Copy } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { footerConfig } from '@/constants/footer'
import { PRODUCTS, GITHUB } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const features = [
  {
    icon: Package,
    title: 'Multi-Language SDKs',
    description: 'Built in Rust with native bindings for Python and TypeScript.',
  },
  {
    icon: Code,
    title: 'Type Safe',
    description: 'Auto-generated models from OpenAPI specs with full type definitions.',
  },
  {
    icon: Terminal,
    title: 'Real-Time WebSocket',
    description: 'Live price streaming, quote updates, and auto-reconnection.',
  },
  {
    icon: BookOpen,
    title: 'Open Source',
    description: 'MIT licensed. Fork, modify, and contribute.',
  },
]

const useCases = [
  {
    title: 'Market Data',
    description: 'Fetch assets, trading pairs, and real-time quotes from any application.',
    language: 'typescript',
    code: `import { KaleidoClient } from 'kaleidoswap-sdk';

const client = KaleidoClient.create({
  baseUrl: 'https://api.kaleidoswap.com',
});

// List available assets
const assets = await client.maker.listAssets();
console.log(\`Found \${assets.length} assets\`);

// Get all trading pairs
const pairs = await client.maker.listPairs();

// Get a quote for BTC → USDT
const quote = await client.maker.getQuote({
  from_asset: 'BTC',
  to_asset: 'USDT',
  from_amount: 100_000,
  from_layer: 'BTC_LN',
  to_layer: 'RGB_LN',
});
console.log(\`Rate: \${quote.rate}\`);`,
  },
  {
    title: 'Atomic Swaps',
    description: 'Execute trustless swaps across Bitcoin layers with full type safety.',
    language: 'python',
    code: `from kaleidoswap import KaleidoClient, KaleidoConfig

config = KaleidoConfig(
    base_url="https://api.kaleidoswap.com"
)
client = KaleidoClient(config)

# Get a quote
quote = client.market.get_best_quote(
    "BTC/USDT", 1_000_000
)
print(f"Rate: {quote.price}")
print(f"Fee: {quote.fee.amount} {quote.fee.asset_ticker}")

# Initiate and track a swap
swap = client.swaps.initiate_swap(quote.rfq_id)
status = client.swaps.get_swap_status(swap.swap_id)
print(f"Swap status: {status.state}")`,
  },
  {
    title: 'Real-Time Streaming',
    description: 'Stream live prices and quotes with WebSocket auto-reconnection.',
    language: 'rust',
    code: `use kaleidoswap_core::{KaleidoClient, KaleidoConfig, WsEvent};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = KaleidoConfig::new(
        "https://api.kaleidoswap.com"
    );
    let client = KaleidoClient::new(config)?;

    // Stream real-time price updates
    client.connect_websocket().await?;

    client.on_websocket_event(
        WsEvent::PriceUpdate, |data| {
        println!("Price: {} - \${}",
            data["pair"], data["price"]);
    }).await?;

    client.subscribe_to_pair("BTC/USDT").await?;
    Ok(())
}`,
  },
]

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-white/5">
        <span className="text-xs text-slate-500">{language}</span>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  )
}

export const SDK = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Developer SDK"
        description="Integrate KaleidoSwap into your application. Rust, Python, and TypeScript SDKs with full documentation and examples."
        url="/products/sdk"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6">
              <Code className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                {t('Developer Tools')}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('Build on KaleidoSwap')}
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              {t('Integrate atomic swaps into your wallet, exchange, or application. Built in Rust with native bindings for Python and TypeScript.')}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => window.open(PRODUCTS.docs, '_blank')}
                className="bg-green-500 hover:bg-green-600"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {t('Read the Docs')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(GITHUB.orgUrl, '_blank')}
              >
                {t('View on GitHub')}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Install commands */}
            <div className="flex flex-col gap-2">
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm inline-flex items-center gap-4">
                <span className="text-slate-500">$</span>
                <span className="text-green-400">pnpm add kaleidoswap-sdk</span>
                <button
                  onClick={() => navigator.clipboard.writeText('pnpm add kaleidoswap-sdk')}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm inline-flex items-center gap-4">
                <span className="text-slate-500">$</span>
                <span className="text-green-400">pip install kaleidoswap-sdk</span>
                <button
                  onClick={() => navigator.clipboard.writeText('pip install kaleidoswap-sdk')}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 rounded-xl">
                <feature.icon className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t(feature.title)}</h3>
                <p className="text-slate-400 text-sm">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases with Code Examples */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">{t('Use Cases')}</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            {t('See how developers are building with KaleidoSwap')}
          </p>

          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.title}
                className={`grid md:grid-cols-2 gap-8 items-start ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <h3 className="text-2xl font-bold mb-3">{t(useCase.title)}</h3>
                  <p className="text-slate-400 mb-4">{t(useCase.description)}</p>
                  <a
                    href={PRODUCTS.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    {t('View full example')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <CodeBlock
                    code={useCase.code}
                    language={useCase.language}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('API Reference')}</h2>
                <p className="text-slate-400 mb-6">
                  {t('Complete API documentation with typed models auto-generated from OpenAPI specs across all languages.')}
                </p>
                <ul className="space-y-3 mb-6">
                  {['Market, Swap & Order APIs', 'WebSocket real-time streaming', 'RGB Lightning Node integration', 'LSPS1 channel management'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-green-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.open(PRODUCTS.docs, '_blank')}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {t('Explore API Docs')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm">
                <div className="text-slate-500 mb-2">// {t('API Response Types')}</div>
                <div className="text-purple-400">interface</div>
                <span className="text-green-400"> PairQuoteResponse </span>
                <span className="text-white">{'{'}</span>
                <div className="pl-4 text-slate-400">
                  <div>rfq_id: <span className="text-yellow-400">string</span></div>
                  <div>from_asset: <span className="text-yellow-400">string</span></div>
                  <div>to_asset: <span className="text-yellow-400">string</span></div>
                  <div>from_amount: <span className="text-yellow-400">number</span></div>
                  <div>to_amount: <span className="text-yellow-400">number</span></div>
                  <div>rate: <span className="text-yellow-400">number</span></div>
                  <div>fee: <span className="text-yellow-400">Fee</span></div>
                  <div>expires_at: <span className="text-yellow-400">number</span></div>
                </div>
                <span className="text-white">{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('Start Building')}</h2>
          <p className="text-slate-400 mb-8">
            {t('Join developers building the future of Bitcoin trading.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.open(PRODUCTS.docs, '_blank')}
              className="bg-green-500 hover:bg-green-600"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t('Read Documentation')}
            </Button>
          </div>
        </div>
      </section>

      <Footer {...footerConfig} />
    </div>
  )
}
