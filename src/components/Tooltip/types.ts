import type { Options, Placement } from '@popperjs/core'
export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  // 丰富popper配置项,Options 原本是 @popperjs/core 里的一整套配置对象，包含多个配置项。Partial<Options> 让 Options 里的所有属性变成可选的，这样用户可以只传入部分配置，而不需要提供完整的 Options 对象。
  popperOptions?: Partial<Options>
  manual?: boolean
  openDelay?: number
  closeDelay?: number
}
export interface TooltipEmits {
  (e: 'visible-change', values: boolean): void
}
export interface TooltipInstance {
  show: () => void
  hide: () => void
}
