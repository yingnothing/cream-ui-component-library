<script setup>
import { CrMessage } from '@/components/Message/create.ts'
import crButton from '@/components/Button/Button.vue'
const open = () => {
  CrMessage({ message: 'hello world',zIndex:99 ,type:"primary"})
}
const open1 = () => {
  CrMessage({ message: 'hello world',showClose:true,zIndex:99,type:"primary" })
}
</script>
<template>
  <div class="basic block">
    <crButton type="primary" @click="open" > 创建一条消息 </crButton>
        <crButton type="primary" @click="open1" > 创建一条可关闭的消息 </crButton>

  </div>
</template>
