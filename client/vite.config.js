import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Forward /api calls to our Express backend during development
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})