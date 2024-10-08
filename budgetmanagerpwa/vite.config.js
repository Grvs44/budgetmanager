import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'

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
  test: {
    globals: true,
    environment: 'jsdom',
  },
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
