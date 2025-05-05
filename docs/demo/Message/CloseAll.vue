<script setup>
import { crMessage, closeAll } from '@/components/Message/create'
import crButton from '@/components/Button/Button.vue'
const open = () => {
  crMessage({ message: 'hello world1', duration: 0 ,zIndex:99})
  crMessage({ message: 'hello world2', duration: 0 ,zIndex:99})
  crMessage({ message: 'hello world3', duration: 0 ,zIndex:99})
}
const close = () => {
  closeAll()
}
</script>
<template>
  <div class="basic block">
    <crButton @click="open"> 创建三条消息 </crButton>
    <crButton @click="close"> 全部关闭 </crButton>
  </div>
</template>
