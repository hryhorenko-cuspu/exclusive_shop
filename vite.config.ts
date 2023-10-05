import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgLoader from 'vite-svg-loader'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader()],
  resolve: {
    alias: {
      // Map the 'assets' alias to the 'src/assets' directory
      assets: './src/assets',
    },
  },
})
