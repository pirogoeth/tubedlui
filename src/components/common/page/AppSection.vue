<template>
  <section class="section">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="content">
      <slot name="content" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppSection',
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>