import { mount } from '@vue/test-utils'
import Window from '@/components/WindowComp.vue'

test('WindowComp.vue - checked title and props', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(Window, {
    propsData: {
      title: 'Tile #1',
      startWidth: 300,
      startHeight: 100
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Tile #1')
  expect(wrapper.vm.startWidth).toEqual(300)
  expect(wrapper.vm.startHeight).toEqual(100)
})