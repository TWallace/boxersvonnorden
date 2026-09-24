import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run build`       -> writes the finished site into ../beta   (what visitors see at /beta/)
// `npm run build:live`  -> writes the finished site into the repo root (go-live; see HOW-TO-EDIT.md)
export default defineConfig(({ mode }) => {
  const live = mode === 'live'
  return {
    plugins: [
      react(),
      {
        // While the site is in /beta/, ask search engines not to index it.
        name: 'beta-noindex',
        transformIndexHtml: (html) =>
          live ? html : html.replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n  </head>'),
      },
    ],
    base: './', // relative paths so the site works from /beta/ and from the root
    build: {
      outDir: live ? '..' : '../beta',
      // Never wipe the repo root; only the beta folder may be emptied.
      emptyOutDir: !live,
    },
  }
})
