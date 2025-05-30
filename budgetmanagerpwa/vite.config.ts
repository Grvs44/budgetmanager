import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths(),
    VitePWA({
      injectRegister: 'inline',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      manifest: false,
    }),
    createHtmlPlugin({ minify: true }),
  ],
  base: '/budgetmanager/',
  server: {
    open: '/budgetmanager/',
    port: 3000,
    proxy: {
      '/budgetmanager/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    manifest: true,
    outDir: 'build',
    assetsDir: 'static',
  },
})
