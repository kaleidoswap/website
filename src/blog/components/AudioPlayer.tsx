import { useRef, useState, useEffect, type ChangeEvent } from 'react'
import { Play, Pause, Headphones, Loader2 } from 'lucide-react'

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => {
      setPlaying(false)
      setCurrent(0)
    }
    const onWaiting = () => setLoading(true)
    const onPlaying = () => setLoading(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('durationchange', onMeta)
    a.addEventListener('ended', onEnd)
    a.addEventListener('waiting', onWaiting)
    a.addEventListener('playing', onPlaying)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('durationchange', onMeta)
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('waiting', onWaiting)
      a.removeEventListener('playing', onPlaying)
    }
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      try {
        setLoading(true)
        await a.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      } finally {
        setLoading(false)
      }
    }
  }

  const seek = (e: ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current
    if (!a) return
    const t = Number(e.target.value)
    a.currentTime = t
    setCurrent(t)
  }

  const pct = duration ? (current / duration) * 100 : 0

  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause narration' : 'Play narration'}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-400"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 translate-x-[1px]" />
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
          <Headphones className="h-3.5 w-3.5 text-primary-400" />
          <span>Listen to this article</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={seek}
            aria-label="Seek narration"
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full accent-primary-500"
            style={{
              background: `linear-gradient(to right, rgb(14 157 255) ${pct}%, rgba(255,255,255,0.15) ${pct}%)`,
            }}
          />
          <span className="shrink-0 tabular-nums text-[11px] text-gray-400">
            {fmt(current)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}
