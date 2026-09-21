import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: '../editor/public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../editor', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    chunkSizeWarningLimit: 9000,
  },
  optimizeDeps: {
    exclude: ['web-ifc'],
  },
})
