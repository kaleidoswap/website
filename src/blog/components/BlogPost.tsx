import { useParams, Link, Navigate } from 'react-router-dom'
import { tagColor } from '../lib/tagColors'
import { ChevronLeft, ChevronDown, Clock } from 'lucide-react'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { SEO } from '@/components/common/SEO'
import { footerConfig } from '@/constants/footer'
import { getPostBySlug } from '../lib/posts'
import { TableOfContents } from './TableOfContents'
import { AudioPlayer } from './AudioPlayer'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="min-h-screen bg-transparent text-white font-display">
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        image={post.coverImagePreview ?? post.coverImage}
        datePublished={post.date}
        author={post.author}
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
              Back to Blog
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

            {/* Hero: cover image above title */}
            <header className="mb-10">
              {post.coverImage && (
                <div className="w-full rounded-2xl overflow-hidden mb-6">
                  <picture>
                    {post.coverImageMobile && (
                      <source media="(max-width: 639px)" srcSet={post.coverImageMobile} />
                    )}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-auto block"
                    />
                  </picture>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${tagColor(tag)} border rounded-full px-2.5 py-0.5 text-xs font-medium`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                {post.title}
              </h1>

              {/* Date · reading time */}
              <div className="flex items-center gap-3 text-sm text-gray-400 flex-wrap">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="text-gray-600">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} min read
                </span>
              </div>

              {/* Narration player — only when audio has been generated for this post */}
              {post.audioSrc && <AudioPlayer src={post.audioSrc} />}

              {/* Mobile TOC — hidden on xl (where sidebar takes over) */}
              <div className="xl:hidden mt-6 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden hover:text-white transition-colors">
                    Contents
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-4 pb-4">
                    <TableOfContents content={post.content} hideTitle />
                  </div>
                </details>
              </div>
            </header>

            <article
              className="prose prose-invert mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </main>
        </div>
      </div>

      <Footer {...footerConfig} />
    </div>
  )
}
