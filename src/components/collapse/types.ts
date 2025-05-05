import type { InjectionKey, Ref } from 'vue'
export type NameType = string | number
// 父组件
export interface CollapseProps {
  // 用一个数组来存储，必须携带
  modelValue: NameType[]
  accordion?: boolean
}
export interface CollapseItemProps {
  // 必须有一个名称
  name: NameType
  title?: string
  disabled?: boolean
}

// 函数类型接口，定义父组件的emits，都是将父元素的数组返回出去
export interface CollaspeEmits {
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}
// 将父组件的东西传给子组件，一个数组和一个改变数组内容的函数,provide的类型
export interface CollapseContext {
  // 主要原来是使用响应式的，但我不知道为什么要，要回来看：因为activeNames是一个要传给子组件的响应式对象，
  activeNames: Ref<NameType[]>
  // 用于修改数组
  handleItemClick: (name: NameType) => void
}
// 定义一个唯一key变量，类型指定为
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
