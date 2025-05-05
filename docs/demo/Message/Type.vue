<script setup>
import { crMessage } from '@/components/Message/create'
import crButton from '@/components/Button/Button.vue'
const open = (type) => {
  crMessage({ message: 'hello world', type,zIndex:99 })
}
</script>
<template>
  <div class="basic block">
    <crButton @click="open('success')"> Success </crButton>
    <crButton @click="open('info')"> Info </crButton>
    <crButton @click="open('warning')"> warning </crButton>
    <crButton @click="open('danger')"> Danger </crButton>
  </div>
</template>
