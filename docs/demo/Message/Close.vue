<script setup>
import { crMessage } from '@/components/Message/create.ts'
import crButton from '@/components/Button/Button.vue'
const open = () => {
  crMessage({ message: 'hello world', showClose: true, duration: 0,zIndex:99 })
}
</script>
<template>
  <div class="basic block">
    <crButton @click="open"> 可关闭消息 </crButton>
  </div>
</template>
