import type { MessageContext, MessageProps, CreateMessageProps } from './types'
import Message from './Message.vue'
import { createVNode, ref, render } from 'vue'
// 使用一个数组来管理所创建的Message实例
const instances = ref<MessageContext[]>([])
let messageIdCounter = 0
export function EbMessage(props: CreateMessageProps) {
  // 生成唯一标识
  const id = messageIdCounter++
  // 在适当时机将当前组件进行销毁
  const destroyMessage = () => {
    const destroyIndex = instances.value.findIndex((instance) => instance.id === id)
    if (destroyIndex === -1) {
      return
    }
    console.log('当前EbMessage的id:' + id)

    instances.value.splice(destroyIndex, 1)
    render(null, container)
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }
  // 将destroyMessage方法作为Props传给组件
  const newProps: MessageProps = {
    ...props,
    // 用于计算上一个组件的bottomOffset
    id,
    useDestroy: destroyMessage,
  }

  // 创建一个虚拟 DOM 节点（VNode），Message.vue是组件定义
  const vnode = createVNode(Message, newProps)
  const container = document.createElement('div')
  // 将节点挂载到某个节点上
  render(vnode, container)
  // 给document添加一个新的子节点，因为vnode是存在的，所以肯定有firstElementChild
  document.body.appendChild(container.firstElementChild!)

  // 生成实例对象，在 render(vnode, container) 之后才会被 Vue 赋值
  const vm = vnode.component!
  const instance = {
    // 用来获取数组里与当前id相同的元素
    id,
    vnode,
    props: newProps,
    vm,
  }
  instances.value.push(instance)
}
// 使用多个组件，本质上就是控制每个Message的top值，
export const getLastBottomOffset = (id: string | number) => {
  console.log(instances)
  const index = instances.value.findIndex((instance) => {
    return instance.id === id
  })

  if (index <= 0) {
    return 0
  } else {
    const prev = instances.value[index - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}
