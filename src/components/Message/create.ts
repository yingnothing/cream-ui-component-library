import type { MessageProps } from './types'
import Message from './Message.vue'
import { createVNode, render } from 'vue'
export function EbMessage(props: MessageProps) {
  // 创建一个虚拟 DOM 节点（VNode），Message.vue是组件定义
  const vnode = createVNode(Message, props)
  const container = document.createElement('div')
  // 将节点挂载到某个节点上
  render(vnode, container)
  // 给document添加一个新的子节点，因为vnode是存在的，所以肯定有firstElementChild
  document.body.appendChild(container.firstElementChild!)
}
