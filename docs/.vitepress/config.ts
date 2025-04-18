import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { resolve } from 'node:path'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cream组件库",
  description: "基于Vue3的现代UI组件库",
  srcDir: 'components',
  base: '/',
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src/')
      }
    }
  },

  themeConfig: {
        // 定义右上角，固定导航
    siteTitle: 'Cream UI',
    nav: [
      { text: '指南', link: '/' },
      { text: '组件', link: '/button' },
      { text: 'GitHub', link: 'https://github.com/yourusername/cream-ui' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/' },
          { text: '快速上手', link: '/getting-started' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/button' },
          { text: 'Collapse 折叠面板', link: '/collapse' },
          { text: 'Tooltip 文字提示', link: '/tooltip' },
          { text: 'Message 消息', link: '/message' },
          { text: 'Icon 图标' }
        ]
      },

    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
