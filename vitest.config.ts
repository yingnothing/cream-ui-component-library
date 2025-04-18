// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue' // 关键插件

export default defineConfig({
  plugins: [vue()], // 启用 Vue 插件
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname, 
    },
  },
  
})
