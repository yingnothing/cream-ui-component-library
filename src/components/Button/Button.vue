<template>
  <button ref="_ref" class="eb-button" :class="{
    [`eb-button--${type}`]: type,
    [`eb-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled
  }" :disabled="disabled || loading" :autofocus="autofocus" :type="nativeType">
    <Icon v-if="icon" :icon="icon"></Icon>
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <slot></slot>
  </button>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'EbButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})
const _ref = ref<HTMLButtonElement>()
// 将button组件暴露出去
defineExpose({
  ref: _ref
})
</script>

<style scoped></style>
