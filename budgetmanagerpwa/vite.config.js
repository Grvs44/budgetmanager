import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  base: '',
  server: {
    open: '/budgetmanager/',
    port: 3000,
  },
})
