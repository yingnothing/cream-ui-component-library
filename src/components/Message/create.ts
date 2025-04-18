import type { MessageContext, MessageProps, CreateMessageProps } from './types'
import Message from './Message.vue'
import { createVNode, ref, render } from 'vue'
// 使用一个数组来管理所创建的Message实例
const instances = ref<MessageContext[]>([])
let messageIdCounter = 0
export function CrMessage(props: CreateMessageProps) {
  // 生成唯一标识
  const id = messageIdCounter++
  // 在适当时机将当前组件进行销毁，传给组件内部，通过组件内id找到数组里面对应的组件instance，进行销毁 
  const destroyMessage = () => {
    const destroyIndex = instances.value.findIndex((instance) => instance.id === id)
    if (destroyIndex === -1) {
      return
    }

    instances.value.splice(destroyIndex, 1)
    render(null, container)
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }
  // 手动销毁，用于closeAll
  const manualDestroy = () => {
    const instance = instances.value.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }


  // 将destroyMessage方法作为Props传给组件
  const newProps: MessageProps = {
    ...props,
    // 组件必须要有id，以便查找
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
    manualDestroy,
  }
  instances.value.push(instance)
  return instance
}

// 文件暴露的其它方法，被Message.vue引入并使用
// 使用多个组件，本质上就是控制每个Message的top值，
export const getLastBottomOffset = (id: string | number) => {
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
// 关闭所有组件
export const closeAll = () => {
  instances.value.forEach((instance) => {
    instance.manualDestroy()
  })
}
