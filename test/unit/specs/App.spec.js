import { createLocalVue, mount, shallow } from '@vue/test-utils';

import App from '@/App.vue';
import GlobalStore, { store } from '@/store';

var localVue = null;

describe('App.vue', () => {
  beforeEach(() => {
    localVue = createLocalVue({});
    localVue.use(GlobalStore);
  });

  it('registers `store` on component instances', () => {
    let component = shallow(App, {
      localView: localVue,
      stubs: ['router-link', 'router-view'],
    });
    expect(component.vm.$store).toBeDefined();
  });
});
