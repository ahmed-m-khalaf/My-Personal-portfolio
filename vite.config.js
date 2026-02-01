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
    // Minification with better compression
    minify: 'esbuild',
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // CSS code splitting
    cssCodeSplit: true,
    // CSS minification
    cssMinify: 'esbuild',
    // Warn if chunks are too large
    chunkSizeWarningLimit: 500,
    // Source maps off for production (smaller files)
    sourcemap: false,
    // Optimize for modern browsers
    modulePreload: {
      polyfill: false  // Skip polyfill for modern browsers
    },
    // Reduce asset inlining threshold for better caching
    assetsInlineLimit: 4096
  },

  // Development server options
  server: {
    headers: {
      'Cache-Control': 'max-age=31536000'
    }
  },

  // Optimize dependencies for faster dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lenis']
  }
})

