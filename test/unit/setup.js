import Vue from 'vue';
import Buefy from 'buefy';

import store from '@/store';

Vue.config.debug = true;
Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultToastDuration: 5000,
});
Vue.use(store);