<template>
  <AppContainer title="Destinations">
    <div
      v-if="endpointClient"
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
import AppContainer from '@/components/common/page/AppContainer.vue';
import NotConnected from '@/components/common/NotConnected.vue';
import { mappers } from '@/store';

let computedProps = {
  empty() {
    return this.destinations.length === 0;
  },
};

let methods = {
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
      errored: false,
      loading: true,
      ...mappers.mapDataFields([
        'endpointClient',
        'destinations',
      ]),
    };
  },
  computed: {
    ...computedProps,
  },
  mounted() {
    // this.$store.getDestinations().then(res => {
    //   this.loading = false;
    // }).catch(err => {
    //   this.loading = false;
    //   this.errored = true;
    // });
  },
  methods: methods,
};
</script>

<style lang="scss" scoped>
</style>