<script setup>
import { ref } from 'vue'
import crCollapse from '@/components/Collapse/Collapse.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
const openedValue = ref(['a'])
</script>
<template>
    当前展开的Item:{{ openedValue }}
  <div class="basic block">
    <crCollapse v-model="openedValue" accordion>
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Title C">
        <div> this is cccc test </div>
      </Item>
    </crCollapse>
  </div>
</template>
