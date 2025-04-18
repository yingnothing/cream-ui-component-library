<script setup>
import crButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="disabled block">
  <crButton disabled> hello </crButton>
  <crButton type="primary" disabled> Primary </crButton>
  <crButton type="success" disabled> Success </crButton>
  <crButton type="warning" disabled> Warning </crButton>
  <crButton type="danger" disabled> Danger </crButton>
  <crButton type="info" disabled> Info </crButton>
</div>

</template>
