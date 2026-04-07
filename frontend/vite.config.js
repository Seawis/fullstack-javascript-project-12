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
        target: 'http://localhost:6001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:6001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
