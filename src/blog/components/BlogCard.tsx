import { Link } from 'react-router-dom'
import type { PostMeta } from '../lib/types'
import { tagColor } from '../lib/tagColors'

interface BlogCardProps {
  post: PostMeta
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300">
        {(post.coverImageCard ?? post.coverImage) && (
          <img
            src={post.coverImageCard ?? post.coverImage}
            alt={post.title}
            className="w-full h-32 object-cover"
          />
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`${tagColor(tag)} border rounded-full px-2.5 py-0.5 text-xs font-medium`}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-primary-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}
