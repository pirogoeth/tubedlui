<template>
  <section>
    <b-message
      :closable="false"
      title="Not Connected to an Endpoint"
      type="is-warning">
      You must connect to a <code>tubedlapi</code> endpoint before using this page.
    </b-message>
  </section>
</template>

<script>
export default {
  name: 'NotConnected',
};
</script>

<style lang="scss" scoped>
</style>