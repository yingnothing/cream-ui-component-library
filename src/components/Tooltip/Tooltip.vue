<!-- 未完成 -->
<template>
  <div class="eb-tooltip" ref="popperContainNode" v-on="outerEvents">
    <!-- 触发区域 -->
    <div class="eb-tooltip__trigger" ref="triggerNode" v-on="enterEvents">
      <slot></slot>
    </div>
    <!-- 展示区域 -->
    <div class="eb-tooltip__popper" ref="popperNode" v-show="isOpen">
      <slot name="content">{{ content }}</slot>
      <!-- <div id="arrow" data-popper-arrow></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core'
import useClickOutside from '@/hooks/useUtilTooltip';
import { debounce } from 'lodash-es';
defineOptions({
  name: 'eb-tooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  placement: 'top',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
// 因为要使用poper.js
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
// 整个区域
const popperContainNode = ref<HTMLElement>()
// 控制展示区的显示与隐藏
const isOpen = ref<boolean>(false)
// 用于销毁实例
let popperInstance: null | Instance = null
// 使用当前用户传递过来的配置项和默认的配置项进行结合，用户传过来的可能未undefine?
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      }
    ],
    // 这里写法后面可以看看
    ...props.popperOptions ?? {}
  }
})
// 创建实例，这个得在watch里，如果没有可能会有错误后面看看是什么错误，
watch(isOpen, (newVal) => {
  if (newVal) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post' })


// 鼠标移入就打开
const openTooltip = () => {
  isOpen.value = true
  emits('visible-change', true)
}
// 鼠标移开就关闭
const closeTooltip = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const openTooltipDebounce = debounce(openTooltip, props.openDelay)
const closeTooltipDebounce = debounce(closeTooltip, props.closeDelay)
// 完成click模式
let enterEvents: Record<string, unknown> = reactive({})
let outerEvents: Record<string, unknown> = reactive({})
// 点击的时候触发该事件
const handlePopper = () => {
  if (isOpen.value) {
    closeTooltipDebounce()
  } else {
    openTooltipDebounce()
  }
}
// 决定绑定的事件，应该在onMounted开启
const attachEvents = () => {
  if (props.trigger === 'hover') {
    enterEvents['mouseenter'] = openTooltipDebounce
    outerEvents['mouseleave'] = closeTooltipDebounce
  } else {
    enterEvents['click'] = handlePopper
  }
}
// 点击屏幕外也能取消
// 外部事件，点击外部关闭 Tooltip，因为有副作用，同时也要清除副作用，所以给它改成一个钩子函数
// const handleClickOutside = (event: MouseEvent) => {
//   // event.target 是事件对象中的一个属性，它表示触发事件的 DOM 元素。
//   if (popperContainNode.value && !popperContainNode.value.contains(event.target as Node)) {
//     closeTooltip()
//   }
// }
onMounted(() => {
  if (!props.manual) {
    attachEvents()
  }
  // 监听点击事件，点击页面外部关闭 Tooltip
})
// 更换成钩子函数
// onMounted(() => {
//   attachEvents()
//   // 监听点击事件，点击页面外部关闭 Tooltip
//   document.addEventListener('click', handleClickOutside)
// })
// // 在组件销毁前移除事件监听器
// onBeforeUnmount(() => {
//   document.removeEventListener('click', handleClickOutside)
// })
// 应该是在click状态下调用钩子函数，为document添加监听
if (props.trigger === 'click') {
  useClickOutside(popperContainNode, () => {
    if (isOpen.value === true && !props.manual) {
      closeTooltipDebounce()
    }
  })
}
// 打开和关闭的延迟时间
// 添加manual
defineExpose<TooltipInstance>({
  'show': openTooltipDebounce,
  'hide': closeTooltipDebounce
})

watch(() => props.trigger, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    enterEvents = {}
    outerEvents = {}
    attachEvents()
  }
})
watch(() => props.manual, (isManual) => {
  if (isManual) {
    enterEvents = {}
    outerEvents = {}
  } else {
    attachEvents()
  }
})
</script>
