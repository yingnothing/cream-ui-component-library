import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'
// describe 用于定义一个测试套件
describe('Button.vue', () => {
  // primary，test 用于定义一个单独的测试用例，
  test('primary button', () => {
    // mount是对组件进行挂载，同时可以传入参数
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button',
      },
    })
    // 检查是否有 cr-button--primary 这个className
    expect(wrapper.classes()).toContain('cr-button--primary')

    // 检查slot是否生效且内容为button
    expect(wrapper.get('button').text()).toBe('button')

    // 确保组件在某种情况下确实发出了 click 事件
    wrapper.get('button').trigger('click')
    console.log('emitted=>', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
