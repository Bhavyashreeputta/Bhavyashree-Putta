import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file preview build (hash routing, everything inlined) — used only for the hosted preview.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: { 'import.meta.env.VITE_HASH_ROUTER': '"1"' },
  build: { outDir: 'dist-preview', assetsInlineLimit: 100000000, cssCodeSplit: false },
})
