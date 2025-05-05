import type { MessageContext, MessageProps, CreateMessageProps, CodeMessageMap } from './types'
import Message from './Message.vue'
import { createVNode, ref, render } from 'vue'
// 使用一个数组来管理所创建的Message实例
const instances = ref<MessageContext[]>([])
let messageIdCounter = 0

// 定义默认的状态码映射表
const defaultCodeMessageMap: CodeMessageMap = {
  10000: { type: 'success', content: '操作成功！' },
  10001: { type: 'danger', content: '请求参数错误，请检查！' },
  10002: { type: 'danger', content: '登录已失效，请重新登录' },
  10003: { type: 'warning', content: '权限不足，无法操作' },
  10004: { type: 'danger', content: '资源不存在' },
  10005: { type: 'danger', content: '服务器异常，请稍后重试' }
}

// 当前使用的状态码映射表，初始化为默认映射表
let codeMessageMap: CodeMessageMap = { ...defaultCodeMessageMap }

// 设置状态码映射表的方法
export function setCodeMessageMap(map: CodeMessageMap) {
  codeMessageMap = { ...defaultCodeMessageMap, ...map }
}

// 重置状态码映射表为默认值
export function resetCodeMessageMap() {
  codeMessageMap = { ...defaultCodeMessageMap }
}

// 根据状态码创建消息
export function crMessageByCode(code: number) {
  const messageItem = codeMessageMap[code]
  if (!messageItem) {
    console.warn(`未找到状态码 ${code} 对应的消息配置`)
    return null
  }

  return crMessage({
    message: messageItem.content,
    type: messageItem.type,
    showClose: messageItem.showClose,
    icon: messageItem.icon,
    offset: messageItem.offset,
    duration: messageItem.duration,
    zIndex: messageItem.zIndex
  })
}

export function crMessage(props: CreateMessageProps) {
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
