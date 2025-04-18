import type { App } from 'vue'
import crCollapse from '@/components/Collapse/Collapse.vue'
import crCollapseItem from '@/components/Collapse/CollapseItem.vue'
crCollapse.install = (app: App) => {
  app.component(crCollapse.name!, crCollapse)
}
crCollapseItem.install = (app: App) => {
  app.component(crCollapseItem.name!, crCollapseItem)
}
export default crCollapse
export { crCollapseItem }
export * from './types'
