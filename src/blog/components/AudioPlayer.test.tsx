import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { AudioPlayer } from './AudioPlayer'

const SRC = '/blog/audio/test-post.mp3'

function audioEl(): HTMLAudioElement {
  const el = document.querySelector('audio')
  if (!el) throw new Error('audio element not rendered')
  return el as HTMLAudioElement
}

// React only flushes state from these when the dispatch happens inside act().
function emit(event: string) {
  act(() => {
    audioEl().dispatchEvent(new Event(event))
  })
}

// jsdom ships no media stack: play/pause are inert and `paused` never flips.
function stubMedia(duration = 600) {
  const paused = new WeakMap<HTMLMediaElement, boolean>()
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (
    this: HTMLMediaElement
  ) {
    paused.set(this, false)
    this.dispatchEvent(new Event('play'))
    return Promise.resolve()
  })
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
    this: HTMLMediaElement
  ) {
    paused.set(this, true)
    this.dispatchEvent(new Event('pause'))
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
    configurable: true,
    get(this: HTMLMediaElement) {
      return paused.get(this) ?? true
    },
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
    configurable: true,
    get: () => duration,
  })
}

describe('AudioPlayer', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    stubMedia()
  })

  it('renders the narration label and transport controls', () => {
    render(<AudioPlayer src={SRC} />)
    expect(screen.getByText('Listen to this article')).toBeInTheDocument()
    expect(screen.getByLabelText('Play narration')).toBeInTheDocument()
    expect(screen.getByLabelText('Rewind 15 seconds')).toBeInTheDocument()
    expect(screen.getByLabelText('Skip forward 30 seconds')).toBeInTheDocument()
    expect(screen.getByLabelText('Seek narration')).toBeInTheDocument()
  })

  it('toggles play/pause and tracks native media events', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src={SRC} />)

    await user.click(screen.getByLabelText('Play narration'))
    expect(screen.getByLabelText('Pause narration')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Pause narration'))
    expect(screen.getByLabelText('Play narration')).toBeInTheDocument()
  })

  it('follows play/pause driven externally (OS media keys)', () => {
    render(<AudioPlayer src={SRC} />)
    emit('play')
    expect(screen.getByLabelText('Pause narration')).toBeInTheDocument()

    emit('pause')
    expect(screen.getByLabelText('Play narration')).toBeInTheDocument()
  })

  it('skips forward and back, clamped to the track bounds', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src={SRC} />)
    const a = audioEl()

    await user.click(screen.getByLabelText('Skip forward 30 seconds'))
    expect(a.currentTime).toBe(30)

    await user.click(screen.getByLabelText('Rewind 15 seconds'))
    expect(a.currentTime).toBe(15)

    await user.click(screen.getByLabelText('Rewind 15 seconds'))
    await user.click(screen.getByLabelText('Rewind 15 seconds'))
    expect(a.currentTime).toBe(0)
  })

  it('cycles playback speed and applies it to the element', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src={SRC} />)

    const speed = screen.getByLabelText(/Playback speed/)
    expect(speed).toHaveTextContent('1×')

    await user.click(speed)
    expect(screen.getByLabelText(/Playback speed/)).toHaveTextContent('1.25×')
    expect(audioEl().playbackRate).toBe(1.25)
  })

  it('persists the chosen speed across mounts', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<AudioPlayer src={SRC} />)

    await user.click(screen.getByLabelText(/Playback speed/))
    expect(localStorage.getItem('kaleidoswap_blog_audio_rate')).toBe('1.25')
    unmount()

    render(<AudioPlayer src={SRC} />)
    expect(screen.getByLabelText(/Playback speed/)).toHaveTextContent('1.25×')
  })

  it('toggles mute', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src={SRC} />)

    await user.click(screen.getByLabelText('Mute narration'))
    expect(audioEl().muted).toBe(true)

    await user.click(screen.getByLabelText('Unmute narration'))
    expect(audioEl().muted).toBe(false)
  })

  it('rewinds to the start when playback ends', () => {
    render(<AudioPlayer src={SRC} />)
    const a = audioEl()
    a.currentTime = 600

    emit('ended')
    expect(a.currentTime).toBe(0)
    expect(screen.getByLabelText('Play narration')).toBeInTheDocument()
  })

  it('degrades to an unavailable state when the source fails', () => {
    render(<AudioPlayer src={SRC} />)
    emit('error')

    expect(screen.getByText('Audio unavailable')).toBeInTheDocument()
    expect(screen.getByLabelText('Play narration')).toBeDisabled()
    expect(screen.getByLabelText('Rewind 15 seconds')).toBeDisabled()
  })
})
