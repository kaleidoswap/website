import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { SEO } from '@/components/common/SEO'
import { footerConfig } from '@/constants/footer'
import { getAllPosts } from '../lib/posts'
import { BlogCard } from './BlogCard'

export function BlogList() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title="Blog"
        description="Insights, tutorials, and updates from the KaleidoSwap team. Learn about RGB protocol, Lightning Network swaps, and the KaleidoSDK."
        url="/blog"
        keywords={['blog', 'RGB', 'Lightning', 'Bitcoin', 'DEX', 'SDK', 'KaleidoSwap']}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(75% 75% at 80% 10%, rgba(14,157,255,0.08) 0%, transparent 100%), radial-gradient(75% 75% at 20% 90%, rgba(138,92,246,0.08) 0%, transparent 100%)',
        }}
      />

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Blog</h1>
          <p className="text-gray-400 text-lg">
            Insights, tutorials, and updates from the KaleidoSwap team.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <p className="text-gray-400">No posts yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer {...footerConfig} />
    </div>
  )
}
