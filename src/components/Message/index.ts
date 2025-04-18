import type { App } from 'vue'
import Message from '@/components/Message/Message.vue'
import { CrMessage, closeAll } from '@/components/Message/create'
Message.install = (app: App) => {
  app.component(Message.name!, Message)
}

export default Message
export { CrMessage, closeAll }
export * from './types'
