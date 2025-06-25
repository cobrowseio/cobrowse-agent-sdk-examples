import { defineConfig } from 'vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '',
  build: { target: browserslistToEsbuild(), outDir: 'build' },
  plugins: [react()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    port: 3000,
  },
})
