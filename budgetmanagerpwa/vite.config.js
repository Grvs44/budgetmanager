import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
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
