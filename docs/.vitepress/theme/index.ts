import DefaultTheme from 'vitepress/theme'
import '../../../styles/index.css'
import { ElementPlusContainer} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
// 图标库
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
export default {
  ...DefaultTheme,
  // 借助插件生成示例与代码
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
  }
}
