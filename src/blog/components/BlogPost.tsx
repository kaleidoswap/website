import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, Clock } from 'lucide-react'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { SEO } from '@/components/common/SEO'
import { footerConfig } from '@/constants/footer'
import { getPostBySlug } from '../lib/posts'
import { TableOfContents } from './TableOfContents'

export function BlogPost() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        keywords={post.tags}
        type="article"
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

      {/* Wide container to accommodate TOC sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">

        {/* Back link */}
        <nav className="mb-12">
          <Link
            to="/blog"
            className="group/link inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0 group-hover/link:text-primary-400 transition-colors" />
            <span className="border-b border-slate-700 group-hover/link:border-primary-500 pb-0.5 transition-colors">
              {t('Back to Blog')}
            </span>
          </Link>
        </nav>

        <div className="flex gap-12 items-start">

          {/* ── TOC sidebar ── */}
          <aside className="hidden xl:block w-52 shrink-0 sticky top-28 self-start">
            <TableOfContents content={post.content} />
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0 max-w-3xl mx-auto">

            {/* Hero: cover image with title overlay */}
            <header className="relative w-full rounded-2xl overflow-hidden mb-10">
              {post.coverImage ? (
                <>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full object-cover h-72 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 via-[55%] to-transparent" />
                </>
              ) : (
                <div className="w-full h-48 bg-gray-900/80" />
              )}

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-500/20 text-primary-300 border border-primary-400/40 rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
                  {post.title}
                </h1>

                {/* Author · date · reading time */}
                <div className="flex items-center gap-3 text-sm text-gray-300 drop-shadow flex-wrap">
                  <span>{post.author}</span>
                  <span className="text-gray-500">·</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-gray-500">·</span>
                  <span className="inline-flex items-center gap-1 text-gray-300">
                    <Clock className="w-3.5 h-3.5" />
                    {t('{{count}} min read', { count: post.readingTime })}
                  </span>
                </div>
              </div>
            </header>

            <article
              className="prose prose-invert prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </main>
        </div>
      </div>

      <Footer {...footerConfig} />
    </div>
  )
}
