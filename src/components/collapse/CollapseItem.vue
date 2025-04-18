<template>
  <div class="cr-collapse-item" :class="{
    'is-disabled': props.disabled,
  }">
    <!-- 头部 -->
    <div class="cr-collapse-item__header" :class="{
      'is-disabled': props.disabled,
      'is-active': isActive
    }" :id="`item-header-${props.name}`" @click="handleClick">
      <slot name="title">{{ props.title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <!-- 内容 -->
    <div>
      <Transition name="slide" v-on="transitionEvents">
        <div class="cr-collapse-item__wrapper" v-show="isActive">
          <div class="cr-collapse-item__content" :id="`item-content-${props.name}`">
            <slot></slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { collapseContextKey, type CollapseItemProps } from './types.ts';
import Icon from '../Icon/Icon.vue';
defineOptions({
  name: 'crCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey, undefined)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {

  // 要触发事件,但item是使用slot传过来的,所以无法使用父子传参
  if (props.disabled) { return }
  // 触发事件更新数组
  collapseContext?.handleItemClick(props.name)
}
// 过渡动画事件处理
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}

</script>

<style scoped></style>
