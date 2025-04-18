<script setup>
import crTooltip from '@/components/Tooltip/Tooltip.vue'
import crButton from '@/components/Button/Button.vue'
</script>
<template>
  <div class="basic block">
    <crTooltip content="hello crTooltip" placement="top-start">
      <crButton> top-start </crButton>
    </crTooltip>
    <crTooltip content="hello crTooltip" placement="left-start">
      <crButton> left-start </crButton>
    </crTooltip>
    <crTooltip content="hello crTooltip" placement="bottom-start">
      <crButton> bottom-start </crButton>
    </crTooltip>
    <crTooltip content="hello crTooltip" placement="right-start">
      <crButton> right-start </crButton>
    </crTooltip>

  </div>
</template>
<style scoped>
.basic {
  display: flex;
  gap: 15px;
}
</style>
