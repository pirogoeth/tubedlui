import Vue from 'vue';
import Router from 'vue-router';

import DestinationsPage from '@/components/pages/DestinationsPage.vue';
import JobsPage from '@/components/pages/JobsPage.vue';
import ProfilesPage from '@/components/pages/ProfilesPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/destinations/',
      name: 'DestinationsPage',
      component: DestinationsPage,
    },
    {
      path: '/jobs/',
      alias: '/',
      name: 'JobsPage',
      component: JobsPage,
    },
    {
      path: '/profiles/',
      name: 'ProfilesPage',
      component: ProfilesPage,
    },
  ],
});
