import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    copy({
      targets: [
        // 将根目录下的sw.ts复制到dist目录下
        { src: 'sw.ts', dest: 'dist' },
        
      ],
      hook: 'closeBundle',
    })
  ],
  resolve: {
    alias: {
      // 路径别名配置
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // 将根目录下的sw.ts打包到dist目录下,而不是assets目录下
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sw: path.resolve(__dirname, 'sw.ts'),
      },
    },
  }
})
