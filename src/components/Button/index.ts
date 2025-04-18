import type { App } from 'vue'
import Button from './Button.vue'

// 添加install方法，支持按需导入
Button.install = (app: App): void => {
  app.component(Button.name!, Button)
}

// 默认导出组件
export default Button

export * from './types'
