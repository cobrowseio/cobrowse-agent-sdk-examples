import { defineConfig } from 'vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '',
  build: { target: browserslistToEsbuild() },
  plugins: [react(), tailwindcss(), viteTsconfigPaths()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    port: 3000
  }
})
