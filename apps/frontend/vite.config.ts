import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [react()],
  server: {
    port: 4173,
    // hmr: {
    //   host: "localhost",
    //   protocol: "ws",
    // },
  },
  preview: {
    host: true,
    port: 4173
  },
  build: {
    chunkSizeWarningLimit: 1500,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf('node_modules') !== -1) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      }
    },
  },
})
