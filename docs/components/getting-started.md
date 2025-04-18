---
title: 快速上手 | Cream UI
description: Cream UI组件库的快速上手指南
---

# 快速上手

本节将介绍如何在项目中使用 Cream UI 组件库。

## 安装

### npm 安装


```bash
npm install yingqiu-cream-ui -S
```

### 使用 pnpm

```bash
 pnpm add yingqiu-cream-ui
```

### 使用 yarn

```bash
yarn add yingqiu-cream-ui
```

## 完整引入

在 main.js 中写入以下内容：

```js
import { createApp } from 'vue'
import CreamUI from 'yingqiu-cream-ui'
import 'yingqiu-cream-ui/css';
import App from './App.vue'

const app = createApp(App)

app.use(CreamUI)
app.mount('#app')
```

## 按需引入

如果你只希望引入部分组件，比如 Button，那么需要在 main.js 中写入以下内容：

```js
import { createApp } from 'vue'
import { crButton, crTooltip, crMessage, crCollapse,crCollapseItem,crIcon } from 'cream-ui'
import 'cream-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(crButton)
app.use(crTooltip)
app.use(crMessage)
app.use(crCollapse)
app.use(crCollapseItem)
app.use(crIcon)
// ...
app.mount('#app')
```

## 开始使用

现在你可以开始使用 Cream UI 组件库了：

```vue
<template>
  <div>
    <c-button type="primary">主要按钮</c-button>
    <c-button type="success">成功按钮</c-button>
    <c-button type="warning">警告按钮</c-button>
    <c-button type="danger">危险按钮</c-button>
  </div>
</template>
```

## 组件列表

- [Button 按钮](/button)
- [Collapse 折叠面板](/collapse)
- [Tooltip 文字提示](/tooltip)
- [Message 消息](/message)

## 浏览器兼容性

Cream UI 支持现代浏览器和 Internet Explorer 11+。

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari |
| :----------------------------------------------------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|                          最新 2 个版本                           |                               最新 2 个版本                               |                         最新 2 个版本                          |                         最新 2 个版本                          | 