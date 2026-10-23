import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  // imagetools convierte las imágenes importadas con ?w=…&format=webp (ver projects.jsx y hero.jsx)
  plugins: [react(), tailwindcss(), imagetools()],
  server: {
    port: 3000,
  },
  build: {
    // Same output folder as Create React App, so the gh-pages publish flow does not change
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
