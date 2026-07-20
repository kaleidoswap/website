import { describe, it, expect } from 'vitest'
import { parseReleaseNotes, tokenizeInline } from './releaseNotes'

describe('parseReleaseNotes', () => {
  it('parses headings, bullets, notes and paragraphs', () => {
    const body = [
      'Intro paragraph with **bold**.',
      '',
      '> ⚠️ **Experimental.** Use with care.',
      '',
      '## 🤖 Features',
      '- **Private chat** with your wallet',
      '* Second bullet',
      '',
      '---',
      '',
      '**Platforms:** macOS, Windows, Linux.'
    ].join('\n')

    expect(parseReleaseNotes(body)).toEqual([
      { type: 'paragraph', text: 'Intro paragraph with **bold**.' },
      { type: 'note', text: '⚠️ **Experimental.** Use with care.' },
      { type: 'heading', text: '🤖 Features' },
      { type: 'bullet', text: '**Private chat** with your wallet' },
      { type: 'bullet', text: 'Second bullet' },
      { type: 'paragraph', text: '**Platforms:** macOS, Windows, Linux.' }
    ])
  })

  it('skips horizontal rules and blank lines', () => {
    expect(parseReleaseNotes('---\n\n----\n')).toEqual([])
  })

  it('handles windows line endings', () => {
    expect(parseReleaseNotes('## A\r\n- b\r\n')).toEqual([
      { type: 'heading', text: 'A' },
      { type: 'bullet', text: 'b' }
    ])
  })
})

describe('tokenizeInline', () => {
  it('tokenizes bold, code and links', () => {
    expect(
      tokenizeInline('See **bold**, `code` and [docs](https://example.com) here')
    ).toEqual([
      { type: 'text', text: 'See ' },
      { type: 'bold', text: 'bold' },
      { type: 'text', text: ', ' },
      { type: 'code', text: 'code' },
      { type: 'text', text: ' and ' },
      { type: 'link', text: 'docs', href: 'https://example.com' },
      { type: 'text', text: ' here' }
    ])
  })

  it('ignores non-http links', () => {
    expect(tokenizeInline('[x](javascript:alert(1))')).toEqual([
      { type: 'text', text: '[x](javascript:alert(1))' }
    ])
  })

  it('returns plain text unchanged', () => {
    expect(tokenizeInline('plain')).toEqual([{ type: 'text', text: 'plain' }])
  })
})
