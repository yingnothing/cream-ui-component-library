<template>
  <!-- 如果有设置type，就添加上对应的样式 ，内联样式改变calss的颜色-->
  <i class="cr-icon" :class="{ [`cr-icon--${type}`]: type }" :style="customStyles">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconProps } from './types';
import { computed } from 'vue';
import { omit } from 'lodash-es'

defineOptions({
  name: 'crIcon',
})
const props = defineProps<IconProps>()
// 组件库自带的属性
const filterProps = computed(() => omit(props, ['type', 'color']))
// 过滤出自己写的样式
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
<style scoped></style>
