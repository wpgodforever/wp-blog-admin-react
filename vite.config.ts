import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 路径别名配置
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // 将根目录下的sw.js打包到dist目录下
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sw: path.resolve(__dirname, 'sw.js'),
      },
    },
  }
})
