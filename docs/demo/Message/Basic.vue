<script setup>
import { crMessage } from '@/components/Message/create.ts'
import crButton from '@/components/Button/Button.vue'
const open = () => {
  crMessage({ message: '操作成功' ,type:"success"})
}
const open1 = () => {
  crMessage({ message: 'hello world',showClose:true,zIndex:99,type:"primary" })
}
</script>
<template>
  <div class="basic block">
    <crButton type="primary" @click="open" > 创建一条消息 </crButton>
        <crButton type="primary" @click="open1" > 创建一条可关闭的消息 </crButton>

  </div>
</template>
