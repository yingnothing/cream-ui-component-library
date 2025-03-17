<template>
  <!-- 如果有设置type，就添加上对应的样式 -->
  <i class="eb-icon" :class="{ [`eb-icon--${type}`]: type }" :style="customStyles">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconProps } from './types';
import { computed } from 'vue';
import { omit } from 'lodash-es'

defineOptions({
  name: 'EbIcon',
})
const props = defineProps<IconProps>()
// 组件库自带的属性
const filterProps = computed(() => omit(props, ['type', 'color']))

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
<style scoped></style>
