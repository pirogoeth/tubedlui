<template>
  <AppContainer title="Destinations">
    <div
      v-if="state.endpointClient"
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
import { mapFields } from '@/store/mapping';

let computedProps = {
  // client() {
  //   return this.$store.getEndpointClient();
  // },
  empty() {
    return this.destinations.length === 0;
  },
};

let methods = {
  // client() {
  //   return this.$store.getEndpointClient();
  // },
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
      // FIXME
      loading: true,
      state: this.$store.state,
    };
  },
  computed: {
    ...mapFields(['destinations']),
    ...computedProps,
  },
  methods: methods,
};
</script>

<style lang="scss" scoped>
</style>