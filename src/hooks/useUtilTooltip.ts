import { onMounted, onUnmounted, type Ref } from 'vue'

const useClickOutside = (
  element: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void,
) => {
  const handlClick = (e: MouseEvent) => {
    if (element.value && e.target) {
      if (!element.value?.contains(e.target as HTMLElement)) {
        // 如果不在范围内就改变isOpen
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handlClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handlClick)
  })
}
export default useClickOutside
