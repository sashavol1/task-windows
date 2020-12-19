import { mount, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

test('App.vue - text in app', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(App)

  // Assert the rendered text of the component
  expect(wrapper.find('.button-return').text()).toContain('+ Return tile to trading desk 0')
})

test('App.vue - call delete to trash', async () => {
  const wrapper = mount(App)
  expect(wrapper.find('.button-return').text()).toContain('+ Return tile to trading desk 0')
  await wrapper.vm.handlerRemove(1)
  expect(wrapper.vm.blocks.length === 4).toBe(true)
  expect(wrapper.vm.trash.length === 1).toBe(true)
  expect(wrapper.find('.button-return').text()).toContain('+ Return tile to trading desk 1')
})
