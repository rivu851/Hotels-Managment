import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ← needed for resolving paths

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/Voyeger-hotel",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ← makes @ point to /src
    },
  },
});
