import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies default props', () => {
    const wrapper = mount(Button)
    const btn = wrapper.get('button')
    expect(btn.classes()).toContain('btn--primary')
    expect(btn.classes()).toContain('btn--medium')
    expect(btn.attributes('disabled')).toBeUndefined()
  })

  it('applies color and size classes', () => {
    const wrapper = mount(Button, {
      props: { color: 'neutral', size: 'small' },
    })
    const btn = wrapper.get('button')
    expect(btn.classes()).toContain('btn--neutral')
    expect(btn.classes()).toContain('btn--small')
  })

  it('sets disabled attributes and classes', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    })
    const btn = wrapper.get('button')
    expect(btn.classes()).toContain('btn--disabled')
    expect(btn.attributes('disabled')).toBeDefined()
    expect(btn.attributes('aria-disabled')).toBe('true')
    expect(btn.attributes('tabindex')).toBe('-1')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('emits click event when enabled', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')![0][0]).toBeInstanceOf(MouseEvent)
  })

  it('button type is always "button"', () => {
    const wrapper = mount(Button)
    const btn = wrapper.get('button')
    expect(btn.attributes('type')).toBe('button')
  })
})
