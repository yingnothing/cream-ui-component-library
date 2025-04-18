<template>
  <div class="cr-message" ref="messageRef" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer"
    :style="topAndZIndexStyle" :class="{
      [`cr-message--${type}`]: type, 'is-close': props.showClose
    }">
    <!-- 内容 -->
    <div class="cr-message__content">
      <slot>{{ props.message }}</slot>
    </div>
    <!-- x号 -->
    <div class="cr-message__close" v-if="props.showClose">
      <Icon icon="xmark" @click="handleClose"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from './types';
import Icon from '../Icon/Icon.vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getLastBottomOffset } from './create';
defineOptions({
  name: 'crMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  offset: 20,
  showClose: false,
  duration: 3000,
})
const visible = ref<boolean>(true)
// 添加点击关闭事件
const handleClose = () => {
  console.log('handleClose 被调用了')
  visible.value = false
}
// 考虑鼠标放上去时不会消失
let timer: any
// 进入消息框
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}
const startTimer = () => {
  if (props.duration > 0) {
    console.log('当前的duration', props.duration);

    // 默认3s后消失
    timer = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
}
// 考虑多个组件
// 将组件和div进行销毁避免内存泄漏
const destroyComponent = () => {
  props.useDestroy!()
}
watch(visible, (newValue) => {
  if (newValue === false) {
    destroyComponent()
  }
})
// 计算每个组件的top值
const messageRef = ref<HTMLElement>()
const messageHeight = ref(0)
const lastBottomOffset = computed(() => {
  return getLastBottomOffset(props.id)
})
const topOffset = computed(() => {
  return props.offset + lastBottomOffset.value
})

const bottomOffset = computed(() => {
  return topOffset.value + messageHeight.value
})
// 使用内联样式
const topAndZIndexStyle = computed(() => {
  console.log('当前的zIndex', props.zIndex);
  
  return ({
    top: topOffset.value + 'px',
    zIndex:props.zIndex
  })
})
onMounted(() => {
  startTimer()
  
  // 返回元素的可见高度
  nextTick(() => { // 等待 DOM 更新后再访问
    if (messageRef.value) {
      messageHeight.value = messageRef.value.offsetHeight;
    }
  })
})
defineExpose({
  bottomOffset,
  visible
})
</script>
