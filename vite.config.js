import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      // ...
    },
    babel: {
      async: true, // add this line
    },
  },
  
})
