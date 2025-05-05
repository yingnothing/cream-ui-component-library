/**
 * Message组件单元测试
 * 测试Message组件的基本功能、不同类型消息、关闭功能以及自动销毁
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Message from '../Message.vue'
import { crMessage, closeAll } from '../create'
// 拿到暴露的方法
import * as createModule from '../create'

// 模拟定时器
vi.useFakeTimers()

describe('Message.vue', () => {
  // 在每个测试后重置mock和定时器
  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  // 测试Message组件的基本渲染
  it('应该正确渲染Message组件', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        id: 'test-id',
        useDestroy: vi.fn()
      },
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    expect(wrapper.find('.cr-message').exists()).toBe(true)
    expect(wrapper.text()).toContain('测试消息')
  })

  // 测试Message的不同类型
  it('应该正确渲染不同类型的Message', async () => {
    // 测试不同类型
    const types = ['info', 'success', 'warning', 'danger', 'primary']

    for (const type of types) {
      const wrapper = mount(Message, {
        props: {
          message: `${type}消息`,
          type,
          id: `test-id-${type}`,
          useDestroy: vi.fn()
        },
        global: {
          stubs: {
            'Icon': true
          }
        }
      })

      expect(wrapper.find(`.cr-message--${type}`).exists()).toBe(true)
      expect(wrapper.text()).toContain(`${type}消息`)
    }
  })

  // 测试Message的close按钮
  it('应该在showClose为true时显示关闭按钮', async () => {
    const destroyFn = vi.fn()
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        showClose: true,
        id: 'test-id',
        useDestroy: destroyFn
      },
      global: {
        stubs: {
          'Icon': {
            template: '<div class="icon-stub"></div>',
          }
        }
      }
    })

    expect(wrapper.find('.cr-message__close').exists()).toBe(true)
    expect(wrapper.classes()).toContain('is-close')

    // 点击关闭按钮
    console.log('点击后 visible 值为：', wrapper.vm.visible)
    await wrapper.find('.icon-stub').trigger('click')
    // vm是组件的实例，它是一个对象，里面包含组件的属性和方法
    expect(wrapper.vm.visible).toBe(false)

    // 测试visible变为false后会调用destroyFn
    await nextTick()
    expect(destroyFn).toHaveBeenCalled()
  })

  // 测试Message的自动关闭
  it('应该在指定时间后自动关闭', async () => {
    const destroyFn = vi.fn()
    mount(Message, {
      props: {
        message: '测试消息',
        duration: 2000, // 2秒后关闭
        id: 'test-id',
        useDestroy: destroyFn
      },
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    // 验证初始状态不会立即关闭
    expect(destroyFn).not.toHaveBeenCalled()

    // 快进时间
    vi.advanceTimersByTime(1000)
    expect(destroyFn).not.toHaveBeenCalled()

    // 快进超过duration的时间
    vi.advanceTimersByTime(1500)
    await nextTick()

    expect(destroyFn).toHaveBeenCalled()
  })

  // 测试鼠标悬停时暂停自动关闭
  it('鼠标悬停时应该暂停自动关闭', async () => {
    const destroyFn = vi.fn()
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        duration: 2000,
        id: 'test-id',
        useDestroy: destroyFn
      },
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    // 鼠标进入
    await wrapper.trigger('mouseenter')

    // 快进超过duration的时间
    vi.advanceTimersByTime(3000)
    expect(destroyFn).not.toHaveBeenCalled()

    // 鼠标离开
    await wrapper.trigger('mouseleave')

    // 快进超过duration的时间
    vi.advanceTimersByTime(2500)
    await nextTick()
    expect(destroyFn).toHaveBeenCalled()
  })

  // 测试offset属性
  it('应该根据offset属性设置顶部距离', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        offset: 100,
        id: 'test-id',
        useDestroy: vi.fn()
      },
      global: {
        stubs: {
          'Icon': true
        }
      }
    })

    // 模拟getLastBottomOffset返回0    ，createModule是文件暴露出来的方法的集合 ，监视该方法
    vi.spyOn(createModule, 'getLastBottomOffset').mockReturnValue(0)
    await nextTick()

    expect(wrapper.vm.topStyle).toEqual({ top: '100px' })
  })

  // 测试多个Message的堆叠
  it('多个Message应该正确堆叠', async () => {


    // 模拟getLastBottomOffset函数针对不同id返回不同值
    const getLastBottomOffsetSpy = vi.spyOn(createModule, 'getLastBottomOffset')
      .mockImplementation((id) => {
        if (id === 'msg-1') return 0
        if (id === 'msg-2') return 120
        return 0
      })

    // 创建两个消息
    const wrapper1 = mount(Message, {
      props: {
        message: '消息1',
        id: 'msg-1',
        useDestroy: vi.fn()
      },
      global: { stubs: { 'Icon': true } }
    })


    const wrapper2 = mount(Message, {
      props: {
        message: '消息2',
        id: 'msg-2',
        useDestroy: vi.fn()
      },
      global: { stubs: { 'Icon': true } }
    })



    await nextTick()

    // 实例内的topStyle
    expect(wrapper1.vm.topStyle).toEqual({ top: '20px' }) // 默认offset是20
    expect(wrapper2.vm.topStyle).toEqual({ top: '140px' }) // 20 + 120

    getLastBottomOffsetSpy.mockRestore()
  })

  // 测试CrMessage函数创建Message实例
  it('CrMessage函数应该创建Message实例并添加到DOM', async () => {
    // 使用CrMessage创建消息
    const messageInstance = crMessage({
      message: '通过函数创建的消息',
      duration: 0 // 设置为0，不会自动关闭
    })

    await nextTick()

    // 验证消息已添加到DOM
    const messageElement = document.querySelector('.cr-message')
    expect(messageElement).not.toBeNull()
    expect(messageElement?.textContent).toContain('通过函数创建的消息')

    // 验证实例对象的结构
    expect(messageInstance).toHaveProperty('id')
    expect(messageInstance).toHaveProperty('vnode')
    expect(messageInstance).toHaveProperty('props')
    expect(messageInstance).toHaveProperty('vm')
    expect(messageInstance).toHaveProperty('manualDestroy')

    // 测试手动销毁功能
    messageInstance.manualDestroy()
    await nextTick()

    // 销毁后visible应该为false（使用可选链避免可能的空值）
    expect(messageInstance.vm.exposed?.visible.value).toBe(false)
  })

  // 测试closeAll函数
  it('closeAll函数应该关闭所有消息', async () => {
    // 创建多个消息
    const message1 = crMessage({ message: '消息1', duration: 0 })
    const message2 = crMessage({ message: '消息2', duration: 0 })
    const message3 = crMessage({ message: '消息3', duration: 0 })

    await nextTick()

    // 验证初始状态
    const messageElements = document.querySelectorAll('.cr-message')
    expect(messageElements.length).toBe(3)

    // 使用spy监控所有消息的manualDestroy方法
    const spy1 = vi.spyOn(message1, 'manualDestroy')
    const spy2 = vi.spyOn(message2, 'manualDestroy')
    const spy3 = vi.spyOn(message3, 'manualDestroy')

    // 调用closeAll
    closeAll()
    await nextTick()

    // 验证所有消息的manualDestroy方法被调用
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
  })


})
