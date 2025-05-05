import type { App } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import crButton from '@/components/Button'
import crCollapse, { crCollapseItem } from '@/components/Collapse'
import crIcon from '@/components/Icon'
import Message, { crMessage, closeAll as closeMessageAll } from '@/components/Message'
import crTooltip from '@/components/Tooltip'
import '../styles/index.css'

// 初始化字体图标库
library.add(fas)


const components = [crButton, crCollapse, crCollapseItem, crIcon, Message, crTooltip]

// 定义插件安装函数
const install = (app: App): void => {
  // 全局注册所有组件
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { install, crButton, crCollapse, crCollapseItem, crIcon, Message, crMessage, closeMessageAll, crTooltip }

export default {
  install,
}
