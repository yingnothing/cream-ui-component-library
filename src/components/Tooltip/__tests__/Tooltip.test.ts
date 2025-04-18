/**
 * Tooltip组件单元测试
 * 测试Tooltip组件的基本功能、触发方式、位置设置和手动控制
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import Tooltip from '../Tooltip.vue'


// 使用假的定时器
vi.useFakeTimers()

// 创建一个mock的popperjs实例
const mockPopperInstance = {
  destroy: vi.fn(),
  update: vi.fn(),
  state: {
    elements: {
      popper: document.createElement('div')
    }
  }
}

// 模拟createPopper函数
vi.mock('@popperjs/core', () => {
  return {
    createPopper: vi.fn().mockImplementation(() => {
      return mockPopperInstance
    })
  }
})

// 创建测试辅助函数
const createTooltipWrapper = (props = {}, slots:any = {}) => {
  return mount(Tooltip, {
    props,
    slots: {
      default: slots.default ?? 'Trigger Content',
      content: slots.content ?? 'Tooltip Content'
    },
    // 挂载到真实DOM上面
    attachTo: document.body
  })
}

describe('Tooltip.vue', () => {
  // 每个测试后重置mocks和DOM
  afterEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  // 测试基本渲染
  it('应该正确渲染Tooltip组件', () => {
    const wrapper = createTooltipWrapper()
    
    // 验证基本结构
    expect(wrapper.find('.cr-tooltip').exists()).toBe(true)
    expect(wrapper.find('.cr-tooltip__trigger').exists()).toBe(true)
    expect(wrapper.find('.cr-tooltip__popper').exists()).toBe(true)
    
    // 默认情况下tooltip应该是不可见的
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
    
    // 验证默认内容
    expect(wrapper.find('.cr-tooltip__trigger').text()).toBe('Trigger Content')
    expect(wrapper.find('.cr-tooltip__popper').text()).toContain('Tooltip Content')
  })



  // 测试hover触发模式
  it('hover模式下应该在鼠标进入时显示tooltip', async () => {
    const wrapper = createTooltipWrapper({
      trigger: 'hover'
    })
    await nextTick()
    // 初始状态是隐藏的
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
    
    // 触发鼠标进入事件
    await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    
    // 应该设置isOpen为true

  

    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(true)
    
    // 触发鼠标离开事件
    await wrapper.find('.cr-tooltip').trigger('mouseleave')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    // 应该设置isOpen为false
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
  })

  // 测试click触发模式
  it('click模式下应该在点击时切换tooltip显示状态', async () => {
    const wrapper = createTooltipWrapper({
      trigger: 'click'
    })
    
    // 初始状态是隐藏的
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
    await nextTick()
    // 触发点击事件
    await wrapper.find('.cr-tooltip__trigger').trigger('click')
     vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    // 应该设置isOpen为true
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(true)
    
    // 再次点击
    await wrapper.find('.cr-tooltip__trigger').trigger('click')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    
    // 应该切换isOpen为false
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
  })

  // 测试点击外部关闭功能
  it('click模式下点击外部应该关闭tooltip', async () => {
    const wrapper = createTooltipWrapper({
      trigger: 'click'
    })
    await nextTick()
    // 触发点击事件打开tooltip
    await wrapper.find('.cr-tooltip__trigger').trigger('click')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(true)
    
    // 模拟点击外部
    const event = new MouseEvent('click')
    // 手动给document触发点击事件
    document.dispatchEvent(event)
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(false)
  })

  // 测试手动控制模式
  it('manual模式下应该通过show/hide方法控制tooltip', async () => {
    const wrapper = createTooltipWrapper({
      manual: true
    })
    
    // 初始状态是隐藏的
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
    
    // 使用show方法
    wrapper.vm.show()
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(true)
    
    // 使用hide方法
    wrapper.vm.hide()
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.find('.cr-tooltip__popper').isVisible()).toBe(false)
    
    // manual模式下trigger事件不应该生效
    await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(false)
    
    await wrapper.find('.cr-tooltip__trigger').trigger('click')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    expect(wrapper.vm.isOpen).toBe(false)
  })

  // 测试延迟显示/隐藏
  it('应该根据openDelay和closeDelay延迟显示和隐藏tooltip', async () => {
    const wrapper = createTooltipWrapper({
      openDelay: 200,
      closeDelay: 300
    })
    await nextTick()
    // 触发鼠标进入事件
    await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')

    
    // 立即检查，应该仍然是隐藏的
    expect(wrapper.vm.isOpen).toBe(false)
    await nextTick()
    // 快进200ms
    vi.advanceTimersByTime(1000)
    await nextTick()
    // 现在应该显示了
    expect(wrapper.vm.isOpen).toBe(true)
    
    // 触发鼠标离开事件
    await wrapper.find('.cr-tooltip').trigger('mouseleave')
    vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
    await nextTick()
    
    // 立即检查，应该仍然是显示的
    expect(wrapper.vm.isOpen).toBe(true)
    
    // 快进300ms
    vi.advanceTimersByTime(300)
    await nextTick()
    
    // 现在应该隐藏了
    expect(wrapper.vm.isOpen).toBe(false)
  })

  // 测试placement属性
  it('应该根据placement属性设置tooltip位置', async () => {
    const placements = ['top', 'bottom', 'left', 'right']
    
    for (const placement of placements) {
      // 在循环中多次挂载组件所以需要清理
      document.body.innerHTML = ''
      vi.clearAllMocks()
      
      const wrapper = createTooltipWrapper({
        placement
      })
      await nextTick()
      // 触发鼠标进入事件显示tooltip
      await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
      vi.advanceTimersByTime(200)  
      await nextTick()
      
      //引入
      const { createPopper } = await import('@popperjs/core')
      // 断言 createPopper 被正确地调用了
      expect(createPopper).toHaveBeenCalledWith(
        // 三个参数
        expect.any(HTMLElement),
        expect.any(HTMLElement),
        expect.objectContaining({ placement })
      )
    }
  })

  // // 测试content属性，应该是有插槽就使用插槽吧
  // it.only('应该正确显示content属性的内容', () => {
  //   const testContent = '这是一个测试提示'
  //   const wrapper = createTooltipWrapper({
  //     content: testContent
  //   }, {
  //     // 不提供content slot
  //     content: undefined
  //   })
    
  //   // 验证content属性被正确使用
  //   expect(wrapper.find('.cr-tooltip__popper').text()).toContain(testContent)
  // })

  // // 测试visible-change事件
  // it('应该在tooltip显示状态变化时触发visible-change事件', async () => {
  //   const onVisibleChange = vi.fn()
  //   const wrapper = createTooltipWrapper({
  //     trigger: 'hover',
  //     'onVisible-change': onVisibleChange
  //   })
  //   await nextTick()
  //   // 触发鼠标进入事件
  //   await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
    
  //   // 应该触发visible-change事件，值为true
  //   expect(onVisibleChange).toHaveBeenCalledWith(true)
  //   onVisibleChange.mockClear()
    
  //   // 触发鼠标离开事件
  //   await wrapper.find('.cr-tooltip').trigger('mouseleave')
  //       vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
    
  //   // 应该触发visible-change事件，值为false
  //   expect(onVisibleChange).toHaveBeenCalledWith(false)
  // })

  // // 这里往后应该就没必要了吧
  // // 测试自定义popper选项
  // it('应该正确传递popperOptions到popper.js', async () => {
  //   const customOptions = {
  //     modifiers: [
  //       {
  //         name: 'customModifier',
  //         options: {
  //           customOption: true
  //         }
  //       }
  //     ]
  //   }
    
  //   const wrapper = createTooltipWrapper({
  //     popperOptions: customOptions
  //   })
    
  //   // 触发鼠标进入事件显示tooltip
  //   await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改

  //   await nextTick()
    
  //   // popper.js应该接收自定义选项
  //   const { createPopper } = await import('@popperjs/core')
  //   expect(createPopper).toHaveBeenCalledWith(
  //     expect.any(HTMLElement),
  //     expect.any(HTMLElement),
  //     expect.objectContaining({
  //       modifiers: expect.arrayContaining([
  //         expect.objectContaining({
  //           name: 'customModifier',
  //           options: {
  //             customOption: true
  //           }
  //         })
  //       ])
  //     })
  //   )
  // })

  // // 测试slot透传
  // it('应该正确渲染default和content插槽的内容', () => {
  //   const wrapper = createTooltipWrapper({}, {
  //     default: h('button', { class: 'custom-trigger' }, '点击我'),
  //     content: h('div', { class: 'custom-content' }, '自定义提示内容')
  //   })
    
  //   // 验证插槽内容被正确渲染
  //   expect(wrapper.find('.custom-trigger').exists()).toBe(true)
  //   expect(wrapper.find('.custom-trigger').text()).toBe('点击我')
    
  //   expect(wrapper.find('.custom-content').exists()).toBe(true)
  //   expect(wrapper.find('.custom-content').text()).toBe('自定义提示内容')
  // })

  // // 测试实例方法
  // it('应该暴露show和hide方法', async () => {
  //   const wrapper = createTooltipWrapper()
    
  //   // 验证方法存在
  //   expect(typeof wrapper.vm.show).toBe('function')
  //   expect(typeof wrapper.vm.hide).toBe('function')
    
  //   // 使用show方法
  //   wrapper.vm.show()
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
  //   expect(wrapper.vm.isOpen).toBe(true)
    
  //   // 使用hide方法
  //   wrapper.vm.hide()
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
  //   expect(wrapper.vm.isOpen).toBe(false)
  // })

  // // 测试切换trigger属性
  // it('应该在trigger改变时更新事件监听器', async () => {
  //   const wrapper = createTooltipWrapper({
  //     trigger: 'hover'
  //   })
    
  //   // 使用hover模式触发
  //   await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
  //   expect(wrapper.vm.isOpen).toBe(true)
    
  //   await wrapper.find('.cr-tooltip').trigger('mouseleave')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
  //   expect(wrapper.vm.isOpen).toBe(false)
    
  //   // 改变trigger属性
  //   await wrapper.setProps({ trigger: 'click' })
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
    
  //   // hover不应该再起作用
  //   await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
  //   expect(wrapper.vm.isOpen).toBe(false)
    
  //   // 点击应该起作用
  //   await wrapper.find('.cr-tooltip__trigger').trigger('click')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
  //   expect(wrapper.vm.isOpen).toBe(true)
  // })

  // // 测试弹出框更新
  // it('应该在isOpen变为true时创建popper实例', async () => {
  //   const wrapper = createTooltipWrapper()
    
  //   // 清除已有的调用
  //   vi.clearAllMocks()
    
  //   // 触发显示
  //   await wrapper.find('.cr-tooltip__trigger').trigger('mouseenter')
  //   vi.advanceTimersByTime(200)  // 假设防抖延迟时间是200ms，按需修改
  //   await nextTick()
    
  //   // 应该创建popper实例
  //   const { createPopper } = await import('@popperjs/core')
  //   expect(createPopper).toHaveBeenCalled()
  // })
}) 