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

![image](https://github.com/user-attachments/assets/5aa1e615-85fd-460e-bfc4-b5b506c41079)



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
app.component('crButton', Button)
app.mount('#app')

// 在组件中使用Message
import { crMessage } from 'cr-component-lib'

// 调用方式
  crMessage({ message: '操作成功' ,type:"success"})
```

## 组件列表

- crButton 按钮
- crCollapse 折叠面板
- Icon 图标
- crMessage 消息提示
- crTooltip 文字提示

## 开发

```bash
# 安装依赖
pnpm install yingqiu-cream-ui

# 开发模式
pnpm run dev

# 构建
pnpm run build
```

```
vue-component-lib
├─ .editorconfig
├─ .eslintignore
├─ .prettierrc.json
├─ .vitepress
├─ abc
│  ├─ es
│  │  ├─ components
│  │  │  ├─ Button
│  │  │  │  ├─ Button.vue.js
│  │  │  │  ├─ Button.vue2.js
│  │  │  │  └─ index.js
│  │  │  ├─ Collapse
│  │  │  │  ├─ Collapse.vue.js
│  │  │  │  ├─ Collapse.vue2.js
│  │  │  │  ├─ CollapseItem.vue.js
│  │  │  │  ├─ CollapseItem.vue2.js
│  │  │  │  ├─ index.js
│  │  │  │  └─ types.js
│  │  │  ├─ Icon
│  │  │  │  ├─ Icon.vue.js
│  │  │  │  ├─ Icon.vue2.js
│  │  │  │  └─ index.js
│  │  │  ├─ Message
│  │  │  │  ├─ create.js
│  │  │  │  ├─ index.js
│  │  │  │  ├─ Message.vue.js
│  │  │  │  └─ Message.vue2.js
│  │  │  └─ Tooltip
│  │  │     ├─ index.js
│  │  │     ├─ Tooltip.vue.js
│  │  │     └─ Tooltip.vue2.js
│  │  ├─ hooks
│  │  │  └─ useUtilTooltip.js
│  │  └─ index.js
│  ├─ types
│  │  └─ index.d.ts
│  └─ yingqiu-cream-ui.css
├─ docs
│  ├─ .vitepress
│  │  ├─ config.ts
│  │  └─ theme
│  │     └─ index.ts
│  ├─ api-examples.md
│  ├─ components
│  │  ├─ button.md
│  │  ├─ collapse.md
│  │  ├─ getting-started.md
│  │  ├─ icon.md
│  │  ├─ index.md
│  │  ├─ message.md
│  │  └─ tooltip.md
│  ├─ demo
│  │  ├─ Button
│  │  │  ├─ Basic.vue
│  │  │  ├─ Disabled.vue
│  │  │  ├─ Icon.vue
│  │  │  ├─ Loading.vue
│  │  │  └─ Size.vue
│  │  ├─ Collapse
│  │  │  └─ Collapse
│  │  │     ├─ Accordion.vue
│  │  │     └─ Basic.vue
│  │  ├─ Message
│  │  │  ├─ Basic.vue
│  │  │  ├─ Close.vue
│  │  │  ├─ CloseAll.vue
│  │  │  └─ Type.vue
│  │  └─ Tooltip
│  │     ├─ Basic.vue
│  │     ├─ Click.vue
│  │     ├─ Custom.vue
│  │     ├─ Manual.vue
│  │     └─ Placement.vue
│  └─ markdown-examples.md
├─ env.d.ts
├─ eslint.config.js
├─ eslint.config.ts
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.cjs
├─ public
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ base.css
│  │  └─ main.css
│  ├─ components
│  │  ├─ Button
│  │  │  ├─ Button.vue
│  │  │  ├─ index.ts
│  │  │  ├─ style.css
│  │  │  ├─ types.ts
│  │  │  └─ __test__
│  │  │     └─ Button.test.ts
│  │  ├─ Collapse
│  │  │  ├─ Collapse.vue
│  │  │  ├─ CollapseItem.vue
│  │  │  ├─ index.ts
│  │  │  ├─ style.css
│  │  │  ├─ types.ts
│  │  │  └─ __tests__
│  │  │     └─ Collapse.test.ts
│  │  ├─ Icon
│  │  │  ├─ Icon.vue
│  │  │  ├─ index.ts
│  │  │  ├─ style.css
│  │  │  ├─ types.ts
│  │  │  └─ __tests__
│  │  │     └─ Icon.test.ts
│  │  ├─ Message
│  │  │  ├─ create.ts
│  │  │  ├─ index.ts
│  │  │  ├─ Message.vue
│  │  │  ├─ style.css
│  │  │  ├─ types.ts
│  │  │  └─ __tests__
│  │  │     └─ Message.test.ts
│  │  └─ Tooltip
│  │     ├─ index.ts
│  │     ├─ style.css
│  │     ├─ Tooltip.vue
│  │     ├─ types.ts
│  │     └─ __tests__
│  │        └─ Tooltip.test.ts
│  ├─ Hello.vue
│  ├─ hooks
│  │  └─ useUtilTooltip.ts
│  ├─ index.ts
│  ├─ main.ts
│  └─ shims-vue.d.ts
├─ styles
│  ├─ index.css
│  ├─ reset.css
│  └─ vars.css
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ vitest.config.ts

```
