import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules\/(react|react-dom|react-router|scheduler)/ },
            { name: 'vendor-motion', test: /node_modules\/(framer-motion|motion)/ },
            { name: 'vendor-prism', test: /node_modules\/prism-react-renderer/ },
          ],
        },
      },
    },
  },
})
