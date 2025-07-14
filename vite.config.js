// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   server: {
//     historyApiFallback: true,
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    historyApiFallback: true, // This handles the refresh issue
  },

   preview: {
    historyApiFallback: true, // This handles the refresh issue in preview mode
  },
  // For production build
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})