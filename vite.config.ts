import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import type { Connect } from 'vite'
import type { ServerResponse } from 'http'

const AUDIO_PREFIX = '/blog/audio/'
const AUDIO_DIR = path.resolve(__dirname, './blog-audio')

// In production the Worker streams these from R2 (see worker/index.ts). They
// are gitignored and absent from the asset bundle, so the dev server serves
// them off disk instead — same URLs, same Range semantics, so seeking behaves
// the same locally as it does deployed.
function blogAudioDevServer() {
  return {
    name: 'blog-audio-dev-server',
    configureServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use((req, res: ServerResponse, next: Connect.NextFunction) => {
        const url = (req.url ?? '').split('?')[0]
        if (!url.startsWith(AUDIO_PREFIX)) return next()

        const name = decodeURIComponent(url.slice(AUDIO_PREFIX.length))
        if (!name || name.includes('/') || !name.endsWith('.mp3')) return next()

        const file = path.join(AUDIO_DIR, name)
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.end(
            `Not found: ${name}\n\nBlog audio lives in R2 and is gitignored. ` +
              `Run \`npm run blog:audio:pull\` to fetch it, or \`npm run blog:audio <slug>\` to generate it.\n`
          )
          return
        }

        const { size } = fs.statSync(file)
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '')
        res.setHeader('content-type', 'audio/mpeg')
        res.setHeader('accept-ranges', 'bytes')

        if (range) {
          const start = range[1] ? Number(range[1]) : 0
          const end = range[2] ? Number(range[2]) : size - 1
          if (start >= size || end >= size || start > end) {
            res.statusCode = 416
            res.setHeader('content-range', `bytes */${size}`)
            res.end()
            return
          }
          res.statusCode = 206
          res.setHeader('content-range', `bytes ${start}-${end}/${size}`)
          res.setHeader('content-length', String(end - start + 1))
          fs.createReadStream(file, { start, end }).pipe(res)
          return
        }

        res.statusCode = 200
        res.setHeader('content-length', String(size))
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), blogAudioDevServer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    watch: {
      usePolling: true,
    },
  },
})
