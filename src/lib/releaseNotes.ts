// src/lib/releaseNotes.ts
/**
 * Minimal markdown parser for GitHub release notes bodies.
 * Produces a typed block list rendered with React elements —
 * no raw HTML injection, so remote content stays inert.
 */

export type ReleaseNotesBlock =
  | { type: 'heading'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'note'; text: string }
  | { type: 'paragraph'; text: string }

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; href: string }

/** Splits a markdown line into inline tokens (bold, inline code, links). */
export const tokenizeInline = (text: string): InlineToken[] => {
  const tokens: InlineToken[] = []
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: text.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      tokens.push({ type: 'bold', text: match[1] })
    } else if (match[2] !== undefined) {
      tokens.push({ type: 'code', text: match[2] })
    } else {
      tokens.push({ type: 'link', text: match[3], href: match[4] })
    }
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', text: text.slice(lastIndex) })
  }

  return tokens
}

/** Parses a GitHub release body into a flat list of renderable blocks. */
export const parseReleaseNotes = (body: string): ReleaseNotesBlock[] => {
  const blocks: ReleaseNotesBlock[] = []

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || /^-{3,}$/.test(line)) continue

    const heading = line.match(/^#{1,4}\s+(.*)$/)
    if (heading) {
      blocks.push({ type: 'heading', text: heading[1].trim() })
      continue
    }

    const bullet = line.match(/^[-*]\s+(.*)$/)
    if (bullet) {
      blocks.push({ type: 'bullet', text: bullet[1].trim() })
      continue
    }

    const note = line.match(/^>\s*(.*)$/)
    if (note) {
      if (note[1]) blocks.push({ type: 'note', text: note[1].trim() })
      continue
    }

    blocks.push({ type: 'paragraph', text: line })
  }

  return blocks
}
