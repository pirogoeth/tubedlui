// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from '@/App.vue';
import router from '@/router';
import storePlugin, { plugins, store } from '@/store';

if ( process.env.NODE_ENV !== 'production' ) {
  Vue.config.debug = true;

  store.use(plugins.loggerPlugin);
  store.use(plugins.devtoolsPlugin);
}

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultToastDuration: 5000,
});
Vue.use(storePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App />',
});
