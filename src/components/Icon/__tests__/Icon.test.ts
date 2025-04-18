/**
 * Icon组件单元测试
 * 测试Icon组件的渲染、各种属性和样式
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faCircleCheck, 
  faTriangleExclamation, 
  faCircleInfo, 
  faCircleXmark 
} from '@fortawesome/free-solid-svg-icons'
import type { IconProps } from '../types'

// 添加图标到库中以便测试
library.add(faCircleCheck, faTriangleExclamation, faCircleInfo, faCircleXmark)

// 帮助函数：创建Icon组件的包装器
const createIconWrapper = (props: Partial<IconProps> = { icon: 'circle-check' }) => {
  return mount(Icon, {
    props: props as IconProps,
    global: {
      components: {
        'font-awesome-icon': FontAwesomeIcon
      }
    }
  })
}

describe('Icon.vue', () => {
  // 测试基本渲染
  it('应该正确渲染Icon组件', () => {
    const wrapper = createIconWrapper({
      icon: 'circle-check'
    })
    
    // 验证基本类名
    expect(wrapper.find('.cr-icon').exists()).toBe(true)
    // 验证FontAwesomeIcon组件被正确渲染
    expect(wrapper.findComponent(FontAwesomeIcon).exists()).toBe(true)
  })

  // 测试不同类型的Icon
  it('应该根据type属性应用不同的样式类', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    
    for (const type of types) {
      const wrapper = createIconWrapper({
        icon: 'circle-check',
        type: type as IconProps['type']
      })
      
      // 验证类型特定的类名
      expect(wrapper.find(`.cr-icon--${type}`).exists()).toBe(true)
    }
  })

  // 测试自定义颜色
  it('应该应用自定义颜色样式', () => {
    const color = '#ff0000'
    const wrapper = createIconWrapper({
      icon: 'circle-check',
      color
    })
    
    // 验证内联样式
    expect(wrapper.attributes('style')).toContain(`color: ${color}`)
  })

  // 测试不同尺寸
  it('应该正确传递size属性到FontAwesomeIcon', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl', '2x']
    
    for (const size of sizes) {
      const wrapper = createIconWrapper({
        icon: 'circle-check',
        size: size as IconProps['size']
      })
      
      // 验证size属性被传递给FontAwesomeIcon
      const faIcon = wrapper.findComponent(FontAwesomeIcon)
      expect(faIcon.props('size')).toBe(size)
    }
  })

  // 测试旋转属性
  it('应该正确传递rotation属性到FontAwesomeIcon', () => {
    const rotations = [90, 180, 270]
    
    for (const rotation of rotations) {
      const wrapper = createIconWrapper({
        icon: 'circle-check',
        rotation: rotation as IconProps['rotation']
      })
      
      // 验证rotation属性被传递给FontAwesomeIcon
      const faIcon = wrapper.findComponent(FontAwesomeIcon)
      expect(faIcon.props('rotation')).toBe(rotation)
    }
  })

  // 测试固定宽度属性
  it('应该正确传递fixedWidth属性到FontAwesomeIcon', () => {
    const wrapper = createIconWrapper({
      icon: 'circle-check',
      fixedWidth: true
    })
    
    // 验证fixedWidth属性被传递给FontAwesomeIcon
    const faIcon = wrapper.findComponent(FontAwesomeIcon)
    expect(faIcon.props('fixedWidth')).toBe(true)
  })

  // 测试边框属性
  it('应该正确传递border属性到FontAwesomeIcon', () => {
    const wrapper = createIconWrapper({
      icon: 'circle-check',
      border: true
    })
    
    // 验证border属性被传递给FontAwesomeIcon
    const faIcon = wrapper.findComponent(FontAwesomeIcon)
    expect(faIcon.props('border')).toBe(true)
  })

  // 测试翻转属性
  it('应该正确传递flip属性到FontAwesomeIcon', () => {
    const flips = ['horizontal', 'vertical', 'both'] as const
    
    for (const flip of flips) {
      const wrapper = createIconWrapper({
        icon: 'circle-check',
        flip
      })
      
      // 验证flip属性被传递给FontAwesomeIcon
      const faIcon = wrapper.findComponent(FontAwesomeIcon)
      expect(faIcon.props('flip')).toBe(flip)
    }
  })

  // 测试动画属性
  it('应该正确传递动画属性到FontAwesomeIcon', () => {
    const animations = [
      { prop: 'spin', value: true },
      { prop: 'pulse', value: true },
      { prop: 'bounce', value: true },
      { prop: 'shake', value: true },
      { prop: 'beat', value: true },
      { prop: 'fade', value: true },
      { prop: 'beatFade', value: true },
      { prop: 'spinPulse', value: true },
      { prop: 'spinReverse', value: true }
    ]
    
    for (const { prop, value } of animations) {
      const props = {
        icon: 'circle-check',
        [prop]: value
      }
      
      const wrapper = createIconWrapper(props)
      
      // 验证动画属性被传递给FontAwesomeIcon
      const faIcon = wrapper.findComponent(FontAwesomeIcon)
      // 使用any类型绕过类型检查（在测试中这是安全的）
      expect(faIcon.props(prop as any)).toBe(value)
    }
  })

  // 测试组合使用多个属性
  it('应该支持组合使用多个属性', () => {
    const wrapper = createIconWrapper({
      icon: 'circle-check',
      type: 'success',
      color: '#00ff00',
      size: '2x',
      spin: true,
      fixedWidth: true
    })
    
    // 验证多个属性的组合效果
    const iconEl = wrapper.find('.cr-icon')
    expect(iconEl.classes()).toContain('cr-icon--success')
    expect(iconEl.attributes('style')).toContain('color: #00ff00')
    
    const faIcon = wrapper.findComponent(FontAwesomeIcon)
    expect(faIcon.props('size')).toBe('2x')
    expect(faIcon.props('spin')).toBe(true)
    expect(faIcon.props('fixedWidth')).toBe(true)
  })

  // 测试不同类型的图标输入
  it('应该支持不同类型的icon输入', () => {
    // 字符串形式
    const wrapper1 = createIconWrapper({
      icon: 'circle-check'
    })
    expect(wrapper1.findComponent(FontAwesomeIcon).props('icon')).toBe('circle-check')
    
    // 数组形式 ['fas', 'circle-check']
    const wrapper2 = createIconWrapper({
      icon: ['fas', 'circle-check']
    })
    expect(wrapper2.findComponent(FontAwesomeIcon).props('icon')).toEqual(['fas', 'circle-check'])
    
    // 图标对象形式
    const wrapper3 = createIconWrapper({
      icon: faCircleCheck
    })
    expect(wrapper3.findComponent(FontAwesomeIcon).props('icon')).toBe(faCircleCheck)
  })

  // 测试transform属性
  it('应该正确传递transform属性到FontAwesomeIcon', () => {
    // 字符串形式
    const wrapper1 = createIconWrapper({
      icon: 'circle-check',
      transform: 'grow-10 rotate-30'
    })
    expect(wrapper1.findComponent(FontAwesomeIcon).props('transform')).toBe('grow-10 rotate-30')
    
    // 对象形式
    const transformObj = { rotate: 42, flipX: true }
    const wrapper2 = createIconWrapper({
      icon: 'circle-check',
      transform: transformObj
    })
    expect(wrapper2.findComponent(FontAwesomeIcon).props('transform')).toEqual(transformObj)
  })

  // 测试mask属性
  it('应该正确传递mask属性到FontAwesomeIcon', () => {
    // 字符串形式
    const wrapper1 = createIconWrapper({
      icon: 'circle-check',
      mask: 'circle'
    })
    expect(wrapper1.findComponent(FontAwesomeIcon).props('mask')).toBe('circle')
    
    // 数组形式
    const wrapper2 = createIconWrapper({
      icon: 'circle-check',
      mask: ['fas', 'circle']
    })
    expect(wrapper2.findComponent(FontAwesomeIcon).props('mask')).toEqual(['fas', 'circle'])
    
    // 对象形式
    const wrapper3 = createIconWrapper({
      icon: 'circle-check',
      mask: faCircleInfo
    })
    expect(wrapper3.findComponent(FontAwesomeIcon).props('mask')).toBe(faCircleInfo)
  })

  // 测试symbol属性
  it('应该正确传递symbol属性到FontAwesomeIcon', () => {
    // 布尔值形式
    const wrapper1 = createIconWrapper({
      icon: 'circle-check',
      symbol: true
    })
    expect(wrapper1.findComponent(FontAwesomeIcon).props('symbol')).toBe(true)
    
    // 字符串形式
    const wrapper2 = createIconWrapper({
      icon: 'circle-check',
      symbol: 'my-symbol'
    })
    expect(wrapper2.findComponent(FontAwesomeIcon).props('symbol')).toBe('my-symbol')
  })

  // 测试title属性
  it('应该正确传递title属性到FontAwesomeIcon用于辅助功能', () => {
    const title = '成功图标'
    const wrapper = createIconWrapper({
      icon: 'circle-check',
      title
    })
    
    expect(wrapper.findComponent(FontAwesomeIcon).props('title')).toBe(title)
  })

  // 测试swapOpacity属性
  it('应该正确传递swapOpacity属性到FontAwesomeIcon', () => {
    const wrapper = createIconWrapper({
      icon: 'circle-check',
      swapOpacity: true
    })
    
    expect(wrapper.findComponent(FontAwesomeIcon).props('swapOpacity')).toBe(true)
  })

  // 测试pull属性
  it('应该正确传递pull属性到FontAwesomeIcon', () => {
    const pulls = ['left', 'right'] as const
    
    for (const pull of pulls) {
      const wrapper = createIconWrapper({
        icon: 'circle-check',
        pull
      })
      
      expect(wrapper.findComponent(FontAwesomeIcon).props('pull')).toBe(pull)
    }
  })
}) 