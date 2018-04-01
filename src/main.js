// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from '@/App';
import router from '@/router';

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

var store = {
  debug: process.env.NODE_ENV === 'production' ? false : true,
  state: {
    endpointClient: null,
  },
  setEndpointClient(client) {
    if (this.debug) {
      console.log(`[store] setting global endpointClient: ${client.url}`)
    }

    this.state.endpointClient = client;
  },
  getEndpointClient() {
    return this.state.endpointClient;
  },
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data() {
    return {
      store: store,
    };
  },
  template: '<App />',
});
