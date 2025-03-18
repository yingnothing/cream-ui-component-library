<template>
  <div class="eb-message" v-if="visible">
    <!-- 内容 -->
    <div class="eb-message__content">
      <slot>{{ props.message }}</slot>
    </div>
    <!-- x号 -->
    <div class="eb-message__close" v-if="props.showClose">
      <Icon icon="xmark"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from './types';
import Icon from '../Icon/Icon.vue';
import { onMounted, ref } from 'vue';
defineOptions({
  name: 'EbMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  offset: 20,
  showClose: true
})
const visible = ref<boolean>(true)
onMounted(() => {

})
</script>
