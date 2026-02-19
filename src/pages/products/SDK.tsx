// src/pages/products/SDK.tsx
import { Code, Package, BookOpen, Terminal, ArrowRight, ExternalLink, Check, Copy } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { Button } from '@/components/common/Button'
import { AnimateIn } from '@/components/animations/AnimateIn'
import { footerConfig } from '@/constants/footer'
import { PRODUCTS, DOCS } from '@/constants/urls'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const features = [
  {
    icon: Package,
    title: 'TypeScript & Python',
    description: 'Native SDKs for TypeScript and Python, auto-generated from OpenAPI specs with full type safety.',
  },
  {
    icon: Code,
    title: 'Type Safe',
    description: 'Auto-generated models from OpenAPI specs — full TypeScript types and Python Pydantic models.',
  },
  {
    icon: Terminal,
    title: 'Real-Time WebSocket',
    description: 'Live quote streaming, price updates, and auto-reconnection built in.',
  },
  {
    icon: BookOpen,
    title: 'MIT Licensed',
    description: 'Open source and free to use. Fork, modify, and contribute.',
  },
]

const useCases = [
  {
    title: 'Market Data',
    description: 'Fetch trading pairs and real-time quotes with full type safety from any TypeScript application.',
    language: 'typescript',
    code: `import { KaleidoClient, createAssetPairMapper } from 'kaleidoswap-sdk';

const client = KaleidoClient.create({
  baseUrl: 'https://api.kaleidoswap.com',
});

// list available trading pairs
const pairsResponse = await client.maker.listPairs();
const mapper = createAssetPairMapper(pairsResponse);

const btc  = mapper.findByTicker('BTC');
const usdt = mapper.findByTicker('USDT');

// get a quote for 0.001 BTC → USDT
const quote = await client.maker.getQuote({
  from_asset: { asset_id: btc.asset_id,  layer: 'BTC_LN', amount: 100_000 },
  to_asset:   { asset_id: usdt.asset_id, layer: 'RGB_LN' },
});

console.log(\`Price:   \${quote.price}\`);
console.log(\`Expires: \${new Date(quote.expires_at).toLocaleString()}\`);`,
  },
  {
    title: 'Atomic Swaps',
    description: 'Execute trustless swaps across Bitcoin layers from Python with Pydantic-typed models.',
    language: 'python',
    code: `from kaleidoswap_sdk import (
    KaleidoClient, Layer,
    PairQuoteRequest, SwapLegInput,
    CreateSwapOrderRequest,
)

client = KaleidoClient.create(base_url="https://api.kaleidoswap.com")

# request a quote
quote = await client.maker.get_quote(PairQuoteRequest(
    from_asset=SwapLegInput(
        asset_id="BTC",
        layer=Layer.BTC_LN,
        amount=100_000,
    ),
    to_asset=SwapLegInput(
        asset_id="USDT",
        layer=Layer.RGB_LN,
    ),
))
print(f"Price: {quote.price} | RFQ: {quote.rfq_id}")

# build the order request (rfq_id, from/to assets, receiver_address)
order_req = CreateSwapOrderRequest(
    rfq_id=quote.rfq_id,
    from_asset=...,  # from quote.from_asset
    to_asset=...,    # from quote.to_asset
)
order  = await client.maker.create_swap_order(order_req)
result = await client.maker.wait_for_swap_completion(order.id)
print(f"Swap status: {result.status}")`,
  },
  {
    title: 'Real-Time Streaming',
    description: 'Stream live quotes over WebSocket with built-in auto-reconnection and typed event handlers.',
    language: 'typescript',
    code: `import { KaleidoClient } from 'kaleidoswap-sdk';
import { randomUUID } from 'crypto';

const client = KaleidoClient.create({
  baseUrl: 'https://api.kaleidoswap.com',
});

// open a WebSocket connection
const clientId = randomUUID();
const ws = client.maker.enableWebSocket(
  \`wss://api.kaleidoswap.com/api/v1/market/ws/\${clientId}\`
);

ws.on('connected',     () => console.log('Connected'));
ws.on('disconnected',  () => console.log('Disconnected'));
ws.on('quoteResponse', (quote) => {
  console.log(\`\${quote.from_amount} → \${quote.to_amount}\`);
  console.log(\`Price: \${quote.price}\`);
});

await ws.connect();

// stream live quotes for BTC/USDT
ws.requestQuote({
  from_asset: 'btc',  to_asset: 'usdt',
  from_amount: 100_000,
  from_layer:  'BTC_LN',
  to_layer:    'RGB_LN',
});`,
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
    <div className="relative bg-gray-900 rounded-xl overflow-hidden w-full max-w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-white/5">
        <span className="text-xs text-slate-500">{language}</span>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm max-w-full">
        <code className="text-slate-300 text-xs sm:text-sm">{code}</code>
      </pre>
    </div>
  )
}

