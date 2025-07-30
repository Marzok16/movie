// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/movie-app/', // This MUST match your GitHub repo name exactly
  plugins: [react()],
});
