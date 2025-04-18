<script setup>
import crTooltip from '@/components/Tooltip/Tooltip.vue'
import crButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="basic block">
  <crTooltip
    content="hello tooltip"
    trigger="click"
  >
    <crButton> 点击激活 Tooltip </crButton>
  </crTooltip>
</div>
</template>
