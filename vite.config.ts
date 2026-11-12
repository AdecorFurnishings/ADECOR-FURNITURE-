import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom') || id.includes('react-router') || id.includes(`${'/'}react${'/'}`) || id.includes('\\react\\')) {
            return 'react-vendor';
          }
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          if (id.includes('gsap') || id.includes('lenis')) {
            return 'scroll-fx';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          return undefined;
        },
      },
    },
  },
});
