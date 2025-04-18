# CR Component Library

一个基于 Vue 3 + TypeScript 的现代化组件库。

## 安装

```bash
# 使用npm
npm install cream-ui -S

# 使用pnpm 
pnpm add cream-ui

# 使用yarn
yarn add cream-ui
```

## 使用
pnpm run docs:dev
打开使用说明文档
### 全局引入

```js
import { createApp } from 'vue'
import CreamUI from 'cream-ui'
import 'cream-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(CreamUI)
app.mount('#app')
```

### 按需引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Message } from 'cr-component-lib'
import 'cr-component-lib/dist/cr-component-lib.css'

const app = createApp(App)
app.component('CrButton', Button)
app.mount('#app')

// 在组件中使用Message
import { CrMessage } from 'cr-component-lib'

// 调用方式
CrMessage.success('操作成功')
```

## 组件列表

- Button 按钮
- Collapse 折叠面板
- Icon 图标
- Message 消息提示
- Tooltip 文字提示

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```



