export type MessageType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
// 有一些还没加
export interface MessageProps {
  message: string
  type?: MessageType
  showClose?: boolean
  icon?: string
  offset?: number
  [key: string]: any
}
export interface MessageContext {
  id: string
}
