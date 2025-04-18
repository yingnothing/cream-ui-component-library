/**
 * Collapse组件单元测试
 * 测试Collapse组件的基本功能、手风琴模式以及动态更新
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref, } from 'vue'
import Collapse from '../Collapse.vue'
import CollapseItem from '../CollapseItem.vue'
import type { NameType } from '../types'

// 帮助函数：创建一个基本的Collapse和CollapseItem组合
const createCollapseWrapper = (props = { modelValue: [] as NameType[] }, slots = {}) => {
  return mount(Collapse, {
    props,
    slots,
    global: {
      stubs: {
        'Icon': true // 替换Icon组件为存根
      }
    }
  })
}

// 创建带有多个 CollapseItem 的 Collapse 组件（用于更复杂的测试场景）
// 注：该函数保留作为参考，后续测试可能用到
// const createCollapseWithItemsComplex = (
//     props = { modelValue: [] },     // Collapse 组件的 props，默认为空的 modelValue（通常用于 v-model）
//     itemCount = 3,                  // 要创建多少个 CollapseItem，默认创建 3 个
//     itemProps = []                 // 每个 CollapseItem 的 props 数组（可以单独设置 name、title 等属性）
//   ) => {
//     return mount(Collapse, {
//       props,                        // 传递给 Collapse 的 props
//       slots: {
//         default: Array(itemCount).fill(0).map((_, index) => ({
//           // 每一个 item 对应一个 slot 节点
//           render: () => {
//             // 从 itemProps 取出对应的 prop，否则使用默认值（name/title）
//             const itemProp = itemProps[index] || { name: `item-${index + 1}`, title: `标题 ${index + 1}` }
//             // 返回 CollapseItem 组件，设置 slot 内容为“内容 + index”
//             return h(CollapseItem, itemProp, {
//               default: () => `内容 ${index + 1}`
//             })
//           }
//         }))
//       },
//       global: {
//         components: { CollapseItem }, // 注册 CollapseItem 组件（因为 slot 中用到了）
//         stubs: {
//           'Icon': true // 替换 Icon 为 stub，避免测试时干扰
//         }
//       }
//     })
//   }
  
describe('Collapse.vue', () => {
  // 测试Collapse组件的基本渲染，it定义一个单独的测试用例的函数
  it('应该正确渲染Collapse组件', () => {
    const wrapper = createCollapseWrapper({ modelValue: [] })
    expect(wrapper.find('.cr-collapse').exists()).toBe(true)
  })

  // 测试Collapse组件的初始激活项，//   async是为了内部可以使用await ，因为内部可能会做一些异步操作 
  it('应该正确设置初始激活项', async () => {
    // 准备测试数据
    const modelValue = ref(['item-1', 'item-3'])
    // 先注册Collapse和CollapseItem组件，然后写模板使用这两个组件，其中setup
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse v-model="activeNames">
          <CollapseItem name="item-1" title="标题1">内容1</CollapseItem>
          <CollapseItem name="item-2" title="标题2">内容2</CollapseItem>
          <CollapseItem name="item-3" title="标题3">内容3</CollapseItem>
        </Collapse>
      `,
      setup() {
        // 给activeNames赋值modelValue
        return { activeNames: modelValue }
      }
    }, {
      global: {
        stubs: {
            Icon: {
              template: '<div class="stub-icon">stub</div>'
            }
          }
      }
    })
    await nextTick()
    console.log(wrapper.html())
    // 验证激活的项目
    // 获取所有标题元素
    const headers = wrapper.findAll('.cr-collapse-item__header')
    expect(headers[0].classes()).toContain('is-active')
    expect(headers[1].classes()).not.toContain('is-active')
    expect(headers[2].classes()).toContain('is-active')
    
    // 验证内容区域的显示状态
    const contents = wrapper.findAll('.cr-collapse-item__wrapper')
    expect(contents[0].isVisible()).toBe(true)
    expect(contents[1].isVisible()).toBe(false)
    expect(contents[2].isVisible()).toBe(true)
  })

  // 测试点击CollapseItem的标题切换内容显示状态
  it('点击标题应该切换内容的显示状态', async () => {
    const modelValue = ref(['item-1'])
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse v-model="activeNames">
          <CollapseItem name="item-1" title="标题1">内容1</CollapseItem>
          <CollapseItem name="item-2" title="标题2">内容2</CollapseItem>
        </Collapse>
      `,
      setup() {
        return { activeNames: modelValue }
      }
    }, {
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    await nextTick()
    
    // 获取标题元素
    const headers = wrapper.findAll('.cr-collapse-item__header')
    expect(headers.length).toBe(2)
    
    // 验证初始状态
    expect(headers[0].classes()).toContain('is-active')
    expect(headers[1].classes()).not.toContain('is-active')
    
    // 点击第二个标题，它也会等待nextTick   
    await headers[1].trigger('click')
    
    // 验证点击后的状态
    expect(headers[0].classes()).toContain('is-active')
    expect(headers[1].classes()).toContain('is-active')
    expect(modelValue.value).toEqual(['item-1', 'item-2'])
    
    // 点击第一个标题关闭它
    await headers[0].trigger('click')
    
    // 验证关闭后的状态
    expect(headers[0].classes()).not.toContain('is-active')
    expect(headers[1].classes()).toContain('is-active')
    expect(modelValue.value).toEqual(['item-2'])
  })

  // 测试手风琴模式
//   async是为了内部可以使用await   
  it('手风琴模式下只能展开一个面板', async () => {
    const modelValue = ref(['item-1'])
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse v-model="activeNames" accordion>
          <CollapseItem name="item-1" title="标题1">内容1</CollapseItem>
          <CollapseItem name="item-2" title="标题2">内容2</CollapseItem>
          <CollapseItem name="item-3" title="标题3">内容3</CollapseItem>
        </Collapse>
      `,
      setup() {
        return { activeNames: modelValue }
      }
    }, {
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    await nextTick()
    
    // 获取标题元素
    const headers = wrapper.findAll('.cr-collapse-item__header')
    
    // 验证初始状态
    expect(headers[0].classes()).toContain('is-active')
    expect(headers[1].classes()).not.toContain('is-active')
    expect(headers[2].classes()).not.toContain('is-active')
    
    // 点击第二个标题
    await headers[1].trigger('click')
    
    // 验证点击后的状态 - 在手风琴模式下，只有第二个是激活的
    expect(headers[0].classes()).not.toContain('is-active')
    expect(headers[1].classes()).toContain('is-active')
    expect(headers[2].classes()).not.toContain('is-active')
    expect(modelValue.value).toEqual(['item-2'])
    
    // 点击第三个标题
    await headers[2].trigger('click')
    
    // 验证只有第三个是激活的
    expect(headers[0].classes()).not.toContain('is-active')
    expect(headers[1].classes()).not.toContain('is-active')
    expect(headers[2].classes()).toContain('is-active')
    expect(modelValue.value).toEqual(['item-3'])
  })

  // 测试禁用状态的CollapseItem
  it('禁用的CollapseItem不应该响应点击事件', async () => {
    const modelValue = ref(['item-1'])
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse v-model="activeNames">
          <CollapseItem name="item-1" title="标题1">内容1</CollapseItem>
          <CollapseItem name="item-2" title="标题2" disabled>内容2</CollapseItem>
        </Collapse>
      `,
      setup() {
        return { activeNames: modelValue }
      }
    }, {
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    await nextTick()
    
    // 获取标题元素
    const headers = wrapper.findAll('.cr-collapse-item__header')
    
    // 验证禁用状态的样式
    expect(headers[1].classes()).toContain('is-disabled')
    
    // 点击禁用的标题
    await headers[1].trigger('click')
    
    // 验证点击后的状态没有变化
    expect(modelValue.value).toEqual(['item-1'])
    expect(headers[1].classes()).not.toContain('is-active')
  })

  // 测试change事件
  it('展开/折叠时应该触发change事件', async () => {
    //  定义一个“假的函数”，它可以记录每次调用它的情况，绑定到@change事件上
    const onChange = vi.fn()
    const modelValue = ref(['item-1'])
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse v-model="activeNames" @change="onChange">
          <CollapseItem name="item-1" title="标题1">内容1</CollapseItem>
          <CollapseItem name="item-2" title="标题2">内容2</CollapseItem>
        </Collapse>
      `,
      setup() {
        return { 
          activeNames: modelValue,
          onChange
        }
      }
    }, {
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    await nextTick()
    
    // 获取标题元素
    const headers = wrapper.findAll('.cr-collapse-item__header')
    
    // 点击第二个标题
    await headers[1].trigger('click')
    
    // 验证事件被触发，并且传递了正确的参数
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    
    // 点击第一个标题关闭它
    await headers[0].trigger('click')
    
    // 验证事件再次被触发，并且传递了更新后的参数
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(['item-2'])
  })

  // 测试v-model双向绑定
  it('应该支持通过v-model动态更新激活项', async () => {
    const modelValue = ref(['item-1'])
    const wrapper = mount({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse v-model="activeNames">
          <CollapseItem name="item-1" title="标题1">内容1</CollapseItem>
          <CollapseItem name="item-2" title="标题2">内容2</CollapseItem>
          <CollapseItem name="item-3" title="标题3">内容3</CollapseItem>
        </Collapse>
      `,
      setup() {
        return { activeNames: modelValue }
      }
    }, {
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    await nextTick()
    
    // 验证初始状态
    const headers = wrapper.findAll('.cr-collapse-item__header')
    expect(headers[0].classes()).toContain('is-active')
    expect(headers[1].classes()).not.toContain('is-active')
    expect(headers[2].classes()).not.toContain('is-active')
    
    // 通过v-model更新激活项
    modelValue.value = ['item-2', 'item-3']
    await nextTick()
    
    // 验证更新后的状态
    expect(headers[0].classes()).not.toContain('is-active')
    expect(headers[1].classes()).toContain('is-active')
    expect(headers[2].classes()).toContain('is-active')
  })
}) 