import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('\\node_modules\\react\\') || id.includes('\\node_modules\\react-dom\\')) {
              return 'vendor-react';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
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
    // Removed aggressive Cache-Control which was breaking HMR and causing 504 errors
    port: 5173,
    strictPort: true,
  },

  // Optimize dependencies for faster dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lenis', 'react-router-dom', 'react-helmet-async']
  }
})

