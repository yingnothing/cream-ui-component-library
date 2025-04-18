---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Cream UI"
  text: "现代、高效的Vue3组件库"
  tagline: 为开发者打造的优雅UI解决方案

  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started
    - theme: alt
      text: 查看组件
      link: /button
    - theme: alt
      text: GitHub
      link: https://github.com/yourusername/cream-ui

features:
  - icon: 🛠️
    title: 易于使用
    details: 简洁直观的API设计，帮助开发者快速上手并高效工作
  - icon: ⚡️
    title: 高性能
    details: 基于Vue3和最新的Web技术，确保应用的高性能和流畅体验
  - icon: 📦
    title: 按需引入
    details: 支持按需引入组件，减小应用体积，提升加载速度
  - icon: 🔍
    title: 详尽文档
    details: 提供全面且详细的文档和示例，让每一个组件都易于理解和使用
  - icon: 💡
    title: TypeScript支持
    details: 完全使用TypeScript编写，提供完整的类型定义，增强开发体验
---

<!-- 自定义内容部分 -->
<div class="vp-doc" style="padding: 0 24px;">


## 安装使用

```bash
# 使用npm
npm install cream-ui -S

# 使用pnpm 
pnpm add cream-ui

# 使用yarn
yarn add cream-ui
```

## 快速开始

```js
import { createApp } from 'vue'
import CreamUI from 'cream-ui'
import 'cream-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(CreamUI)
app.mount('#app')
```

</div>

