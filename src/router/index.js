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
      alias: '/',
      name: 'DestinationsPage',
      component: DestinationsPage,
    },
    {
      path: '/jobs/',
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
