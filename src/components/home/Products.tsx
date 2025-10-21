// src/components/home/Products.tsx
import { ProductCard } from './ProductCard'
import type { ProductsProps } from '@/types/products'
import { Reveal, Stagger, Gradient, Particles } from '@/components/animations/ReactBitsFallbacks'

export const Products = ({
  title = 'Our Product Suite',
  description = 'Explore our growing ecosystem of Bitcoin-native DeFi products',
  products
}: ProductsProps) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gray-950/50">
      {/* Animated Particle Background */}
      <Particles
        count={80}
        className="absolute inset-0"
        particleColor="rgba(247, 147, 26, 0.4)"
        speed={0.8}
      />

      {/* Dynamic Gradient Background */}
      <Gradient
        colors={['#10B981', '#0e9dff', '#8a5cf6']}
        className="absolute inset-0 opacity-5"
        speed={2}
      />

      <div className="container relative px-4 z-10">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </Reveal>

        <Stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                index={index}
              />
            ))}
          </div>
        </Stagger>

        {/* Bottom Section - Why Choose KaleidoSwap */}
        <Reveal delay={800}>
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-gray-400 leading-relaxed">
              All our products are built on the same foundation:{' '}
              <span className="text-bitcoin-400 font-semibold">Bitcoin's security</span>,{' '}
              <span className="text-primary-400 font-semibold">Lightning Network's speed</span>, and{' '}
              <span className="text-secondary-400 font-semibold">RGB Protocol's programmability</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
