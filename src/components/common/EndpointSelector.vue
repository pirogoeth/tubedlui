<template>
  <b-field>
    <div class="control">
      <span :class="`${endpointStateContainerClasses} ${endpointState}`" />
    </div>
    <b-autocomplete
      v-model="endpoint.current"
      :keep-first="true"
      :data="endpointHistory"
      :open-on-focus="true"
      :loading="connecting"
      placeholder="tubedlapi endpoint"
      type="url"
      required="true"
      pattern="https?://.+"
      field="endpointUrl"
      @select="option => setEndpoint(option)">
      <div slot="empty">
        <font-awesome-icon icon="history" />
        No History Available
      </div>
    </b-autocomplete>
    <div class="control">
      <button
        :disabled="false"
        class="button is-success"
        @click="setEndpoint">
        Connect
      </button>
    </div>
  </b-field>
</template>

<script>
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faHistory from '@fortawesome/fontawesome-free-solid/faHistory';
import filter from 'lodash/filter';

import { Client } from '@/client';

fontawesome.library.add(faHistory);

let methods = {
  setEndpoint() {
    let endpoint = this.endpoint.current;
    this.connecting = true;

    Client.testEndpoint(endpoint)
      .then(resp => {
        // Grab the health status returned by the API
        let status = resp.data.status;

        // Let the user know we were able to connect
        this.$toast.open({
          message: `Connected to endpoint: ${endpoint}: status: ${status}`,
          type: 'is-success',
        });

        // Add this endpoint to localStorage
        this.updateEndpointHistory({
          endpointUrl: endpoint,
          starred: false,
        });

        // Hide the loading state
        this.connected = true;

        // Create a new storage client
        let client = Client.makeForEndpoint(endpoint);

        // And update the global store.
        this.$root.$data.store.setEndpointClient(client);
      })
      .catch(error => {
        this.$toast.open({
          message: `Something went wrong! ${error}`,
          type: 'is-danger',
        });
      });

    this.connecting = false;
  },
  getEndpointHistory() {
    return JSON.parse(localStorage.getItem('endpoints')) || [];
  },
  setEndpointHistory(source) {
    localStorage.setItem('endpoints', source);
    return source;
  },
  updateEndpointHistory(source) {
    let endpoints = this.getEndpointHistory();
    let exists = filter(endpoints, (e) => (e.endpointUrl === source.endpointUrl));
    if (exists.length != 0) {
      return;
    }

    endpoints.unshift(source);
    return this.setEndpointHistory(JSON.stringify(endpoints));
  },
}

let computedProps = {
  endpointStateContainerClasses() {
    return "button is-static endpoint-status";
  },
  endpointHistory() {
    return this.getEndpointHistory() || [];
  },
  endpointState() {
    if (this.connected && this.endpoint.current) {
      return "endpoint-ok";
    } else if (!this.connected && this.endpoint.current) {
      return "endpoint-fail";
    } else if (!this.connected) {
      return "endpoint-idle"
    }
  },
}

export default {
  name: 'EndpointSelector',
  components: {
    FontAwesomeIcon,
  },
  props: {
  },
  data() {
    return {
      connected: false,
      connecting: false,
      endpoint: {
        current: null,
        history: this.getEndpointHistory(),
      },
    };
  },
  computed: computedProps,
  methods: methods,
};
</script>

<style lang="scss" scoped>
@import "~@/style/module.scss";

span.endpoint-status {
  &.endpoint-idle {
    @include dotColorTransform($primary, $twitter, 5s);
  }

  &.endpoint-ok {
    @include dot($success);
  }

  &.endpoint-fail {
    @include dot($danger);
  }
}
</style>