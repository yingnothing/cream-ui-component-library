<template>
  <div>
    <div class="cr-collapse">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { collapseContextKey, type CollapseProps, type CollaspeEmits, type NameType } from './types';
defineOptions({
  name: 'crCollapse'
})
// 拿到v-model
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollaspeEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
// 这里先不用watch来响应式更新activeName
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})
// 操作activeNames，当对item进行点击时执行
const handleItemClick = (item: NameType) => {
  // 通过检查数组内是否有这个name来决定要将其打开还是关闭
  const index = activeNames.value.indexOf(item)
  if (props.accordion) {
    // 手风琴模式

    if (index <= -1) {
      activeNames.value = []

    } else {
      console.log(activeNames.value);
      activeNames.value = [item]
      console.log(activeNames.value)
    }
  }
  if (index > -1) {
    // console.log('删除前' + activeNames.value);

    activeNames.value.splice(index, 1)
    // console.log('删除后' + activeNames.value);
  } else {
    activeNames.value.push(item)
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)

}
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style scoped></style>
