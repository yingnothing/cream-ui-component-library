import type { ComponentInternalInstance, VNode } from 'vue'

export type MessageType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// 这里还可以优化成create和组件分开
export interface MessageProps {
  message: string
  type?: MessageType
  showClose?: boolean
  icon?: string
  offset?: number
  duration?: number
  useDestroy: () => void
  id: string | number
  [key: string]: any
}
export interface CreateMessageProps {
  message: string
  type?: MessageType
  showClose?: boolean
  icon?: string
  offset?: number
  duration?: number
}
// 组件实例存放于数组
export interface MessageContext {
  id: string | number
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
}
