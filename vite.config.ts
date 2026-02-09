import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Handle SPA routing - redirect all routes to index.html
    historyApiFallback: true,
  },
  // Ensure the app handles client-side routing for /reset-password
  appType: 'spa',
});