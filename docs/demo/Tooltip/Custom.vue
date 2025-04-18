<script setup>
import crTooltip from '@/components/Tooltip/Tooltip.vue'
import crButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="basic block">
  <crTooltip
    trigger="click"
  >
    <crButton> 复杂 HTML 结构的Tooltip </crButton>
    <template #content>
      <h3> this is the title</h3>
      <p> this is the content </p>
    </template>
  </crTooltip>
</div>
</template>
