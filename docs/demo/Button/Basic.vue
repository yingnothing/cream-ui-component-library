<script setup>
import crButton from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Icon.vue'
</script>
<template>
<div class="basic block">
  <crButton> hello </crButton>
  <crButton type="primary"> Primary </crButton>
  <crButton type="success"> Success </crButton>
  <crButton type="warning"> Warning </crButton>
  <crButton type="danger"> Danger </crButton>
  <crButton type="info"> Info </crButton>
</div>

<div class="plain block">
  <crButton plain> hello </crButton>
  <crButton type="primary" plain> Primary </crButton>
  <crButton type="success" plain> Success </crButton>
  <crButton type="warning" plain> Warning </crButton>
  <crButton type="danger" plain> Danger </crButton>
  <crButton type="info" plain> Info </crButton>
</div>

<div class="round block">
  <crButton round> hello </crButton>
  <crButton type="primary" round> Primary </crButton>
  <crButton type="success" round> Success </crButton>
  <crButton type="warning" round> Warning </crButton>
  <crButton type="danger" round> Danger </crButton>
  <crButton type="info" round> Info </crButton>
</div>

<div class="circle block">
  <crButton circle> <Icon icon="star" /> </crButton>
  <crButton type="primary" circle>   <Icon icon="star" /> </crButton>
  <crButton type="success" circle> <Icon icon="star" /> </crButton>
  <crButton type="warning" circle> <Icon icon="star" /> </crButton>
  <crButton type="danger" circle> <Icon icon="star" /> </crButton>
  <crButton type="info" circle> <Icon icon="star" /> </crButton>
</div>
</template>
<style>
.block {
  margin-bottom: 10px;
}
</style>
