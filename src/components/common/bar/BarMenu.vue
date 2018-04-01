<template>
  <div :class="className">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BarMenu',
  components: {
  },
  props: {
    position: {
      type: String,
      required: true,
      validator: (value) => {
        return ['start', 'end'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    className() {
      return `navbar-${this.position}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>