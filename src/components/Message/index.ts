import type { App } from 'vue'
import Message from '@/components/Message/Message.vue'
import { crMessage, closeAll, crMessageByCode, setCodeMessageMap, resetCodeMessageMap } from '@/components/Message/create'
Message.install = (app: App) => {
  app.component(Message.name!, Message)
}

export default Message
export { crMessage, closeAll, crMessageByCode, setCodeMessageMap, resetCodeMessageMap }
export * from './types'
