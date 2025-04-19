# CR Component Library

一个基于 Vue 3 + TypeScript 的现代化组件库。

## 安装

```bash
# 使用npm
npm install yingqiu-cream-ui -S

# 使用pnpm 
pnpm add yingqiu-cream-ui

# 使用yarn
yarn add yingqiu-cream-ui
```

## 使用
### 运行以下命令打开使用说明文档
pnpm run docs:dev

![image](https://github.com/user-attachments/assets/f3ca560b-d506-43d8-b71d-dbf5b25b1a5d)

### 全局引入

```js
import { createApp } from 'vue'
import CreamUI from 'yingqiu-cream-ui'
import 'yingqiu-cream-ui/css'
import App from './App.vue'

const app = createApp(App)
app.use(CreamUI)
app.mount('#app')
```

### 按需引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import { crButton, crMessage } from 'cr-component-lib'
import 'cr-component-lib/dist/cr-component-lib.css'

const app = createApp(App)
app.component('CrButton', Button)
app.mount('#app')

// 在组件中使用Message
import { crMessage } from 'cr-component-lib'

// 调用方式
  crMessage({ message: '操作成功' ,type:"success"})
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
pnpm install yingqiu-cream-ui

# 开发模式
pnpm run dev

# 构建
pnpm run build
```



