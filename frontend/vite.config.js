import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://0.0.0.0:6001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://0.0.0.0:6001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },

  define: {
    // Mock process.env.NODE_ENV (common use case)
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Mock specific variables (e.g., API_URL)
    'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000'),
    // For the full process object (use sparingly—adds bundle size)
    'process': JSON.stringify({
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        API_URL: process.env.API_URL || 'http://localhost:6001',
      },
    }),
  },

})
