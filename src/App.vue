<template>
  <Button type="danger" loading>按钮</Button>
  <Colapse v-model="activeNames" accordion>
    <ColapseItem :name="1" title="title1">
      <div>
        内容1
      </div>
    </ColapseItem>
    <ColapseItem :name="2" title="title2">
      <div>
        内容2
      </div>
    </ColapseItem>
    <ColapseItem :name="3" title="title3" content="123">

    </ColapseItem>
  </Colapse>
  <Icon icon="star" type="primary" color="red" />
  <br>
  <Tooltip content="Tooltip:hover" placement="right" trigger="hover" ref="toolTip">
    Tooltip
  </Tooltip>
</template>
<script setup lang="ts">
import Button from './components/Button/Button.vue';
import Colapse from './components/collapse/Colapse.vue';
import ColapseItem from './components/collapse/ColapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';

const activeNames = [1, 2, 3]
setTimeout(() => {
  activeNames.pop()
}, 1000)

</script>
