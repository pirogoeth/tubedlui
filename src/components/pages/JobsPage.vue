<template>
  <AppContainer title="Jobs">
    <b-table
      :sortable="true"
    />
  </AppContainer>
</template>

<script>
import AppContainer from '@/components/common/page/AppContainer.vue';

import { Client } from '@/client';

let methods = {
  fetchJobs() {
    return null;
  }
};

let computedProps = {

};

export default {
  name: 'JobsPage',
  components: {
    AppContainer,
  },
  props: {
  },
  computed: computedProps,
  methods: methods,
};
</script>

<style lang="scss" scoped>
</style>