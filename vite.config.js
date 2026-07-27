import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
var AUDIO_PREFIX = '/blog/audio/';
var AUDIO_DIR = path.resolve(__dirname, './blog-audio');
// In production the Worker streams these from R2 (see worker/index.ts). They
// are gitignored and absent from the asset bundle, so the dev server serves
// them off disk instead — same URLs, same Range semantics, so seeking behaves
// the same locally as it does deployed.
function blogAudioDevServer() {
    return {
        name: 'blog-audio-dev-server',
        configureServer: function (server) {
            server.middlewares.use(function (req, res, next) {
                var _a, _b;
                var url = ((_a = req.url) !== null && _a !== void 0 ? _a : '').split('?')[0];
                if (!url.startsWith(AUDIO_PREFIX))
                    return next();
                var name = decodeURIComponent(url.slice(AUDIO_PREFIX.length));
                if (!name || name.includes('/') || !name.endsWith('.mp3'))
                    return next();
                var file = path.join(AUDIO_DIR, name);
                if (!fs.existsSync(file)) {
                    res.statusCode = 404;
                    res.end("Not found: ".concat(name, "\n\nBlog audio lives in R2 and is gitignored. ") +
                        "Run `npm run blog:audio:pull` to fetch it, or `npm run blog:audio <slug>` to generate it.\n");
                    return;
                }
                var size = fs.statSync(file).size;
                var range = /^bytes=(\d*)-(\d*)$/.exec((_b = req.headers.range) !== null && _b !== void 0 ? _b : '');
                res.setHeader('content-type', 'audio/mpeg');
                res.setHeader('accept-ranges', 'bytes');
                if (range) {
                    var start = range[1] ? Number(range[1]) : 0;
                    var end = range[2] ? Number(range[2]) : size - 1;
                    if (start >= size || end >= size || start > end) {
                        res.statusCode = 416;
                        res.setHeader('content-range', "bytes */".concat(size));
                        res.end();
                        return;
                    }
                    res.statusCode = 206;
                    res.setHeader('content-range', "bytes ".concat(start, "-").concat(end, "/").concat(size));
                    res.setHeader('content-length', String(end - start + 1));
                    fs.createReadStream(file, { start: start, end: end }).pipe(res);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('content-length', String(size));
                fs.createReadStream(file).pipe(res);
            });
        },
    };
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
});