const installTabs = [
  { label: 'npm', color: 'text-red-400', cmd: 'pnpm add kaleidoswap-sdk' },
  { label: 'pip', color: 'text-blue-400', cmd: 'pip install kaleidoswap-sdk' },
]

const InstallTabs = () => {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(installTabs[active].cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-white/5">
      {/* Tab bar */}
      <div className="flex items-center border-b border-white/5 px-1 pt-1">
        {installTabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-mono font-semibold rounded-t transition-colors ${
              active === i
                ? `${tab.color} border-b-2 border-current -mb-px bg-gray-800/60`
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Command line */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 font-mono text-sm min-w-0">
          <span className="text-slate-600 shrink-0">$</span>
          <span className={`${installTabs[active].color} truncate`}>
            {installTabs[active].cmd}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors shrink-0 ml-3"
          aria-label="Copy command"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export const SDK = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
      <SEO
        title="Developer SDK"
        description="Integrate KaleidoSwap into your application. Rust, Python, and TypeScript SDKs with full documentation and examples."
        url="/products/sdk"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-green-500/20 rounded-full blur-[120px] -z-10 opacity-40" />
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-primary-500/15 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text & CTAs */}
            <div className="min-w-0">
              <AnimateIn variant="fade-down" duration={500}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-6 w-fit">
                  <Code className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                    {t('Developer Tools')}
                  </span>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <div className="space-y-4 mb-8">
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    {t('Build on KaleidoSwap')}
                  </h1>
                  <p className="text-xl text-slate-400 leading-relaxed">
                    {t('Integrate atomic swaps into your wallet, exchange, or application. TypeScript and Python SDKs auto-generated from the OpenAPI spec.')}
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={250}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button
                    size="lg"
                    onClick={() => window.open(DOCS.sdk, '_blank')}
                    className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    {t('Read the Docs')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    disabled
                    className="border-slate-700 text-slate-500 cursor-not-allowed flex items-center gap-2"
                  >
                    {t('Soon on GitHub')}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </AnimateIn>

              {/* Install commands */}
              <AnimateIn variant="fade-up" delay={350}>
                <InstallTabs />
              </AnimateIn>
            </div>

            {/* Right — live code preview */}
            <AnimateIn variant="scale" delay={200} duration={800} className="hidden lg:block min-w-0">
              <div className="relative group min-w-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 to-primary-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-950/80 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">swap.ts</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
                      TypeScript
                    </span>
                  </div>
                  {/* Syntax-highlighted snippet */}
                  <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto whitespace-nowrap">
                    <div>
                      <span className="text-purple-400">import</span>
                      <span className="text-slate-300"> {'{ KaleidoClient }'} </span>
                      <span className="text-purple-400">from</span>
                      <span className="text-green-300"> 'kaleidoswap-sdk'</span>
                      <span className="text-slate-500">;</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-300"> client</span>
                      <span className="text-slate-300"> = KaleidoClient.</span>
                      <span className="text-yellow-300">create</span>
                      <span className="text-slate-300">{'({'}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">baseUrl</span>
                      <span className="text-slate-300">: </span>
                      <span className="text-green-300">'https://api.kaleidoswap.com'</span>
                      <span className="text-slate-500">,</span>
                    </div>
                    <div><span className="text-slate-300">{'});'}</span></div>
                    <div className="mt-4 text-slate-600">{'// get a quote'}</div>
                    <div>
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-300"> quote</span>
                      <span className="text-slate-300"> = </span>
                      <span className="text-purple-400">await</span>
                      <span className="text-slate-300"> client.maker.</span>
                      <span className="text-yellow-300">getQuote</span>
                      <span className="text-slate-300">{'({'}</span>
                    </div>
                    <div className="pl-4 space-y-0.5">
                      <div>
                        <span className="text-slate-400">from_asset</span>
                        <span className="text-slate-300">{': { '}</span>
                        <span className="text-slate-400">asset_id</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-green-300">'BTC'</span>
                        <span className="text-slate-500">, </span>
                        <span className="text-slate-400">layer</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-green-300">'BTC_LN'</span>
                        <span className="text-slate-500">, </span>
                        <span className="text-slate-400">amount</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-orange-300">100_000</span>
                        <span className="text-slate-300">{' },'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">to_asset</span>
                        <span className="text-slate-300">{': { '}</span>
                        <span className="text-slate-400">asset_id</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-green-300">'USDT'</span>
                        <span className="text-slate-500">, </span>
                        <span className="text-slate-400">layer</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-green-300">'RGB_LN'</span>
                        <span className="text-slate-300">{' },'}</span>
                      </div>
                    </div>
                    <div><span className="text-slate-300">{'});'}</span></div>
                    <div className="mt-4 text-slate-600">{'// execute the swap'}</div>
                    <div>
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-300"> order</span>
                      <span className="text-slate-300"> = </span>
                      <span className="text-purple-400">await</span>
                      <span className="text-slate-300"> client.maker.</span>
                      <span className="text-yellow-300">createSwapOrder</span>
                      <span className="text-slate-300">{'({ rfq_id: quote.rfq_id });'}</span>
                    </div>
                    <div className="mt-4 text-slate-600">{'// wait for completion'}</div>
                    <div>
                      <span className="text-purple-400">await</span>
                      <span className="text-slate-300"> client.maker.</span>
                      <span className="text-yellow-300">waitForSwapCompletion</span>
                      <span className="text-slate-300">(order.id);</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      <span className="text-slate-600">{'>'}</span>
                      <span className="w-2 h-[1.1em] bg-green-400/70 animate-pulse ml-1 inline-block" />
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

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
                className={`grid md:grid-cols-2 gap-8 items-start min-w-0 ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={`min-w-0 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <h3 className="text-2xl font-bold mb-3">{t(useCase.title)}</h3>
                  <p className="text-slate-400 mb-4">{t(useCase.description)}</p>
                  <a
                    href={DOCS.sdk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    {t('View full example')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className={`min-w-0 overflow-hidden ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
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
          <div className="glass-card rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center min-w-0">
              <div className="min-w-0">
                <h2 className="text-3xl font-bold mb-4">{t('API Reference')}</h2>
                <p className="text-slate-400 mb-6">
                  {t('Complete API documentation with typed models auto-generated from OpenAPI specs for TypeScript and Python.')}
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
                  onClick={() => window.open(DOCS.apiReference, '_blank')}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {t('Explore API Docs')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto min-w-0 max-w-full">
                <div className="text-slate-500 mb-2">// {t('GetQuoteResponse')}</div>
                <div className="text-purple-400 whitespace-nowrap">interface<span className="text-green-400"> GetQuoteResponse </span><span className="text-white">{'{'}</span></div>
                <div className="pl-4 text-slate-400 space-y-0.5">
                  <div className="whitespace-nowrap">rfq_id<span className="text-slate-500">:</span>      <span className="text-yellow-400">string</span></div>
                  <div className="whitespace-nowrap">from_asset<span className="text-slate-500">:</span>  <span className="text-yellow-400">SwapLeg</span>  <span className="text-slate-600 hidden sm:inline">{'// { asset_id, ticker, layer, amount }'}</span></div>
                  <div className="whitespace-nowrap">to_asset<span className="text-slate-500">:</span>    <span className="text-yellow-400">SwapLeg</span>  <span className="text-slate-600 hidden sm:inline">{'// { asset_id, ticker, layer, amount }'}</span></div>
                  <div className="whitespace-nowrap">price<span className="text-slate-500">:</span>       <span className="text-yellow-400">number</span></div>
                  <div className="whitespace-nowrap">fee<span className="text-slate-500">:</span>         <span className="text-yellow-400">SwapFee</span>  <span className="text-slate-600 hidden sm:inline">{'// { final_fee, fee_asset }'}</span></div>
                  <div className="whitespace-nowrap">expires_at<span className="text-slate-500">:</span>  <span className="text-yellow-400">number</span></div>
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
