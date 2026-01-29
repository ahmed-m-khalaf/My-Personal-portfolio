import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lenis')) {
              return 'vendor-lenis';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            // All other dependencies
            return 'vendor';
          }
        }
      }
    },
    // Minification
    minify: 'esbuild',
    // Target modern browsers for smaller bundle
    target: 'esnext',
    // CSS code splitting
    cssCodeSplit: true,
    // Warn if chunks are too large
    chunkSizeWarningLimit: 500,
    // Source maps off for production (smaller files)
    sourcemap: false
  },

  // Server options
  server: {
    // Enable compression
    headers: {
      'Cache-Control': 'max-age=31536000'
    }
  }
})
