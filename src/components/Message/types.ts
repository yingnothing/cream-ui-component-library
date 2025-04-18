import type { ComponentInternalInstance, VNode } from 'vue'

export type MessageType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// 组件内部的
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
  zIndex?: number
}
// create函数的
export interface CreateMessageProps {
  message: string
  type?: MessageType
  showClose?: boolean
  icon?: string
  offset?: number
  duration?: number
  zIndex?: number

}
// 组件实例存放于数组
export interface MessageContext {
  id: string | number
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  manualDestroy: () => void
}
