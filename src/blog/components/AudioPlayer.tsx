import { useRef, useState, useEffect, useCallback, type ChangeEvent } from 'react'
import {
  Play,
  Pause,
  Headphones,
  Loader2,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  AlertCircle,
} from 'lucide-react'

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2]
const SKIP_BACK = 15
const SKIP_FORWARD = 30
const RATE_KEY = 'kaleidoswap_blog_audio_rate'

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function storedRate(): number {
  try {
    const v = Number(localStorage.getItem(RATE_KEY))
    return SPEEDS.includes(v) ? v : 1
  } catch {
    return 1
  }
}

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [rate, setRate] = useState(storedRate)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => {
      a.currentTime = 0
      setCurrent(0)
    }
    const onProgress = () => {
      if (a.buffered.length) setBuffered(a.buffered.end(a.buffered.length - 1))
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onWaiting = () => setLoading(true)
    const onPlaying = () => setLoading(false)
    const onCanPlay = () => setLoading(false)
    const onError = () => {
      setFailed(true)
      setLoading(false)
      setPlaying(false)
    }
    const onRate = () => setRate(a.playbackRate)
    const onVolume = () => setMuted(a.muted)

    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('durationchange', onMeta)
    a.addEventListener('ended', onEnd)
    a.addEventListener('progress', onProgress)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('waiting', onWaiting)
    a.addEventListener('playing', onPlaying)
    a.addEventListener('canplay', onCanPlay)
    a.addEventListener('error', onError)
    a.addEventListener('ratechange', onRate)
    a.addEventListener('volumechange', onVolume)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('durationchange', onMeta)
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('progress', onProgress)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('waiting', onWaiting)
      a.removeEventListener('playing', onPlaying)
      a.removeEventListener('canplay', onCanPlay)
      a.removeEventListener('error', onError)
      a.removeEventListener('ratechange', onRate)
      a.removeEventListener('volumechange', onVolume)
    }
  }, [])

  useEffect(() => {
    const a = audioRef.current
    if (a) a.playbackRate = rate
  }, [rate])

  const toggle = useCallback(async () => {
    const a = audioRef.current
    if (!a || failed) return
    if (a.paused) {
      try {
        setLoading(true)
        await a.play()
      } catch {
        setLoading(false)
      }
    } else {
      a.pause()
    }
  }, [failed])

  const skip = useCallback((delta: number) => {
    const a = audioRef.current
    if (!a) return
    const max = isFinite(a.duration) ? a.duration : Infinity
    const t = Math.min(Math.max(a.currentTime + delta, 0), max)
    a.currentTime = t
    setCurrent(t)
  }, [])

  const cycleRate = useCallback(() => {
    setRate((r) => {
      const next = SPEEDS[(SPEEDS.indexOf(r) + 1) % SPEEDS.length]
      try {
        localStorage.setItem(RATE_KEY, String(next))
      } catch {
        /* storage unavailable — speed still applies for this session */
      }
      return next
    })
  }, [])

  const toggleMute = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.muted = !a.muted
    setMuted(a.muted)
  }, [])

  const seek = (e: ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current
    if (!a) return
    const t = Number(e.target.value)
    a.currentTime = t
    setCurrent(t)
  }

  const seekable = duration > 0 && isFinite(duration)
  const pct = seekable ? (current / duration) * 100 : 0
  const buffPct = seekable ? Math.min((buffered / duration) * 100, 100) : 0
  const remaining = seekable ? (duration - current) / rate : 0

  const iconBtn =
    'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="mb-2 flex items-center gap-1.5">
        <Headphones className="h-3.5 w-3.5 shrink-0 text-primary-400" />
        <span className="text-xs font-medium text-gray-300">Listen to this article</span>
        {failed ? (
          <span className="ml-auto flex items-center gap-1 text-[11px] text-amber-400">
            <AlertCircle className="h-3 w-3" />
            Audio unavailable
          </span>
        ) : (
          <div className="ml-auto flex items-center gap-1">
            {seekable && (
              <span className="mr-1 hidden tabular-nums text-[11px] text-gray-500 sm:inline">
                {fmt(remaining)} left
              </span>
            )}
            <button
              onClick={cycleRate}
              aria-label={`Playback speed: ${rate}×. Click to change.`}
              className="flex h-6 min-w-[2.25rem] items-center justify-center rounded-md px-1.5 text-[11px] font-semibold tabular-nums text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {rate}×
            </button>
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute narration' : 'Mute narration'}
              className="flex h-6 w-6 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => skip(-SKIP_BACK)}
          disabled={failed}
          aria-label={`Rewind ${SKIP_BACK} seconds`}
          title={`Rewind ${SKIP_BACK}s`}
          className={iconBtn}
        >
          <RotateCcw className="h-4 w-4" />
          <span className="absolute text-[7px] font-bold leading-none tabular-nums">
            {SKIP_BACK}
          </span>
        </button>

        <button
          onClick={toggle}
          disabled={failed}
          aria-label={playing ? 'Pause narration' : 'Play narration'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" />
          )}
        </button>

        <button
          onClick={() => skip(SKIP_FORWARD)}
          disabled={failed}
          aria-label={`Skip forward ${SKIP_FORWARD} seconds`}
          title={`Forward ${SKIP_FORWARD}s`}
          className={iconBtn}
        >
          <RotateCw className="h-4 w-4" />
          <span className="absolute text-[7px] font-bold leading-none tabular-nums">
            {SKIP_FORWARD}
          </span>
        </button>

        <input
          type="range"
          min={0}
          max={seekable ? duration : 1}
          step={0.1}
          value={current}
          onChange={seek}
          disabled={!seekable || failed}
          aria-label="Seek narration"
          aria-valuetext={`${fmt(current)} of ${fmt(duration)}`}
          className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full accent-primary-500 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, #22c55e ${pct}%, rgba(255,255,255,0.28) ${pct}%, rgba(255,255,255,0.28) ${buffPct}%, rgba(255,255,255,0.12) ${buffPct}%)`,
          }}
        />

        <span className="shrink-0 tabular-nums text-[11px] text-gray-400">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>
    </div>
  )
}
