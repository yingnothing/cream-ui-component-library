<script setup>
import { ref } from 'vue'
import crTooltip from '@/components/Tooltip/Tooltip.vue'
import crButton from '@/components/Button/Button.vue'

const tooltipRef = ref()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>
<template>
<div class="basic block">
  <crTooltip
    content="hello tooltip"
    ref="tooltipRef"
    manual
  >
    <crButton> 手动容器 </crButton>
  </crTooltip>

  <br/><br/>
  <crButton type="primary" @click="open"> 点我触发显示 </crButton>
  <crButton type="danger" @click="close"> 点我触发隐藏 </crButton>
</div>
</template>
