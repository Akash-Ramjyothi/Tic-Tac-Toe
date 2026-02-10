import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      fastRefresh: true,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },

  server: {
    port: 3000,
    open: true,
    strictPort: true,
    cors: true,
  },

  preview: {
    port: 5000,
  },

  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },

  define: {
    __APP_ENV__: JSON.stringify(mode),
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}))
