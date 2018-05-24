<template>
  <AppContainer title="Destinations">
    <div
      v-if="client"
      slot="content">
      <b-table
        :data="destinations"
        :loading="loading"
        :empty="empty"
        :default-sort="['id']"
        :striped="true"
        paginated />
    </div>
    <NotConnected
      v-else
      slot="content" />
  </AppContainer>
</template>

<script>
import forEach from 'lodash/forEach';

import AppContainer from '@/components/common/page/AppContainer.vue';
import NotConnected from '@/components/common/NotConnected.vue';

let computedProps = {
  // client() {
  //   return this.$store.getEndpointClient();
  // },
  empty() {
    return this.destinations.length === 0;
  },
};

let methods = {
  client() {
    return this.$store.getEndpointClient();
  },
  fetchList() {
    console.log('trigger fetch');
    this.$store.getDestinations()
      .then(items => {
        this.destinations = items;
        this.loading = false;
      })
      .catch(error => {
        this.destinations = [];
        this.loading = false;
        console.log(error);
        return Promise.reject(error);
      })
  },
};

export default {
  name: 'DestinationsPage',
  components: {
    AppContainer,
    NotConnected,
  },
  props: {
  },
  data() {
    return {
      destinations: [],
      loading: true,
    };
  },
  computed: computedProps,
  methods: methods,
};
</script>

<style lang="scss" scoped>
</style>